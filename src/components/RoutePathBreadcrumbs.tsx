import React from "react";
import Link from "next/link";
import {
  BreadcrumbItem,
  BreadcrumbSeparator,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbLink,
} from "~/components/ui/breadcrumb";

export default function RoutePathBreadcrumbs({
  category,
  subCategory,
  subSubCategory,
  productName,
}: {
  category?: string;
  subCategory?: string;
  subSubCategory?: string;
  productName?: string;
}) {
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
        {category && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={{
                    pathname: "/shop",
                    query: { category: encodeURIComponent(category) },
                  }}
                >
                  {category}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {subCategory && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={{
                        pathname: "/shop",
                        query: { category: encodeURIComponent(category) },
                      }}
                    >
                      {subCategory}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {subSubCategory && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link
                          href={{
                            pathname: "/shop",
                            query: { category: encodeURIComponent(category) },
                          }}
                        >
                          {subSubCategory}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
              </>
            )}
          </>
        )}
        {productName && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${encodeURIComponent(productName)}`}>
                  {productName}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
