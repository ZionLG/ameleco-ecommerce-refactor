import type { RouterOutputs } from "~/trpc/react";

export type getCategoriesSchema = RouterOutputs["categories"]["getAll"];

export type getCategorySchema = getCategoriesSchema[number];
