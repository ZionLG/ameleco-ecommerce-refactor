"use client";
import { usePathname } from "next/navigation";
import React from "react";
import type { SidebarDashboardProps } from "./SidebarDashboard";

function CurrentItemSpan({ items }: SidebarDashboardProps) {
  const path = usePathname();
  return <span>{items.find((item) => item.href === path)?.title}</span>;
}

export default CurrentItemSpan;
