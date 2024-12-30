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

  const utils = api.useUtils();
  const { mutate: createCategory } = api.subSubCategories.create.useMutation({
    onSuccess: async () => {
      await utils.subSubCategories.invalidate();
      reset();
      toast.success("Sub sub category has been created.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

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

  const { data: subCategories, isPending: subCategoriesIsPending } =
    api.subCategories.getSubCategories.useQuery({
      filter: [{ id: "name", value: subCategorySearchDebounce }],
    });

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
