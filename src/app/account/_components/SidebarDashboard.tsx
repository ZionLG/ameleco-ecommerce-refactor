import React from "react";
import Link from "next/link";
import { ChevronDown, Dot } from "lucide-react";

import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import CurrentItemSpan from "./CurrentItemSpan";

export type SidebarDashboardProps = {
  items: {
    href: string;
    title: string;
  }[];
};

function SidebarDashboard({ items }: SidebarDashboardProps) {
  return (
    <>
      <div className="invisible hidden h-fit w-64 flex-col items-start rounded-lg bg-background py-5 shadow-lg lg:visible lg:flex">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              buttonVariants({
                variant: "link",
                className: "font-semibold",
              }),
            )}
          >
            <Dot />
            {item.title}
          </Link>
        ))}
      </div>
      <div className="visible rounded-lg bg-background shadow-lg lg:invisible lg:hidden">
        <Sheet>
          <SheetTrigger className="flex w-full items-center justify-between p-5">
            <CurrentItemSpan items={items} />
            <ChevronDown className="h-5 w-5 shrink-0" />
          </SheetTrigger>
          <SheetContent side={"bottom"}>
            <SheetHeader>
              <SheetTitle>My Account</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col">
              {items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    buttonVariants({
                      variant: "link",
                      className: "font-semibold",
                    }),
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export default SidebarDashboard;
