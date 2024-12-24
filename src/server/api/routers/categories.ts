import { TRPCError } from "@trpc/server";
import { inArray } from "drizzle-orm";
import { z } from "zod";
import { categorySortSchema, categoryFilterSchema } from "~/lib/validators";

import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";
import { categories, categoryInsertSchema } from "~/server/db/schema";

const createCategorySchema = categoryInsertSchema.pick({ name: true });

export const categoriesRouter = createTRPCRouter({
  getCategories: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        offset: z.number().min(0),
        sort: categorySortSchema,
        filter: categoryFilterSchema,
      }),
    )
    .query(async ({ ctx, input: { limit, offset, filter, sort } }) => {
      const nameFilter = filter?.find((f) => f.id === "name")?.value;

      return await ctx.db.query.categories.findMany({
        limit,
        offset,
        orderBy: sort
          ? (categories, { asc, desc }) =>
              sort.map(({ id, desc: isDesc }) =>
                isDesc ? desc(categories[id]) : asc(categories[id]),
              )
          : undefined,
        where: (categories, { like, and }) =>
          and(
            nameFilter ? like(categories.name, `%${nameFilter}%`) : undefined,
          ),
      });
    }),
  getSubCategories: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        offset: z.number().min(0),
        sort: categorySortSchema,
        filter: categoryFilterSchema,
      }),
    )
    .query(async ({ ctx, input: { limit, offset, filter, sort } }) => {
      const nameFilter = filter?.find((f) => f.id === "name")?.value;

      return await ctx.db.query.subCategories.findMany({
        limit,
        offset,
        orderBy: sort
          ? (subCategories, { asc, desc }) =>
              sort.map(({ id, desc: isDesc }) =>
                isDesc ? desc(subCategories[id]) : asc(subCategories[id]),
              )
          : undefined,
        where: (subCategories, { like, and }) =>
          and(
            nameFilter
              ? like(subCategories.name, `%${nameFilter}%`)
              : undefined,
          ),
      });
    }),
  getSubSubCategories: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        offset: z.number().min(0),
        sort: categorySortSchema,
        filter: categoryFilterSchema,
      }),
    )
    .query(async ({ ctx, input: { limit, offset, filter, sort } }) => {
      const nameFilter = filter?.find((f) => f.id === "name")?.value;

      return await ctx.db.query.subSubCategories.findMany({
        limit,
        offset,
        orderBy: sort
          ? (subSubCategories, { asc, desc }) =>
              sort.map(({ id, desc: isDesc }) =>
                isDesc ? desc(subSubCategories[id]) : asc(subSubCategories[id]),
              )
          : undefined,
        where: (subSubCategories, { like, and }) =>
          and(
            nameFilter
              ? like(subSubCategories.name, `%${nameFilter}%`)
              : undefined,
          ),
      });
    }),
  create: adminProcedure
    .input(createCategorySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.insert(categories).values(input);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes("SQLITE_CONSTRAINT_UNIQUE")
        ) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "A category with this name already exists.",
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
        });
      }
    }),
  delete: adminProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .mutation(({ ctx, input: { ids } }) => {
      return ctx.db
        .delete(categories)
        .where(inArray(categories.id, ids))
        .returning();
    }),
});
