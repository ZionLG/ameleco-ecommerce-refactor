import { TRPCError } from "@trpc/server";
import { inArray } from "drizzle-orm";
import { z } from "zod";
import { categorySortSchema, categoryFilterSchema } from "~/lib/validators";

import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";
import {
  subSubCategories,
  subSubCategoryInsertSchema,
} from "~/server/db/schema";

const createSubSubCategorySchema = subSubCategoryInsertSchema.pick({
  name: true,
  subCategoryId: true,
});

export const subSubCategoriesRouter = createTRPCRouter({
  getSubSubCategories: publicProcedure
    .input(
      z.object({
        limit: z.number().positive().max(100).default(5),
        offset: z.number().nonnegative().default(0),
        sort: categorySortSchema,
        filter: categoryFilterSchema,
        includeSubCategory: z.boolean().optional().default(false),
        includeCategory: z.boolean().optional().default(false),
      }),
    )
    .query(
      async ({
        ctx,
        input: {
          limit,
          offset,
          filter,
          sort,
          includeCategory,
          includeSubCategory,
        },
      }) => {
        const nameFilter = filter?.find((f) => f.id === "name")?.value;

        return await ctx.db.query.subSubCategories.findMany({
          limit,
          offset,
          orderBy: sort
            ? (subSubCategories, { asc, desc }) =>
                sort.map(({ id, desc: isDesc }) =>
                  isDesc
                    ? desc(subSubCategories[id])
                    : asc(subSubCategories[id]),
                )
            : undefined,
          where: (subSubCategories, { like, and }) =>
            and(
              nameFilter
                ? like(subSubCategories.name, `%${nameFilter}%`)
                : undefined,
            ),
          with: includeSubCategory
            ? {
                subCategory: includeCategory
                  ? {
                      with: {
                        category: true,
                      },
                    }
                  : true,
              }
            : undefined,
        });
      },
    ),
  create: adminProcedure
    .input(createSubSubCategorySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.insert(subSubCategories).values(input);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes("SQLITE_CONSTRAINT_UNIQUE")
        ) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "A sub sub category with this name already exists.",
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
        .delete(subSubCategories)
        .where(inArray(subSubCategories.id, ids))
        .returning();
    }),
});
