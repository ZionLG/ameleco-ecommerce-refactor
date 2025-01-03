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
import { Separator } from "~/components/ui/Separator";
import Stock from "~/components/Stock";
import AddToCart from "./_components/AddToCart";
import { auth } from "~/server/auth";

async function ProductPage({ params }: { params: Promise<{ productName: string }> }) {
  const { productName: paramName } = await params;

  const product = await api.products.getProduct({
    name: decodeURIComponent(paramName),
  });

  if (!product) {
    redirect("/shop");
  }

  const session = await auth();

  const {
    name,
    price,
    stock,
    description,
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
          <Image
            width={500}
            height={500}
            alt={name}
            src={"https://placehold.co/500.png"}
          />
        </div>
        <div className="flex flex-col gap-5 rounded-sm bg-background p-10 shadow-md">
          <span className="text-xl font-semibold">Description</span>
          <span className="text-2xl font-bold">{name}</span>
          <p>{description}</p>
        </div>
      </ProductMain>
      <StickyProduct>
        <span className="text-2xl font-bold">{name}</span>
        <span className="text-sm">{categoryName}</span>
        <Separator className="my-2" />
        <span className="flex min-w-fit items-center gap-2">
          Price: ${price}
        </span>
        <Stock stock={stock} />
        {session ? <AddToCart product={product} /> : <span>Log in to add to cart</span>}
      </StickyProduct>

      <MobileProductWrapper>
        <MobileProductSection section="upper">
          <Image
            width={500}
            height={500}
            alt={name}
            src={"https://placehold.co/500.png"}
          />
          <span className="text-2xl font-bold">{name}</span>
          <span className="text-sm">{categoryName}</span>
          <Separator className="my-2" />
          <span className="flex min-w-fit items-center gap-2">
            Price: ${price}
          </span>
          <Stock stock={stock} />
          {session ? <AddToCart product={product} /> : <span>Log in to add to cart</span>}
        </MobileProductSection>
        <MobileProductSection section="lower"></MobileProductSection>
      </MobileProductWrapper>
    </ProductWrapper>
  );
}

export default ProductPage;
