import React from "react";
import CategoriesTable from "./_components/mainCategories/table/categoriesTable";
import { trpc, prefetch, HydrateClient } from "~/trpc/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import SubCategoriesTable from "./_components/subCategories/table/subCategoriesTable";
import SubSubCategoriesTable from "./_components/subSubCategories/table/subSubCategoriesTable";

async function Categories() {
  prefetch(trpc.categories.getCategories.queryOptions({}));
  prefetch(trpc.subCategories.getSubCategories.queryOptions({}));
  prefetch(trpc.subSubCategories.getSubSubCategories.queryOptions({}));

  return (
    <HydrateClient>
      <main className="flex w-full flex-col justify-center gap-10 px-10 py-5">
        <Tabs defaultValue="categories">
          <TabsList className="grid w-[600px] grid-cols-3 lg:w-full">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="sub-categories">Sub Categories</TabsTrigger>
            <TabsTrigger value="sub-sub-categories">
              Sub Sub Categories
            </TabsTrigger>
          </TabsList>
          <TabsContent value="categories">
            <CategoriesTable />
          </TabsContent>
          <TabsContent value="sub-categories">
            <SubCategoriesTable />
          </TabsContent>
          <TabsContent
            value="sub-sub-categories"
            className="max-w-[600px] lg:max-w-full"
          >
            <SubSubCategoriesTable />
          </TabsContent>
        </Tabs>
      </main>
    </HydrateClient>
  );
}

export default Categories;
