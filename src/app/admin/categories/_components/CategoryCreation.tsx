"use client";

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner"

import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

const categorySchema = z.object({
  name: z.string().min(1),
});

function CategoryCreation() {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const { handleSubmit, control, reset } = form;

  const utils = api.useUtils();
  const createPost = api.categories.create.useMutation({
    onSuccess: async () => {
      await utils.categories.getAll.invalidate();
      reset();
      toast.success("Category has been created.")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof categorySchema>) => {
      createPost.mutate(values);
    },
    [createPost],
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 justify-between">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Create Category.." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default CategoryCreation;
