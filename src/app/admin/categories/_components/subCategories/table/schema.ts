import type { RouterOutputs } from "~/trpc/react";

export type getSubCategoriesSchema = RouterOutputs["subCategories"]["getSubCategories"];

export type getSubCategorySchema = getSubCategoriesSchema[number];
