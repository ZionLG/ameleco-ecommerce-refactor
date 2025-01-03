"use client";
import React, { useCallback, useMemo } from "react";
import { Button } from "~/components/ui/button";

import { z } from "zod";
import { type RouterOutputs } from "~/trpc/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import FormInput from "~/components/form/FormInput";

const generateValidationSchema = (stock = 1) => {
  return z.object({
    quantity: z.number().positive().max(stock),
  });
};

function AddToCart({
  product,
}: {
  product: NonNullable<RouterOutputs["products"]["getProducts"][number]>;
}) {
  const { stock } = product;
  const itemSchema = useMemo(() => generateValidationSchema(stock), [stock]);

  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      quantity: 1,
    },
  });
  const { control, handleSubmit } = form;

  const onSubmit = useCallback((values: z.infer<typeof itemSchema>) => {
    console.log(values);
  }, []);

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
