"use client";

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Loader2 } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";

const productSchema = z.object({
  name: z.string().min(3),
  description: z.string(),
  price: z.number().positive(),
  stock: z.number().nonnegative(),
  categoryId: z
    .number({
      required_error: "Category is required",
      invalid_type_error: "Category must be a Id",
    })
    .nonnegative({ message: "Category is required" }),
});

function ProductCreation() {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: -1,
      price: 0,
      stock: 0,
    },
  });

  const { handleSubmit, control, reset } = form;

  const utils = api.useUtils();
  const { data: categories, isPending: isCategoriesPending } =
    api.categories.getAll.useQuery();

  const { mutate, isPending } = api.products.create.useMutation({
    onSuccess: async () => {
      await utils.products.invalidate();
      reset();
      toast.success("Product has been created.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof productSchema>) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between gap-5"
      >
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <div className="flex grow items-center gap-2">
                <Select
                  disabled={isCategoriesPending}
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value > 0 ? field.value.toString() : ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isPending && <Loader2 size={36} className="animate-spin" />}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-5">
          <FormField
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="stock"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2"
        >
          <span>Submit</span>{" "}
          {isPending && <Loader2 size={36} className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}

export default ProductCreation;
