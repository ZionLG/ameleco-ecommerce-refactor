import React from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { api } from "~/trpc/server";
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
  const profile = await api.user.getProfile();

  if (!profile) {
    redirect("/new-user");
  }

  const { productName: paramName } = await params;

  const product = await api.products.getProduct({
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
          <div className="flex gap-2 items-center">
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
          <Image
            width={500}
            height={500}
            alt={name}
            src={productImages[0]?.url ?? "https://placehold.co/500.png"}
          />
          <ProductBasic product={product} />
        </MobileProductSection>
        <MobileProductSection section="lower">
          <div className="flex gap-2 items-center">
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
