import React from "react";
import Link from "next/link";

import { cn } from "~/lib/utils";
import { BranchesView } from "~/app/_components/AboutUs/Branches/BranchView";
//import ProductSearch from "./ProductSearch";
import Sidebar from "./Sidebar";
import { buttonVariants } from "./ui/button";
import { PrettySeparator } from "./ui/PrettySeparator";
import { TextEffect } from "./core/text-effect";
import ProductSearch from "./ui/ProductSearch";

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "Shop", href: "/shop" },
  { text: "Projects", href: "/projects" },
  { text: "Career", href: "/career" },
  { text: "Contact Us", href: "/contact-us" },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 flex flex-col gap-3 bg-background px-5 pt-5">
      <div className="2xl:grid 2xl:grid-cols-2">
        <div className="flex items-center justify-center gap-5">
          <TextEffect
            per="char"
            as="span"
            className="text-5xl font-bold uppercase italic text-[#0070C0] lg:text-7xl"
            preset="slide"
          >
            AMELECO
          </TextEffect>
          <div className="invisible hidden max-w-lg grow lg:visible lg:inline-block">
            <ProductSearch categories={[]} products={[]} />
          </div>

          <div className="flex items-center justify-end gap-10 md:hidden">
            <div className="flex gap-2">
              {/* <DynamicHeaderAuth />
            {user && <DynamicHeaderCart />} */}
            </div>
            <Sidebar MENU_LIST={MENU_LIST} />
          </div>
        </div>
        <div className="invisible 2xl:visible hidden 2xl:inline-block" >
          <BranchesView />
        </div>
      </div>
      <div className="inline-block grow lg:invisible lg:hidden">
        <ProductSearch categories={[]} products={[]} />
      </div>
      <nav className="container invisible hidden items-center gap-3 md:visible md:flex">
        <div className="flex grow justify-center gap-3">
          {MENU_LIST.map((item) => (
            <Link
              key={item.text}
              href={item.href}
              className={`${cn(
                buttonVariants({ variant: "link" }),
              )} w-24 bg-secondary font-semibold lg:w-36`}
            >
              {item.text}
            </Link>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          {/* <DynamicHeaderAuth />
          {user && <DynamicHeaderCart />} */}
        </div>
      </nav>
      <PrettySeparator gradient />
    </header>
  );
}

export default Header;
