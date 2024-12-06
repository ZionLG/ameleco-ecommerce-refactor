import type { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDown,
  EyeOff,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";

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
  const { i18n, t } = useTranslation();
  if (!column.getCanSort()) {
    return (
      <div
        dir={i18n.language !== "en" ? "rtl" : "ltr"}
        className={cn("flex items-center", className)}
      >
        {t(title)}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center  space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            dir={i18n.language !== "en" ? "rtl" : "ltr"}
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span> {t(title)}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="h-4 w-4 ltr:ml-2 rtl:mr-2" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="h-4 w-4 ltr:ml-2 rtl:mr-2" />
            ) : (
              <ChevronsUpDown className="h-4 w-4 ltr:ml-2 rtl:mr-2" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="h-3.5 w-3.5 text-muted-foreground/70 ltr:mr-2 rtl:ml-2" />
            {t("sort.asc")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="h-3.5 w-3.5 text-muted-foreground/70 ltr:mr-2 rtl:ml-2" />
            {t("sort.desc")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70 ltr:mr-2 rtl:ml-2" />
            {t("sort.hide")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
