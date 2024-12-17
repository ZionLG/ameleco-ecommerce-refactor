"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

function CategoriesSidebar() {
  const searchParams = useSearchParams();
  const { data: categories } = api.categories.getAll.useQuery({ sortByName: true }, {
    placeholderData: (previous) => previous,
    refetchOnWindowFocus: false,
  });

  const urlCategory = searchParams.get("category");

  return (
    <div className="text-md invisible hidden w-[18rem] flex-col rounded-md bg-secondary p-5 lg:visible lg:flex">
      <span className="text-xl font-bold text-primary">Categories</span>
      {categories?.map((category) => (
        <Link
          href={{
            pathname: "/shop",
            query: { category: encodeURIComponent(category.name) },
          }}
          key={category.id}
          className={` ${cn(
            buttonVariants({
              variant: "link",
              className: `self-start p-0 ${
                urlCategory === encodeURIComponent(category.name) &&
                "font-semibold text-blue-400"
              }`,
            }),
          )} `}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}

export default CategoriesSidebar;
