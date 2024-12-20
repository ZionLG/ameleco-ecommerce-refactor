import React, { Suspense } from "react";
import Image from "next/image";
import RoutePathBreadcrumbs from "./_components/RoutePathBreadcrumbs";
import { api, HydrateClient } from "~/trpc/server";
import CategoriesSidebar from "./_components/CategoriesSidebar";
import CategoriesBottombar from "./_components/CategoriesBottombar";
import Products from "./_components/Products";

async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const searchParamsData = await searchParams;
  const filter = [
    searchParamsData.category && {
      id: "categoryName" as const,
      value: [decodeURIComponent(searchParamsData.category)],
    },
    searchParamsData.q && {
      id: "name" as const,
      value: decodeURIComponent(searchParamsData.q),
    },
  ].filter((filter) => !!filter);

  void api.categories.getAll.prefetch({ sortByName: true });
  void api.products.getProducts.prefetch({
    limit: 20,
    offset: 0,
    filter: filter,
  });

  return (
    <HydrateClient>
      <main className="flex flex-col justify-center gap-10 px-10 py-5">
        <div className="flex flex-col items-center justify-around gap-10 bg-[#F2F2F7] p-5 font-bold md:flex-row">
          <div className="flex flex-col gap-2">
            <span className="text-7xl text-blue-950">Electric Supply</span>
            <p className="text-lg font-light">
              Find all items you need here. Commercial, industrial materials and
              residential.
            </p>
          </div>
          <Image
            src={"/shop.svg"}
            alt="Shop"
            priority
            width={500}
            height={500}
          />
        </div>
        <Suspense fallback={<></>}>
          <RoutePathBreadcrumbs />
        </Suspense>
        <div className="flex flex-col lg:flex-row lg:gap-5">
          <div className="rounded-md bg-secondary lg:invisible lg:hidden">
            <CategoriesBottombar />
          </div>
          <CategoriesSidebar />
          <Products />
        </div>
        {/* <pre> {JSON.stringify(products.data, null, 4)}</pre> */}
      </main>
    </HydrateClient>
  );
}

export default Shop;
