"use client";
import React from "react";
import Image from "next/image";
import { type RouterOutputs } from "~/trpc/react";
import Link from "next/link";
import CartItemControls from "./CartItemControls";

function CartProduct({
  product,
  quantity,
  id,
}: RouterOutputs["cart"]["getCart"]["cartItems"][number]) {
  const { name, price, stock, id: productId,productImages } = product;

  return (
    <div className="flex gap-3">
      <Image
        width={100}
        height={100}
        alt={name}
        className="rounded-lg"
        src={productImages[0]?.url ?? "https://placehold.co/100.png"}
        />
      <div className="flex shrink flex-col gap-3 break-words">
        <Link
          href={`/${encodeURIComponent(name)}`}
          className="max-w-36 text-xl font-semibold"
        >
          {product.name}
        </Link>
        <span className="text-default-500 text-xl font-semibold">${price}</span>
      </div>
      <CartItemControls
        cartItemId={id}
        initialQuantity={quantity}
        productId={productId}
        stock={stock}
        className="justify-end"
      />
    </div>
  );
}

export default CartProduct;
