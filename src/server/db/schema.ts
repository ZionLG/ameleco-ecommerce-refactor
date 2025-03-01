import { relations, sql } from "drizzle-orm";
import {
  index,
  int,
  primaryKey,
  sqliteTableCreator,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { type AdapterAccount } from "next-auth/adapters";
import { createInsertSchema } from "drizzle-zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator(
  (name) => `ameleco-ecommerce-refactor_${name}`,
);

export const categories = createTable(
  "category",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 32 }).unique().notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
  },
  (category) => [
    uniqueIndex("category_id_idx").on(category.id),
    uniqueIndex("category_name_idx").on(category.name),
  ],
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  subCategories: many(subCategories),
}));

export const categoryInsertSchema = createInsertSchema(categories, {
  name: (schema) => schema.min(3),
});

export const subCategories = createTable(
  "sub_category",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 32 }).unique().notNull(),
    categoryId: int("category_id", { mode: "number" })
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
  },
  (subCategory) => [
    uniqueIndex("sub_category_id_idx").on(subCategory.id),
    uniqueIndex("sub_category_name_idx").on(subCategory.name),
  ],
);

export const subCategoriesRelations = relations(
  subCategories,
  ({ many, one }) => ({
    subSubCategories: many(subSubCategories),
    category: one(categories, {
      fields: [subCategories.categoryId],
      references: [categories.id],
    }),
  }),
);

export const subCategoryInsertSchema = createInsertSchema(subCategories, {
  name: (schema) => schema.min(3),
});

export const subSubCategories = createTable(
  "sub_sub_category",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 32 }).unique().notNull(),
    subCategoryId: int("sub_category_id", { mode: "number" })
      .notNull()
      .references(() => subCategories.id, { onDelete: "cascade" }),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
  },
  (subSubCategory) => [
    uniqueIndex("sub_sub_category_id_idx").on(subSubCategory.id),
    uniqueIndex("sub_sub_category_name_idx").on(subSubCategory.name),
  ],
);

export const subSubCategoriesRelations = relations(
  subSubCategories,
  ({ many, one }) => ({
    products: many(products),
    subCategory: one(subCategories, {
      fields: [subSubCategories.subCategoryId],
      references: [subCategories.id],
    }),
  }),
);

export const subSubCategoryInsertSchema = createInsertSchema(subSubCategories, {
  name: (schema) => schema.min(3),
});

export const productPdf = createTable(
  "product_pdf",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    productId: int("product_id", { mode: "number" })
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    url: text("url", { length: 255 }).notNull(),
    fileKey: text("file_key", { length: 255 }).notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
  },
  (productPdf) => [
    index("product_pdf_product_id_idx").on(productPdf.productId),
  ],
);

export const productPdfRelations = relations(productPdf, ({ one }) => ({
  product: one(products, {
    fields: [productPdf.productId],
    references: [products.id],
  }),
}));


export const productImage = createTable(
  "product_image",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    productId: int("product_id", { mode: "number" })
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    url: text("url", { length: 255 }).notNull(),
    fileKey: text("file_key", { length: 255 }).notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
  },
  (productImage) => [
    index("product_image_product_id_idx").on(productImage.productId),
  ],
);

export const productImageRelations = relations(productImage, ({ one }) => ({
  product: one(products, {
    fields: [productImage.productId],
    references: [products.id],
  }),
}));

export const products = createTable(
  "product",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 64 }).notNull(),
    description: text("description"),
    stock: int("stock", { mode: "number" }).notNull(),
    price: int("price", { mode: "number" }).notNull(),
    subSubCategoryId: int("sub_sub_category_id", { mode: "number" })
      .notNull()
      .references(() => subSubCategories.id, { onDelete: "cascade" }),
    createdById: text("created_by", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updatedAt", { mode: "timestamp" }).$onUpdate(
      () => new Date(),
    ),
  },
  (product) => [
    index("product_name_idx").on(product.name),
    uniqueIndex("product_id_idx").on(product.id),
  ],
);

export const productsInsertSchema = createInsertSchema(products, {
  name: (schema) => schema.min(3),
  stock: (schema) => schema.nonnegative(),
  price: (schema) => schema.positive(),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  subSubCategory: one(subSubCategories, {
    fields: [products.subSubCategoryId],
    references: [subSubCategories.id],
  }),
  createdBy: one(users, {
    fields: [products.createdById],
    references: [users.id],
  }),
  productPdf: one(productPdf),
  cartItems: many(cartItem),
  productImages: many(productImage),
}));

export const cart = createTable("cart", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
  userId: text("user_id", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const cartRelations = relations(cart, ({ many, one }) => ({
  cartItems: many(cartItem),
  user: one(users, { fields: [cart.userId], references: [users.id] }),
}));

export const cartItem = createTable(
  "cart_item",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    cartId: int("cart_id", { mode: "number" })
      .notNull()
      .references(() => cart.id, { onDelete: "cascade" }),
    productId: int("product_id", { mode: "number" })
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    quantity: int("quantity", { mode: "number" }).notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updatedAt", { mode: "timestamp" }).$onUpdate(
      () => new Date(),
    ),
  },
  (cartItem) => [uniqueIndex("cart_item_id_idx").on(cartItem.id)],
);

export const cartItemRelations = relations(cartItem, ({ one }) => ({
  cart: one(cart, {
    fields: [cartItem.cartId],
    references: [cart.id],
  }),
  product: one(products, {
    fields: [cartItem.productId],
    references: [products.id],
  }),
}));

export const users = createTable(
  "user",
  {
    id: text("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    role: text({ enum: ["admin", "user"] })
      .notNull()
      .default("user"),
    name: text("name", { length: 255 }),
    email: text("email", { length: 255 }).unique().notNull(),
    emailVerified: int("email_verified", {
      mode: "timestamp",
    }).default(sql`(unixepoch())`),
    image: text("image", { length: 255 }),
  },
  (user) => [
    index("user_id_idx").on(user.id),
    index("user_name_idx").on(user.name),
    index("user_email_idx").on(user.email),
  ],
);

export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  cart: one(cart),
  profile: one(profile),
}));

export const profile = createTable(
  "profile",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    userId: text("user_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    firstName: text("first_name", { length: 255 }).notNull(),
    lastName: text("last_name", { length: 255 }).notNull(),
    company: text("company", { length: 255 }).notNull(),
    phone: text("phone", { length: 255 }).notNull(),
    address: text("address", { length: 255 }).notNull(),
    group: text({ enum: ["homeOwner", "handyman", "electrician"] }).notNull(),
  },
  (profile) => [uniqueIndex("profile_user_id_idx").on(profile.userId)],
);

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(users, { fields: [profile.userId], references: [users.id] }),
}));

export const profileInsertSchema = createInsertSchema(profile);

export const accounts = createTable(
  "account",
  {
    userId: text("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: text("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: text("provider", { length: 255 }).notNull(),
    providerAccountId: text("provider_account_id", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: text("token_type", { length: 255 }),
    scope: text("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: text("session_state", { length: 255 }),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    index("account_user_id_idx").on(account.userId),
  ],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: text("session_token", { length: 255 }).notNull().primaryKey(),
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (session) => [index("session_userId_idx").on(session.userId)],
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: text("identifier", { length: 255 }).notNull(),
    token: text("token", { length: 255 }).notNull(),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })],
);
