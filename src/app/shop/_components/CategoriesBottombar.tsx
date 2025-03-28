"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button, buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useTRPC } from "~/trpc/react";

function CategoriesBottombar() {
  const searchParams = useSearchParams();
  const trpc = useTRPC();

  const {
    data: categories,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery(
    trpc.categories.getCategoriesCursor.infiniteQueryOptions({
      limit: 10,
    }, {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),
  );

  const transformedCategories = useMemo(
    () => categories?.pages.flatMap((page) => page.items),
    [categories],
  );

  const urlCategory = searchParams.get("category");

  return (
    <Sheet>
      <SheetTrigger className="flex w-full items-center justify-between p-5">
        <span className="text-xl font-bold text-primary">Categories</span>
        <ChevronDown className="h-5 w-5 shrink-0" />
      </SheetTrigger>
      <SheetContent side={"bottom"}>
        <SheetHeader>
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-56 pr-3">
          <div className="flex flex-col">
            {transformedCategories?.map((category) => (
              <Link
                href={{
                  pathname: "/shop",
                  query: { category: encodeURIComponent(category.name) },
                }}
                key={category.id}
                className={cn(
                  buttonVariants({
                    variant: "link",
                    className:
                      urlCategory === encodeURIComponent(category.name) &&
                      "font-semibold text-blue-400",
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
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export default CategoriesBottombar;
