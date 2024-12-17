"use client";
import { Dot } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/Separator";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";
import Image from "next/image";

function Product() {
  const { id } = useParams();
  const queryId = typeof id === "string" ? id : null;
  const { data } = api.products.getProduct.useQuery(
    Number.parseInt(queryId ?? "0"),
    { enabled: queryId != null },
  );

  if (data) {
    const { name, price, stock, id, description, categories } = data;
    return (
      <main className="flex flex-col justify-center gap-10 bg-secondary px-10 py-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/shop">Shop</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/shop/${encodeURIComponent(id)}`}>{name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="invisible hidden justify-center gap-10 md:visible md:flex">
          <div className="grid max-w-2xl grid-rows-2 gap-10">
            <div className="rounded-sm bg-background p-10 shadow-md">
              <Image
                width={500}
                height={500}
                alt={name}
                src={"https://placehold.co/500.png"}
              />
            </div>
            <div className="flex flex-col gap-5 rounded-sm bg-background p-10 shadow-md">
              <span className="text-xl font-semibold">Description</span>
              <span className="text-2xl font-bold">{name}</span>
              <p>{description}</p>
            </div>
          </div>
          <div className="3xl:top-64 top-60 flex h-fit flex-col gap-10 rounded-sm bg-background px-10 py-5 shadow-md md:sticky lg:top-52">
            <span className="text-2xl font-bold">{name}</span>
            <span className="text-sm">{categories.name}</span>
            <Separator className="my-2" />
            <span className="flex min-w-fit items-center gap-2">
              Price: ${price}
            </span>
            <div className="flex whitespace-nowrap">
              Stock:{" "}
              <span
                className={`flex items-center font-bold ${
                  stock > 0 ? "text-green-600" : "text-gray-500"
                }`}
              >
                <Dot />
                {stock > 0 ? (
                  <span>In stock ({stock} units)</span>
                ) : (
                  <span>Sold out</span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <span>Quantity: </span>
              {/* <Quantity
                stock={productData.stock}
                setQuantity={setQuantity}
                quantity={quantity}
                updateData={false}
                startQuantity={undefined}
                itemId={undefined}
              /> */}
            </div>
            <Button>
              {/* {isLoading && (
                <Spinner color="secondary" className="mr-2" size="sm" />
              )} */}
              Add To Cart
            </Button>
          </div>
        </div>

        {/* Small screen */}
        <div className="visible justify-center gap-10 md:invisible md:hidden">
          <div className="grid max-w-2xl grid-rows-2 gap-10">
            <div className="flex flex-col gap-10 rounded-sm bg-background p-10 shadow-md">
              <Image
                width={500}
                height={500}
                alt={name}
                src={"https://placehold.co/500.png"}
              />
              <span className="text-2xl font-bold">{name}</span>
              <span className="text-sm">{categories.name}</span>
              <Separator className="my-2" />
              <span className="flex min-w-fit items-center gap-2">
                Price: ${price}
              </span>
              <div className="flex whitespace-nowrap">
                Stock:{" "}
                <span
                  className={`flex items-center font-bold ${
                    stock > 0 ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  <Dot />
                  {stock > 0 ? (
                    <span>In stock ({stock} units)</span>
                  ) : (
                    <span>Sold out</span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-5">
                <span>Quantity: </span>
                {/* <Quantity
                  stock={productData.stock}
                  setQuantity={setQuantity}
                  quantity={quantity}
                  updateData={false}
                  startQuantity={undefined}
                  itemId={undefined}
                /> */}
              </div>
              <Button>
                {/* {isLoading && (
                  <Spinner color="secondary" className="mr-2" size="sm" />
                )} */}
                Add To Cart
              </Button>
            </div>
            <div className="flex flex-col gap-5 rounded-sm bg-background p-10 shadow-md">
              <span className="text-xl font-semibold">Description</span>
              <span className="text-2xl font-bold">{name}</span>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="flex flex-col justify-center gap-10 bg-secondary px-10 py-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/shop">Shop</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="invisible hidden justify-center gap-10 md:visible md:flex">
        <div className="grid max-w-2xl grid-rows-2 gap-10">
          <Skeleton className="bg-default-300 rounded-sm shadow-md" />

          <div className="flex flex-col gap-5 rounded-sm bg-background p-10 shadow-md">
            <Skeleton className="h-8 w-36 rounded-sm" />
            <Skeleton className="h-10 w-80 rounded-sm" />
            <Skeleton className="h-6 w-full rounded-sm" />
            <Skeleton className="h-6 w-full rounded-sm" />
            <Skeleton className="h-6 w-full rounded-sm" />
          </div>
        </div>
        <div className="3xl:top-64 top-60 flex h-fit w-96 flex-col gap-10 rounded-sm bg-background px-10 py-5 shadow-md md:sticky lg:top-52">
          <Skeleton className="h-10 grow rounded-sm" />
          <Skeleton className="h-6 w-32 rounded-sm" />
          <Separator className="my-2" />
          <span className="flex min-w-fit items-center gap-2">
            <Skeleton className="h-6 w-16 rounded-sm" />
            <Skeleton className="h-10 w-12 rounded-sm" />
          </span>
          <Skeleton className="h-7 w-48 rounded-sm" />

          <Skeleton className="h-10 w-full rounded-sm" />
        </div>
      </div>
      {/* Small screen */}
      <div className="visible justify-center gap-10 md:invisible md:hidden">
        <div className="grid max-w-2xl grid-rows-2 gap-10">
          <div className="flex flex-col gap-10 rounded-sm bg-background p-10 shadow-md">
            <Skeleton className="bg-default-300 h-64 rounded-sm shadow-md" />

            <Skeleton className="h-10 grow rounded-sm" />
            <Skeleton className="h-6 w-32 rounded-sm" />
            <Separator className="my-2" />
            <span className="flex min-w-fit items-center gap-2">
              <Skeleton className="h-6 w-16 rounded-sm" />
              <Skeleton className="h-10 w-12 rounded-sm" />
            </span>
            <Skeleton className="h-7 w-48 rounded-sm" />

            <Skeleton className="h-10 w-full rounded-sm" />
          </div>
          <div className="flex flex-col gap-5 rounded-sm bg-background p-10 shadow-md">
            <Skeleton className="h-8 w-36 rounded-sm" />
            <Skeleton className="h-10 w-80 rounded-sm" />
            <Skeleton className="h-6 w-full rounded-sm" />
            <Skeleton className="h-6 w-full rounded-sm" />
            <Skeleton className="h-6 w-full rounded-sm" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Product;
