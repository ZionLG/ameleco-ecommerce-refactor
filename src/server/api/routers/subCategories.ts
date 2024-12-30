import { TRPCError } from "@trpc/server";
import { inArray } from "drizzle-orm";
import { z } from "zod";
import { categorySortSchema, categoryFilterSchema } from "~/lib/validators";

import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";
import { subCategories, subCategoryInsertSchema } from "~/server/db/schema";

const createSubCategorySchema = subCategoryInsertSchema.pick({
  name: true,
  categoryId: true,
});

export const subCategoriesRouter = createTRPCRouter({
  getSubCategories: publicProcedure
    .input(
      z.object({
        limit: z.number().positive().max(100).default(5),
        offset: z.number().nonnegative().default(0),
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
        with: {
          category: true,
        },
      });
    }),
  create: adminProcedure
    .input(createSubCategorySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.insert(subCategories).values(input);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes("SQLITE_CONSTRAINT_UNIQUE")
        ) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "A sub category with this name already exists.",
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
        .delete(subCategories)
        .where(inArray(subCategories.id, ids))
        .returning();
    }),
});
