import React from "react";
import Image from "next/image";
import RoutePathBreadcrumbs from "./_components/RoutePathBreadcrumbs";

async function Shop() {
  // const products = api.shop.allProducts.useQuery(undefined, {
  //   refetchOnWindowFocus: false,
  // });
  // const user = useUser();
  // const categories = api.shop.getCategories.useQuery(undefined, {
  //   refetchOnWindowFocus: false,
  // });
  return (
    <main className="flex flex-col justify-center gap-10 px-10 py-5">
      <div className="flex flex-col items-center justify-around gap-10 bg-[#F2F2F7] p-5 font-bold md:flex-row">
        <div className="flex flex-col gap-2">
          <span className="text-7xl text-blue-950">Electric Supply</span>
          <p className="text-lg font-light">
            Find all items you need here. Commercial, industrial materials and
            residential.
          </p>
        </div>
        <Image src={"/shop.svg"} alt="Shop" priority width={500} height={500} />
      </div>
      <RoutePathBreadcrumbs/>
      <div className="flex flex-col lg:flex-row lg:gap-5">
        {/* <div className="rounded-md bg-secondary lg:invisible lg:hidden">
          <Sheet>
            <SheetTrigger className="flex w-full items-center justify-between p-5">
              <span className="text-xl font-bold text-primary">Categories</span>
              <ChevronDown className="h-5 w-5 shrink-0" />
            </SheetTrigger>
            <SheetContent side={"bottom"}>
              <SheetHeader>
                <SheetTitle>Categories</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-36 max-h-36 pr-3">
                <div className="flex flex-col">
                  {categories.data?.json.map((category) => (
                    <Link
                      href={
                        urlCategory === category.name
                          ? {
                              pathname: "/shop",
                            }
                          : {
                              pathname: "/shop",
                              query: {
                                category: encodeURIComponent(category.name),
                              },
                            }
                      }
                      key={category.id}
                      className={` ${cn(
                        buttonVariants({
                          variant: "link",
                          className:
                            urlCategory === category.name &&
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
        </div> */}
        <div className="text-md invisible hidden w-[18rem] flex-col rounded-md bg-secondary p-5 lg:visible lg:flex">
          <span className="text-xl font-bold text-primary">Categories</span>
          {/* {categories.data?.json.map((category) => (
            <Link
              href={
                urlCategory === category.name
                  ? {
                      pathname: "/shop",
                    }
                  : {
                      pathname: "/shop",
                      query: { category: encodeURIComponent(category.name) },
                    }
              }
              key={category.id}
              className={` ${cn(
                buttonVariants({
                  variant: "link",
                  className: `
                        self-start p-0
                    ${
                      urlCategory === category.name &&
                      " font-semibold text-blue-400"
                    }`,
                }),
              )} `}
            >
              {category.name}
            </Link>
          ))} */}
        </div>
        <div className="3xl:grid-cols-4 mt-10 grid h-fit grid-cols-1 justify-center gap-x-32 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          {/* {products.data?.json.map((product) => {
            if (
              (!urlCategory || product.category.name === urlCategory) &&
              (!searchTerm ||
                product.name
                  .toLowerCase()
                  .includes((searchTerm as string).toLowerCase()))
            ) {
              return <ProductCard product={product} key={product.id} />;
            }
          })} */}
        </div>
      </div>

      {/* <pre> {JSON.stringify(products.data, null, 4)}</pre> */}
    </main>
  );
}

export default Shop;
