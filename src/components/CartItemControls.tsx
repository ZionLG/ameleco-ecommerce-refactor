"use client";
import React, {
  type ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "~/lib/utils";

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

  const utils = api.useUtils();
  const { mutate: updateItem } = api.cart.addToCart.useMutation({
    onSuccess: async () => {
      await utils.cart.invalidate();
      toast("Updated successfully");
    },
    onMutate: async (updatedItem) => {
      toast("Updating cart...");

      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await utils.cart.getCart.cancel();

      // Snapshot the previous value
      const previousCart = utils.cart.getCart.getData();

      const newItems = previousCart?.cartItems.map((item) => {
        if (item.id === cartItemId) {
          return { ...item, quantity: updatedItem.quantity };
        }
        return item;
      });

      // Optimistically update to the new value
      utils.cart.getCart.setData(undefined, (old) =>
        old && newItems ? { ...old, cartItems: newItems } : old,
      );

      // Return a context object with the snapshotted value
      return { previousCart };
    },
    onError: (_err, _newCart, context) => {
      utils.cart.getCart.setData(undefined, context?.previousCart);
    },
  });

  useEffect(() => {
    if (localQuantity === initialQuantity) return;

    updateItem({ productId, quantity: localQuantity });
  }, [localQuantity, initialQuantity, productId, updateItem]);

  const { mutate: removeItem } = api.cart.removeFromCart.useMutation({
    onSuccess: async () => {
      await utils.cart.invalidate();
      toast("Removed successfully");
    },
  });

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
