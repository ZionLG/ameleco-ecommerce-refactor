import type { RouterOutputs } from "~/trpc/react";

export type getCategoriesSchema = RouterOutputs["categories"]["getCategories"];

export type getCategorySchema = getCategoriesSchema[number];
