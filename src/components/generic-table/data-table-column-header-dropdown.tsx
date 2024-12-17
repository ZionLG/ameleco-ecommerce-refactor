'use client';
import type { Column } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowDownIcon,
  ArrowUp,
  ArrowUpIcon,
  ChevronsUpDown,
  EyeOff,
} from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useCallback } from "react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const handleSortAsc = useCallback(
    () => column.toggleSorting(false),
    [column],
  );
  const handleSortDesc = useCallback(
    () => column.toggleSorting(true),
    [column],
  );
  const handleHideColumn = useCallback(
    () => column.toggleVisibility(false),
    [column],
  );

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          <span>{title}</span>
          {column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2" />
          ) : (
            <ChevronsUpDown className="ml-2" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={handleSortAsc}>
          <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSortDesc}>
          <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Desc
        </DropdownMenuItem>
        {column.getCanHide() && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleHideColumn}>
              <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Hide
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
