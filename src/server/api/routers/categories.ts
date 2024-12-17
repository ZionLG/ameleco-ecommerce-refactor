import { TRPCError } from "@trpc/server";
import { inArray } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";
import { categories, categoryInsertSchema } from "~/server/db/schema";

const createCategorySchema = categoryInsertSchema.pick({ name: true });

export const categoriesRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ sortByName: z.boolean() }).optional())
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.categories.findMany({
        orderBy: input?.sortByName
          ? (categories, { asc }) => asc(categories.name)
          : undefined,
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
