import React from "react";
import CategoriesTable from "./_components/table/categoriesTable";
import { api, HydrateClient } from "~/trpc/server";

async function Categories({
  searchParams,
}: {
  searchParams: Promise<{
    pageSize: string | undefined;
    pageIndex: string | undefined;
  }>;
}) {
  const { pageSize: paramPageSize = "5", pageIndex: paramPageIndex = "1" } =
    await searchParams;
  
  const pageSize = parseInt(paramPageSize);
  const pageIndex = parseInt(paramPageIndex);

  void api.categories.getCategories.prefetch({
    limit: pageSize,
    offset: pageSize * (pageIndex - 1),
  });

  return (
    <HydrateClient>
      <main className="flex flex-col justify-center gap-10 px-10 py-5">
        <CategoriesTable />
      </main>
    </HydrateClient>
  );
}

export default Categories;
