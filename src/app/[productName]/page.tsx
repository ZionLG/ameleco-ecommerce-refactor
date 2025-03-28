import React from "react";
import { redirect } from "next/navigation";
import { caller } from "~/trpc/server";
import {
  ProductWrapper,
  ProductMain,
  StickyProduct,
  MobileProductWrapper,
  MobileProductSection,
} from "./_components/ProductLayout";
import ProductBasic from "./_components/ProductBasic";
import ImageGallery from "./_components/ImageGallery";

async function ProductPage({
  params,
}: {
  params: Promise<{ productName: string }>;
}) {
  const profile = await caller.user.getProfile();

  if (!profile) {
    redirect("/new-user");
  }

  const { productName: paramName } = await params;

  const product = await caller.products.getProduct({
    name: decodeURIComponent(paramName),
  });

  if (!product) {
    redirect("/shop");
  }

  const {
    name,
    description,
    productImages,
    productPdf,
    subSubCategory: {
      name: subSubCategoryName,
      subCategory: {
        name: subCategoryName,
        category: { name: categoryName },
      },
    },
  } = product;

  return (
    <ProductWrapper
      breadcrumbsProps={{
        category: categoryName,
        subCategory: subCategoryName,
        subSubCategory: subSubCategoryName,
        productName: name,
      }}
    >
      <ProductMain>
        <div className="rounded-sm bg-background p-10 shadow-md">
          <ImageGallery images={productImages} alt={name} />
        </div>
        <div className="flex flex-col gap-5 rounded-sm bg-background p-10 shadow-md">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">Description - </span>
            <a
              href={productPdf?.url}
              target="_blank"
              className="text-blue-500 underline"
            >
              PDF Spec
            </a>
          </div>
          <span className="text-2xl font-bold">{name}</span>
          <p>{description}</p>
        </div>
      </ProductMain>
      <StickyProduct>
        <ProductBasic product={product} />
      </StickyProduct>

      <MobileProductWrapper>
        <MobileProductSection section="upper">
          <ImageGallery images={productImages} alt={name} />
          <ProductBasic product={product} />
        </MobileProductSection>
        <MobileProductSection section="lower">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">Description - </span>
            <a
              href={productPdf?.url}
              target="_blank"
              className="text-blue-500 underline"
            >
              PDF Spec
            </a>
          </div>
          <span className="text-2xl font-bold">{name}</span>
          <p>{description}</p>
        </MobileProductSection>
      </MobileProductWrapper>
    </ProductWrapper>
  );
}

export default ProductPage;
