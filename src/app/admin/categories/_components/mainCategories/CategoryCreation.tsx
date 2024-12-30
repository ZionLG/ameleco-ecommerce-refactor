"use client";

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import FormInput from "~/components/form/FormInput";

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
  const { mutate: createCategory } = api.categories.create.useMutation({
    onSuccess: async () => {
      await utils.categories.invalidate();
      reset();
      toast.success("Category has been created.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof categorySchema>) => {
      createCategory(values);
    },
    [createCategory],
  );

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-between gap-5"
      >
        <FormInput
          control={control}
          name="name"
          placeholder="Create Category.."
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default CategoryCreation;
