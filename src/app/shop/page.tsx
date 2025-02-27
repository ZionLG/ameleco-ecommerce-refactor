import React from "react";
import Image from "next/image";
import { api, HydrateClient } from "~/trpc/server";
import CategoriesSidebar from "./_components/CategoriesSidebar";
import CategoriesBottombar from "./_components/CategoriesBottombar";
import Products from "./_components/Products";
import RoutePathBreadcrumbs from "~/components/RoutePathBreadcrumbs";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const session = await auth();

  if (session) {
    if (!(await api.user.getProfile())) {
      redirect("/new-user");
    }
  }

  const { category, q } = await searchParams;
  const decodedCategory = category && decodeURIComponent(category);

  const filter = [
    decodedCategory && {
      id: "categoryName" as const,
      value: [decodedCategory],
    },
    q && {
      id: "name" as const,
      value: decodeURIComponent(q),
    },
  ].filter((filter) => !!filter);

  void api.categories.getCategoriesCursor.prefetchInfinite({ limit: 10 });
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
        <RoutePathBreadcrumbs category={decodedCategory} />
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
