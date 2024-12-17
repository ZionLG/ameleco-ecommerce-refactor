"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  BreadcrumbItem,
  BreadcrumbSeparator,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbLink,
} from "~/components/ui/breadcrumb";

export default function RoutePathBreadcrumbs() {
  const searchParams = useSearchParams();

  const urlCategory = searchParams.get("category");
  const searchTerm = searchParams.get("q");

  return (
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
        {urlCategory && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={{
                    pathname: "/shop",
                    query: { category: encodeURIComponent(urlCategory) },
                  }}
                >
                  {decodeURIComponent(urlCategory)}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        {searchTerm && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={
                    urlCategory
                      ? `/shop?category=${urlCategory}?q=${searchTerm}`
                      : `/shop?q=${searchTerm}`
                  }
                >
                  {searchTerm}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
