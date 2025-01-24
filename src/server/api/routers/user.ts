import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { profile, profileInsertSchema } from "~/server/db/schema";

const createProfileSchema = profileInsertSchema.omit({
  id: true,
  userId: true,
});

export const userRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.profile.findFirst({
      where: (profile, { eq }) => eq(profile.userId, ctx.session.user.id),
    });
  }),
  editProfile: protectedProcedure
    .input(createProfileSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db
          .insert(profile)
          .values({
            userId: ctx.session.user.id,
            ...input,
          })
          .onConflictDoUpdate({
            target: profile.userId,
            set: { ...input },
          });
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
        });
      }
    }),
});
