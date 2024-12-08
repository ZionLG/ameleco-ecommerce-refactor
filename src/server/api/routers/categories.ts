import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";
import { categories } from "~/server/db/schema";

export const categoriesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.categories.findMany({
      columns: {
        id: true,
        name: true,
      },
    });
  }),
  create: adminProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input: { name } }) => {
      await ctx.db.insert(categories).values({
        name,
      });
    }),
  // getCategoriesAdmin: adminProcedure
  //   .input(
  //     z.object({
  //       sort: z.array(
  //         z.object({
  //           id: z.enum(["name"]),
  //           desc: z.boolean(),
  //         }),
  //       ),
  //       filter: z.string().optional(),
  //     }),
  //   )
  //   .query(async ({ input: { sort, filter }, ctx }) => {
  //     return await ctx.db.query.categories.findMany({
  //       orderBy: (categories, { asc, desc }) =>
  //         sort.map(({ id, desc: isDesc }) =>
  //           isDesc ? desc(categories[id]) : asc(categories[id]),
  //         ),
  //       where: (categories, { like }) => like(categories.name, `%${filter}%`),
  //     });
  //   }),
});
