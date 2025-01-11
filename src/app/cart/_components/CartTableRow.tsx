"use client";
import React from "react";
import Image from "next/image";
import { type RouterOutputs } from "~/trpc/react";
import { TableRow, TableCell } from "~/components/ui/table";
import CartItemControls from "~/components/CartItemControls";
import Stock from "~/components/Stock";

interface CartTableRowProps {
  product: NonNullable<
    RouterOutputs["cart"]["getCart"]["cartItems"][number]["product"]
  >;
  quantity: number;
  cartItemId: number;
}
const CartTableRow = ({ product, quantity, cartItemId }: CartTableRowProps) => {
  const { id, name, price, stock } = product;
  return (
    <TableRow>
      <TableCell className="flex gap-3 font-medium">
        <Image
          alt={name}
          src="https://placehold.co/100.png"
          width={100}
          height={100}
        />
        <div className="flex flex-col gap-5">
          <span className="font-semibold">{name}</span>
          <div className="flex items-center">
            <span className="font-semibold">${price}</span>
            <Stock stock={stock} />
          </div>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <CartItemControls
          cartItemId={cartItemId}
          initialQuantity={quantity}
          productId={id}
          stock={stock}
          className="justify-center"
        />
      </TableCell>
      <TableCell className="text-right">${price * quantity}</TableCell>
    </TableRow>
  );
};

export default CartTableRow;
