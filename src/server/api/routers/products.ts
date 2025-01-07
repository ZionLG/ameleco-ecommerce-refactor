import { TRPCError } from "@trpc/server";
import { inArray } from "drizzle-orm";
import { z } from "zod";
import { productFilterSchema, productSortSchema } from "~/lib/validators";

import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";
import {
  products,
  productsInsertSchema,
} from "~/server/db/schema";

const createProductSchema = productsInsertSchema.pick({
  name: true,
  stock: true,
  price: true,
  description: true,
  subSubCategoryId: true,
});

export const productsRouter = createTRPCRouter({
  getProduct: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async ({ input: { name }, ctx }) => {
      return await ctx.db.query.products.findFirst({
        where: (product, { eq }) => eq(product.name, name),
        with: {
          subSubCategory: {
            with: {
              subCategory: {
                with: {
                  category: true,
                },
              },
            },
          },
        },
      });
    }),
  getProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        offset: z.number().min(0),
        sort: productSortSchema,
        filter: productFilterSchema,
      }),
    )
    .query(async ({ input: { sort, filter, limit, offset }, ctx }) => {
      const nameFilter = filter?.find((f) => f.id === "name")?.value;

      // let categoryIdFilter = filter?.find((f) => f.id === "categoryId")?.value;

      // const categoryNameFilter = filter?.find(
      //   (f) => f.id === "categoryName",
      // )?.value;

      // if (categoryNameFilter) {
      //   const categories = await ctx.db.query.categories.findMany({
      //     where: (categories, { inArray }) =>
      //       inArray(categories.name, categoryNameFilter),
      //   });

      //   categoryIdFilter = categories.map((category) => category.id);
      // }

      return await ctx.db.query.products.findMany({
        limit,
        offset,
        with: {
          subSubCategory: {
            with: {
              subCategory: {
                with: {
                  category: true,
                },
              },
            },
          },
        },
        orderBy: sort
          ? (products, { asc, desc }) =>
              sort.map(({ id, desc: isDesc }) =>
                isDesc ? desc(products[id]) : asc(products[id]),
              )
          : undefined,
        where: (products, { like, and }) =>
          and(
            nameFilter ? like(products.name, `%${nameFilter}%`) : undefined,
            // categoryIdFilter
            //   ? inArray(products., categoryIdFilter)
            //   : undefined,
          ),
      });
    }),
  create: adminProcedure
    .input(createProductSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.insert(products).values({
          ...input,
          createdById: ctx.session.user.id,
        });
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
        });
      }
    }),
  delete: adminProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .mutation(async ({ ctx, input: { ids } }) => {
      return await ctx.db
        .delete(products)
        .where(inArray(products.id, ids))
        .returning();
    }),
});
