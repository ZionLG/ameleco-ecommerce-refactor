"use client";
import React, { useCallback, useState } from "react";
import Link from "next/link";
import { LogIn, LogOut, ShoppingCart, UserCircle2 } from "lucide-react";
import type { User } from "next-auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import Loader from "~/components/Loader";
import { useToggle } from "~/hooks/useToggle";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/Separator";

function HeaderAuth({ user }: { user?: User }) {
  const [isOpen, toggle, setIsOpen] = useToggle(false);

  const { data: cart, isPending } = api.cart.getCart.useQuery();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <ShoppingCart strokeWidth={1} size={36} />
      </PopoverTrigger>
      <PopoverContent className="w-80">
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
                    <CartProduct
                      product={item.product}
                      startingQuantity={item.quantity}
                      cartItemId={item.id}
                    />
                    {i !== data.items.length - 1 && (
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
                href={"/cart"}
                className={`${cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                )} grow rounded-sm py-7`}
                onClick={() => setIsOpen(false)}
              >
                View Cart
              </Link>
              <Link
                href={"/cart"}
                className={`${cn(
                  buttonVariants({ variant: "destructive", size: "lg" }),
                )} grow rounded-sm py-7`}
                onClick={() => setIsOpen(false)}
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

export default HeaderAuth;
