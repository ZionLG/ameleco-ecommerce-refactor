"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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
import FormInput from "~/components/form/FormInput";
import { useDebounce } from "~/hooks/useDebounce";
import FormCombobox from "~/components/form/FormCombobox";
import PdfInput from "./PdfInput";
import ImagesInput from "./ImagesInput";
import ImagePreview from "./ImagePreview";
import { fileSchema } from "~/lib/validators";
import { useTRPC } from "~/trpc/react";

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

interface ProductCreationProps {
  productId?: number;
}

function ProductCreation({ productId }: ProductCreationProps) {
  const router = useRouter();
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

  const { handleSubmit, control, reset, watch, setValue } = form;

  const images = watch("images");

  const {
    field: { onChange: onImagesChange },
  } = useController({
    name: "images",
    control,
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [subSubCategorySearch, setSubSubCategorySearch] = useState("");

  const subSubCategorySearchDebounce = useDebounce(subSubCategorySearch, 500);

  const { data: subSubCategories, isPending: isSubSubCategoriesPending } =
    useQuery(
      trpc.subSubCategories.getSubSubCategories.queryOptions({
        filter: [{ id: "name", value: subSubCategorySearchDebounce }],
      }),
    );

  const { data: product } = useQuery(
    trpc.products.getProductById.queryOptions(
      {
        id: productId ?? 0,
      },
      {
        enabled: !!productId,
      },
    ),
  );

  const { mutate: createProduct, isPending: isCreatePending } = useMutation(
    trpc.products.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.products.pathFilter());
        reset();
        toast.success("Product has been created.");
        router.push("/admin/products");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const { mutate: updateProduct, isPending: isUpdatePending } = useMutation(
    trpc.products.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.products.pathFilter());
        toast.success("Product has been updated.");
        router.push("/admin/products");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const onSubmit = useCallback(
    (values: z.infer<typeof productSchema>) => {
      const { pdfSpec, images, ...productData } = values;
      if (productId) {
        updateProduct({
          id: productId,
          productData: {
            ...productData,
            subSubCategoryId: parseInt(productData.subSubCategoryId),
          },
          pdfSpec,
          images,
        });
      } else {
        createProduct({
          productData: {
            ...productData,
            subSubCategoryId: parseInt(productData.subSubCategoryId),
          },
          pdfSpec,
          images,
        });
      }
    },
    [createProduct, updateProduct, productId],
  );

  const transformedSubSubCategoriess = useMemo(
    () =>
      subSubCategories?.map((subSubCategory) => ({
        label: subSubCategory.name,
        value: subSubCategory.id,
      })),
    [subSubCategories],
  );

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("description", product.description ?? "");
      setValue("subSubCategoryId", product.subSubCategoryId.toString());
      setValue("price", product.price);
      setValue("stock", product.stock);
      if (product.productPdf) setValue("pdfSpec", product.productPdf);
      setValue("images", product.productImages);
    }
  }, [product, setValue]);

  const isPending = isCreatePending || isUpdatePending;

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
          <span>{productId ? "Update" : "Create"}</span>
          {isPending && <Loader2 size={36} className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}

export default ProductCreation;
