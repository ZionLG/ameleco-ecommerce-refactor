import React from "react";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { prefetch, trpc } from "~/trpc/server";
import Cart from "./_components/cart";

async function CartPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  prefetch(trpc.cart.getCart.queryOptions());

  return (
    <main className="flex flex-col gap-5 bg-secondary py-10 lg:px-16">
      <span className="text-center text-xl font-semibold lg:text-start">
        My cart
      </span>
      <Cart />
    </main>
  );
}

export default CartPage;
