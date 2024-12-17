import type { RouterOutputs } from "~/trpc/react";

export type getProductsSchema = RouterOutputs["products"]["getProducts"];

export type getProductSchema = getProductsSchema[number];
