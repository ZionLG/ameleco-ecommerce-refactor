"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { api } from "~/trpc/react";
import ProductCard from "./ProductCard";

function Products() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const filter = [
    urlCategory && {
      id: "categoryName" as const,
      value: [decodeURIComponent(urlCategory)],
    },
  ].filter((filter) => !!filter);

  const { data: products } = api.products.getProducts.useQuery(
    {
      limit: 50,
      offset: 0,
      filter: filter,
    },
    {
      placeholderData: (previous) => previous,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <div className="3xl:grid-cols-4 mt-10 grid h-fit grid-cols-1 justify-center gap-x-32 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
      {products?.map((product) => {
        if (
          !urlCategory ||
          product.subSubCategory.name === decodeURIComponent(urlCategory)
        ) {
          return <ProductCard product={product} key={product.id} />;
        }
      })}
    </div>
  );
}

export default Products;
