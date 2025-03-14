"use client";
import React, {
  type ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "~/lib/utils";
import { useTRPC } from "~/trpc/react";

interface CartItemControlsProps {
  productId: number;
  initialQuantity: number;
  stock: number;
  cartItemId: number;
  className?: string;
}

function CartItemControls({
  productId,
  initialQuantity,
  stock,
  cartItemId,
  className,
}: CartItemControlsProps) {
  const [localQuantity, setLocalQuantity] = useState(initialQuantity);

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { mutate: updateItem } = useMutation(
    trpc.cart.addToCart.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.cart.pathFilter());

        toast("Updated successfully");
      },
      onMutate: async (updatedItem) => {
        toast("Updating cart...");

        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(trpc.cart.getCart.pathFilter());

        // Snapshot the previous value
        const previousCart = queryClient.getQueryData(
          trpc.cart.getCart.queryKey(),
        );

        const newItems = previousCart?.cartItems.map((item) => {
          if (item.id === cartItemId) {
            return { ...item, quantity: updatedItem.quantity };
          }
          return item;
        });

        // Optimistically update to the new value
        queryClient.setQueryData(trpc.cart.getCart.queryKey(), (old) =>
          old && newItems ? { ...old, cartItems: newItems } : old,
        );

        // Return a context object with the snapshotted value
        return { previousCart };
      },
      onError: (_err, _newCart, context) => {
        queryClient.setQueryData(
          trpc.cart.getCart.queryKey(),
          context?.previousCart,
        );
      },
    }),
  );

  useEffect(() => {
    if (localQuantity === initialQuantity) return;

    updateItem({ productId, quantity: localQuantity });
  }, [localQuantity, initialQuantity, productId, updateItem]);

  const { mutate: removeItem } = useMutation(
    trpc.cart.removeFromCart.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.cart.pathFilter());

        toast("Removed successfully");
      },
    }),
  );

  const handleRemoveItem = useCallback(() => {
    removeItem({ cartItemId });
  }, [cartItemId, removeItem]);

  const handleSetLocalQuantity = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.valueAsNumber;
      if (value > stock || value < 1) {
        toast.error("Invalid quantity", {});
        return;
      }

      setLocalQuantity(value);
    },
    [stock],
  );

  return (
    <div className={cn("flex grow gap-2 self-center", className)}>
      <Input
        value={localQuantity}
        onChange={handleSetLocalQuantity}
        type="number"
        className="w-16"
      />
      <div className="flex flex-col items-center gap-2">
        <Button
          variant="outline"
          onClick={handleRemoveItem}
          size="icon"
          className="border-red-500"
        >
          <Trash color="red" />
        </Button>
      </div>
    </div>
  );
}

export default CartItemControls;
