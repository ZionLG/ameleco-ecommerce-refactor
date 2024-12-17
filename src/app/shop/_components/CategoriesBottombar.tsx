"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import { buttonVariants } from "~/components/ui/button";
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

function CategoriesBottombar() {
  const searchParams = useSearchParams();
  const { data: categories } = api.categories.getAll.useQuery({ sortByName: true }, {
    placeholderData: (previous) => previous,
    refetchOnWindowFocus: false,
  });

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
                    className:
                      urlCategory === encodeURIComponent(category.name) &&
                      "font-semibold text-blue-400",
                  }),
                )} `}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export default CategoriesBottombar;
