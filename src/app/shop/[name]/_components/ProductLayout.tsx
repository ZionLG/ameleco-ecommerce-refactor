import React, { type ReactNode, type ComponentPropsWithoutRef } from "react";
import RoutePathBreadcrumbs from "~/components/RoutePathBreadcrumbs";

function ProductWrapper({
  breadcrumbsProps,
  children,
}: {
  breadcrumbsProps?: ComponentPropsWithoutRef<typeof RoutePathBreadcrumbs>;
  children: ReactNode;
}) {
  return (
    <main className="flex flex-col justify-center gap-10 bg-secondary px-10 py-5">
      <RoutePathBreadcrumbs {...breadcrumbsProps} />
      <div className="justify-center gap-10 md:flex">
        {children}
      </div>
    </main>
  );
}

interface SectionProps {
  children?: ReactNode;
}

function ProductMain({ children }: SectionProps) {
  return <div className="md:grid md:visible max-w-2xl grid-rows-2 gap-10 invisible hidden">{children}</div>;
}

function StickyProduct({ children }: SectionProps) {
  return (
    <div className="top-60 md:flex md:visible h-fit w-96 flex-col gap-10 rounded-sm bg-background px-10 py-5 shadow-md md:sticky lg:top-52 2xl:top-64 invisible hidden">
      {children}
    </div>
  );
}

function MobileProductWrapper({ children }: SectionProps) {
  return (
    <div className="grid max-w-2xl grid-rows-2 gap-10 md:invisible md:hidden">
      {children}
    </div>
  );
}


function MobileProductSection({ section, children }: SectionProps & { section: "upper" | "lower" }) {
  return (
    <div className={`flex flex-col ${section === "upper" ? "gap-10" : "gap-5"} rounded-sm bg-background p-10 shadow-md`}>
      {children}
    </div>
  );
}

export { ProductMain, StickyProduct, ProductWrapper, MobileProductWrapper, MobileProductSection};
