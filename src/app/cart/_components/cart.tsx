"use client";
import React, { useEffect, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/Separator";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "~/components/ui/table";
import { api } from "~/trpc/react";
import CartTableRow from "./CartTableRow";
import { useRouter } from "next/navigation";

function Cart() {
  const { data: cart } = api.cart.getCart.useQuery();
  const router = useRouter();

  const total = useMemo(
    () =>
      cart?.cartItems.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0),
    [cart],
  );

  useEffect(() => {
    if (cart?.cartItems.length === 0) {
      router.push(`/shop`);
    }
  }, [cart, router]);

  return (
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
      <div className="grow bg-background p-5">
        <Table className="bg-background">
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-right md:w-[100px]">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart?.cartItems.map(({ id, product, quantity }) => (
              <CartTableRow
                cartItemId={id}
                product={product}
                quantity={quantity}
                key={id}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex h-fit w-96 flex-col bg-background p-5">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${total}</span>
        </div>
        <Separator className="mt-8" />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Order instructions</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <span className="mt-8 text-sm">
          Taxes and shipping calculated at checkout
        </span>
        <Button className="mt-5 w-full rounded-sm py-8">Checkout</Button>
      </div>
    </div>
  );
}

export default Cart;
