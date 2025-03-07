"use client";
import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useTRPC } from "~/trpc/react";
import Loader from "~/components/Loader";
import { useToggle } from "~/hooks/useToggle";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/Separator";
import CartProduct from "~/components/CartProduct";

function HeaderCart() {
  const [isOpen, toggle, setIsOpen] = useToggle(false);
  const trpc = useTRPC();

  const { data: cart, isPending } = useQuery(trpc.cart.getCart.queryOptions());

  const total = useMemo(
    () =>
      cart?.cartItems.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0),
    [cart],
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <ShoppingCart strokeWidth={1} size={36} />
      </PopoverTrigger>
      <PopoverContent className="w-fit min-w-[28rem]">
        {isPending && <Loader />}
        {cart?.cartItems.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-10">
            <ShoppingCart strokeWidth={1} size={72} />
            <span>Your cart is empty</span>
            <Link
              href="/shop"
              className={cn(buttonVariants(), "mt-10 px-24")}
              onClick={toggle}
            >
              Shop our products
            </Link>
          </div>
        )}

        {cart && cart.cartItems.length > 0 && (
          <div className="flex flex-col gap-5">
            <div className="p-5">
              <ScrollArea className="h-[65vh] max-h-[65vh] pr-5 md:h-64 md:max-h-64">
                {cart.cartItems.map((item, i) => (
                  <div key={item.id}>
                    <CartProduct {...item} />
                    {i !== cart.cartItems.length - 1 && (
                      <Separator className="my-5" />
                    )}
                  </div>
                ))}
              </ScrollArea>
            </div>
            <Separator />
            <div className="flex justify-between text-lg">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <div className="flex gap-5">
              <Link
                href="/cart"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "grow rounded-sm py-7",
                )}
                onClick={toggle}
              >
                View Cart
              </Link>
              <Link
                href="/cart"
                className={cn(
                  buttonVariants({ variant: "destructive", size: "lg" }),
                  "grow rounded-sm py-7",
                )}
                onClick={toggle}
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default HeaderCart;
