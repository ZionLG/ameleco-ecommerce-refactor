"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { useTRPC } from "~/trpc/react";
import FormInput from "~/components/form/FormInput";
import FormCombobox from "~/components/form/FormCombobox";
import { useDebounce } from "~/hooks/useDebounce";

const subSubCategorySchema = z.object({
  name: z.string().min(1),
  subCategoryId: z.string().min(1, "Category is required"),
});

function SubCategoryCreation() {
  const form = useForm<z.infer<typeof subSubCategorySchema>>({
    resolver: zodResolver(subSubCategorySchema),
    defaultValues: {
      name: "",
      subCategoryId: "",
    },
  });

  const { handleSubmit, control, reset } = form;

  const trpc = useTRPC();
  const queryClient = useQueryClient();  
  
  const { mutate: createCategory } = useMutation(trpc.subSubCategories.create.mutationOptions({
    onSuccess: async () => {
      await queryClient.invalidateQueries(trpc.subSubCategories.pathFilter());
      reset();
      toast.success("Sub sub category has been created.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  }));

  const onSubmit = useCallback(
    (values: z.infer<typeof subSubCategorySchema>) => {
      createCategory({
        ...values,
        subCategoryId: parseInt(values.subCategoryId),
      });
    },
    [createCategory],
  );

  const [subCategorySearch, setSubCategorySearch] = useState("");

  const subCategorySearchDebounce = useDebounce(subCategorySearch, 500);

  const { data: subCategories, isPending: subCategoriesIsPending } = useQuery(
    trpc.subCategories.getSubCategories.queryOptions({
      filter: [{ id: "name", value: subCategorySearchDebounce }],
    }),
  );

  const transformedSubCategories = useMemo(
    () =>
      subCategories?.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    [subCategories],
  );

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-between gap-5"
      >
        <FormCombobox
          name="subCategoryId"
          control={control}
          onSearchChange={setSubCategorySearch}
          items={transformedSubCategories ?? []}
          isLoading={subCategoriesIsPending}
          className="w-48"
          manualSearch
          selectItemMsg="Select a sub category"
        />
        <FormInput
          control={control}
          name="name"
          placeholder="Create Sub Sub Category.."
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default SubCategoryCreation;
