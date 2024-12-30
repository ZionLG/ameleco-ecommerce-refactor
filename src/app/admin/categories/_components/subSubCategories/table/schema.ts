import type { RouterOutputs } from "~/trpc/react";

export type getSubSubCategoriesSchema = RouterOutputs["subSubCategories"]["getSubSubCategories"];

export type getSubSubCategorySchema = getSubSubCategoriesSchema[number];
