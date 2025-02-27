import React from "react";
import Stock from "~/components/Stock";
import AddToCart from "./AddToCart";
import { Separator } from "~/components/ui/Separator";
import type { RouterOutputs } from "~/trpc/react";
import { auth } from "~/server/auth";

async function ProductBasic({
  product,
}: {
  product: NonNullable<RouterOutputs["products"]["getProduct"]>;
}) {
  const session = await auth();

  const {
    name,
    stock,
    price,
    subSubCategory: {
      subCategory: {
        category: { name: categoryName },
      },
    },
  } = product;

  return (
    <>
      <span className="text-2xl font-bold">{name}</span>
      <span className="text-sm">{categoryName}</span>
      <Separator className="my-2" />
      <span className="flex min-w-fit items-center gap-2">Price: ${price}</span>
      <Stock stock={stock} />
      {session ? (
        <AddToCart product={product} />
      ) : (
        <span>Log in to add to cart</span>
      )}
    </>
  );
}

export default ProductBasic;
