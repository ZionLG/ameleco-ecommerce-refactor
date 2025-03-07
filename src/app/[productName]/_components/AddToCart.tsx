"use client";
import React, { useCallback, useMemo } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import FormInput from "~/components/form/FormInput";
import { Button } from "~/components/ui/button";
import { useTRPC, type RouterOutputs } from "~/trpc/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const generateValidationSchema = (stock = 1) => {
  return z.object({
    quantity: z.number().positive().max(stock),
  });
};

function AddToCart({
  product,
}: {
  product: NonNullable<RouterOutputs["products"]["getProduct"]>;
}) {
  const { stock, id } = product;
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const itemSchema = useMemo(() => generateValidationSchema(stock), [stock]);

  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      quantity: 1,
    },
  });
  const { control, handleSubmit } = form;

  const { mutate } = useMutation(
    trpc.cart.addToCart.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.cart.getCart);
        toast("Added to cart successfully");
      },
    }),
  );

  const onSubmit = useCallback(
    (values: z.infer<typeof itemSchema>) => {
      toast("Adding to cart");
      mutate({ productId: id, quantity: values.quantity });
    },
    [id, mutate],
  );

  if (stock === 0) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormInput
          control={control}
          name="quantity"
          type="number"
          label="Quantity"
        />
        <Button type="submit">Add to cart</Button>
      </form>
    </Form>
  );
}

export default AddToCart;
