'use client';
import type { Column } from "@tanstack/react-table";
import {
  ArrowUpDown,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import { useCallback } from "react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const handleToggle = useCallback(
    () => column.toggleSorting(column.getIsSorted() === "asc"),
    [column],
  );
  
  return (
    <Button variant="ghost" onClick={handleToggle}>
      {title}
      <ArrowUpDown size={16}/>
    </Button>
  );
}
