import { z } from "zod";
import {
  createTRPCRouter,
  adminProcedure,
} from "~/server/api/trpc";
import { UTApi } from "uploadthing/server";

export const utapi = new UTApi();

export const filesRouter = createTRPCRouter({
  delete: adminProcedure
    .input(z.object({ keys: z.array(z.string()) }))
    .mutation(({ input: { keys } }) => {
      return utapi.deleteFiles(keys);
    }),
});
