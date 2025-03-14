"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import FormInput from "~/components/form/FormInput";
import FormCombobox from "~/components/form/FormCombobox";
import { useDebounce } from "~/hooks/useDebounce";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "~/trpc/react";

const subCategorySchema = z.object({
  name: z.string().min(1),
  categoryId: z.string().min(1, "Category is required"),
});

function SubCategoryCreation() {
  const form = useForm<z.infer<typeof subCategorySchema>>({
    resolver: zodResolver(subCategorySchema),
    defaultValues: {
      name: "",
      categoryId: "",
    },
  });

  const { handleSubmit, control, reset } = form;

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  
  const { mutate: createCategory } = useMutation(trpc.subCategories.create.mutationOptions({
    onSuccess: async () => {
      await queryClient.invalidateQueries(trpc.subCategories.pathFilter());
      reset();
      toast.success("Sub category has been created.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  }));

  const onSubmit = useCallback(
    (values: z.infer<typeof subCategorySchema>) => {
      createCategory({
        ...values,
        categoryId: parseInt(values.categoryId),
      });
    },
    [createCategory],
  );

  const [categorySearch, setCategorySearch] = useState("");

  const categorySearchDebounce = useDebounce(categorySearch, 500);

  const { data: categories, isPending: categoriesIsPending } =
    api.categories.getCategories.useQuery({
      filter: [{ id: "name", value: categorySearchDebounce }],
    });

  const transformedCategories = useMemo(
      () =>
        categories?.map((category) => ({
          label: category.name,
          value: category.id,
        })),
      [categories],
    );
    
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-between gap-5"
      >
        <FormCombobox
          name="categoryId"
          control={control}
          onSearchChange={setCategorySearch}
          items={transformedCategories ?? []}
          isLoading={categoriesIsPending}
          className="w-48"
          manualSearch
          selectItemMsg="Select a category"
        />
        <FormInput
          control={control}
          name="name"
          placeholder="Create Sub Category.."
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default SubCategoryCreation;
