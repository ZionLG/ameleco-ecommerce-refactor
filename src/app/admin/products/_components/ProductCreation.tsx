"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import FormInput from "~/components/form/FormInput";
import { useDebounce } from "~/hooks/useDebounce";
import FormCombobox from "~/components/form/FormCombobox";
import PdfInput from "./PdfInput";
import ImagesInput from "./ImagesInput";
import ImagePreview from "./ImagePreview";
import { fileSchema } from "~/lib/validators";

const productSchema = z.object({
  name: z.string().min(3),
  description: z.string(),
  price: z.number().positive(),
  stock: z.number().nonnegative(),
  subSubCategoryId: z.string().min(1, "Category is required"),
  pdfSpec: fileSchema.refine((value) => {
    return value.url && value.fileKey;
  }, "PDF Spec is required"),
  images: z.array(fileSchema),
});

function ProductCreation() {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      subSubCategoryId: "",
      pdfSpec: {
        fileKey: "",
        url: "",
      },
      images: [],
      price: 0,
      stock: 0,
    },
  });

  const { handleSubmit, control, reset, watch } = form;

  const images = watch("images");

  const {
    field: { onChange: onImagesChange },
  } = useController({
    name: "images",
    control,
  });

  const utils = api.useUtils();

  const [subSubCategorySearch, setSubSubCategorySearch] = useState("");

  const subSubCategorySearchDebounce = useDebounce(subSubCategorySearch, 500);

  const { data: subSubCategories, isPending: isSubSubCategoriesPending } =
    api.subSubCategories.getSubSubCategories.useQuery({
      filter: [{ id: "name", value: subSubCategorySearchDebounce }],
    });

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
      const { pdfSpec, images, ...productDaa } = values;
      mutate({
        productData: {
          ...productDaa,
          subSubCategoryId: parseInt(productDaa.subSubCategoryId),
        },
        pdfSpec,
        images,
      });
    },
    [mutate],
  );

  const transformedSubSubCategoriess = useMemo(
    () =>
      subSubCategories?.map((subSubCategory) => ({
        label: subSubCategory.name,
        value: subSubCategory.id,
      })),
    [subSubCategories],
  );

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between gap-5"
      >
        <FormInput control={control} name="name" label="Name" />
        <FormCombobox
          control={control}
          name="subSubCategoryId"
          formLabel="Sub sub category"
          items={transformedSubSubCategoriess ?? []}
          isLoading={isSubSubCategoriesPending}
          manualSearch
          selectItemMsg="Select a sub sub category"
          onSearchChange={setSubSubCategorySearch}
        />
        <FormInput
          control={control}
          name="description"
          type="textarea"
          label="Description"
        />
        <div className="flex gap-5">
          <FormInput
            control={control}
            name="price"
            type="number"
            label="Price"
            className="grow"
          />
          <FormInput
            control={control}
            name="stock"
            type="number"
            label="Stock"
            className="grow"
          />
        </div>
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="pdfSpec"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PDF Spec</FormLabel>
                <FormControl>
                  <PdfInput {...field} />
                </FormControl>
                <FormDescription>Product PDF specification</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImagesInput {...field} />
                </FormControl>
                <FormDescription>Product Images</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {!!images.length && (
          <ImagePreview images={images} onChange={onImagesChange} />
        )}
        <Button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2"
        >
          <span>Submit</span>
          {isPending && <Loader2 size={36} className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}

export default ProductCreation;
