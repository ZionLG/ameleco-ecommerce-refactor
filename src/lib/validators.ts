import { z } from "zod";

export const productFilterSchema = z
  .array(
    z.union([
      z.object({
        id: z.literal("name"),
        value: z.string(),
      }),
      z.object({
        id: z.literal("categoryId"),
        value: z.array(z.number()),
      }),
      z.object({
        id: z.literal("categoryName"),
        value: z.array(z.string()),
      }),
    ]),
  )
  .optional();

export const productSortSchema = z
  .array(
    z.object({
      id: z.enum(["name", "createdAt"]),
      desc: z.boolean(),
    }),
  )
  .optional();

export const categorySortSchema = z
  .array(
    z.object({
      id: z.enum(["name", "createdAt"]),
      desc: z.boolean(),
    }),
  )
  .optional();

export const categoryFilterSchema = z
  .array(
    z.object({
      id: z.literal("name"),
      value: z.string(),
    }),
  )
  .optional();
