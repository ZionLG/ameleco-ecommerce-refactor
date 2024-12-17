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
  (category) => [uniqueIndex("category_id_idx").on(category.id)],
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const categoryInsertSchema = createInsertSchema(categories, {
  name: (schema) => schema.min(3),
});

export const products = createTable(
  "product",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 64 }).notNull(),
    description: text("description"),
    stock: int("stock", { mode: "number" }).notNull(),
    price: int("price", { mode: "number" }).notNull(),
    categoryId: int("category_id", { mode: "number" })
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
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

export const productsRelations = relations(products, ({ one }) => ({
  categories: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));

export const posts = createTable(
  "post",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 256 }),
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
  (example) => [
    index("created_by_idx").on(example.createdById),
    index("name_idx").on(example.name),
  ],
);

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
    index("user_name_idx").on(user.name),
    index("user_email_idx").on(user.email),
  ],
);

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

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
