'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface SearchProps<TProduct> {
  maxResults?: number;
  categories: string[];
  products: TProduct[];
}
function ProductSearch< TProduct>({
  maxResults = 5,
  categories,
  products,
}: SearchProps<TProduct>) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filtered, setFiltered] = useState<TProduct[]>([]);
  const router = useRouter();

  const handleOnSelect = (itemName: string) => {
    console.log("seleced");
    setSearchTerm("");
    void router.push(`/shop/${encodeURIComponent(itemName)}`);
  };


  return (
    <div className="group/display relative flex flex-col px-2 pt-4">
      <div className={`flex items-center`}>
        <div className="min-w-fit">
          <Select
            defaultValue="all categories"
            value={selectedCategory ?? "all categories"}
            onValueChange={(selected) => {
              setSelectedCategory(selected);
            }}
          >
            <SelectTrigger className="md:text-medium h-11 rounded-r-none bg-secondary text-xs font-semibold focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-36 max-h-36 pr-3">
                <SelectGroup className="max-h-36">
                  <SelectItem value={"all categories"}>
                    All Categories
                  </SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        <div className="flex grow">
          <Input
            type="search"
            value={searchTerm}
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 rounded-none border-x-0 focus-visible:ring-0 focus-visible:ring-offset-0 md:min-w-[12rem]"
          />
        </div>
        <Search
          cursor={"pointer"}
          // onClick={() => {
          //   void router.push({
          //     pathname: "/shop",
          //     query:
          //       category === "all categories"
          //         ? { q: searchTerm }
          //         : { category: category, q: searchTerm },
          //   });
          // }}
          className="h-11 w-16 rounded-r-md bg-blue-950 p-2 text-white"
        />
      </div>
      {/* {filtered.length > 0 && (
        <div className="absolute right-[1px] top-full z-50 hidden w-full rounded-md bg-background p-1 group-focus-within/display:block">
          {filtered.map((v) => formatResult(v))}
        </div>
      )} */}
    </div>
  );
}

export default ProductSearch;
