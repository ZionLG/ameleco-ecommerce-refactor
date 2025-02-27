"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import { Button, buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

function CategoriesSidebar() {
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  const {
    data: categories,
    fetchNextPage,
    hasNextPage,
    status,
  } = api.categories.getCategoriesCursor.useInfiniteQuery(
    { limit: 10 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const transformedCategories = useMemo(
    () => categories?.pages.flatMap((page) => page.items),
    [categories],
  );

  const urlCategory = searchParams.get("category");

  return (
    <div className="text-md invisible hidden w-[18rem] flex-col rounded-md bg-secondary p-5 lg:visible lg:flex">
      <span className="text-xl font-bold text-primary">Categories</span>
      {isClient && transformedCategories?.map((category) => (
        <Link
          href={{
            pathname: "/shop",
            query: { category: encodeURIComponent(category.name) },
          }}
          key={category.id}
          className={cn(
            buttonVariants({
              variant: "link",
              className: `self-start p-0 ${
                urlCategory === encodeURIComponent(category.name) &&
                "font-semibold text-blue-400"
              }`,
            }),
          )}
        >
          {category.name}
        </Link>
      ))}
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={status === "pending"}
          variant={"outline"}
        >
          Load more
        </Button>
      )}
    </div>
  );
}

export default CategoriesSidebar;
