import React from "react";
import CategoriesTable from "./_components/table/categoriesTable";
import { api, HydrateClient } from "~/trpc/server";

function Categories() {
  void api.categories.getAll.prefetch();
  
  return (
    <HydrateClient>
      <main className="flex flex-col justify-center gap-10 px-10 py-5">
        <CategoriesTable />
      </main>
    </HydrateClient>
  );
}

export default Categories;
