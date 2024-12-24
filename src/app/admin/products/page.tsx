import React from "react";
import ProductCreation from "./_components/ProductCreation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ProductsTable from "./_components/table/productsTable";

async function Products() {
  return (
    <main className="flex flex-col justify-center items-center gap-10 px-10 py-5">
      <Tabs defaultValue="view">
        <TabsList className="grid w-[400px]l grid-cols-2">
          <TabsTrigger value="view">View</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
        </TabsList>
        <TabsContent value="view">
          <ProductsTable/>
        </TabsContent>
        <TabsContent value="create">
          <ProductCreation />
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default Products;
