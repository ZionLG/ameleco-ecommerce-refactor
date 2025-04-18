"use client";

import type { Table } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { X } from "lucide-react";
import { type getCategorySchema } from "./schema";
import { type ChangeEvent, useCallback } from "react";
import Loader from "~/components/Loader";

export interface DataTableToolbarProps {
  table: Table<getCategorySchema>;
  isLoading: boolean;
}

export function DataTableToolbar({ table, isLoading }: DataTableToolbarProps) {
  const { resetColumnFilters, getColumn } = table;

  const handleFilterReset = useCallback(() => {
    resetColumnFilters();
  }, [resetColumnFilters]);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      getColumn("name")?.setFilterValue(event.target.value);
    },
    [getColumn],
  );

  const isFiltered = table.getState().columnFilters?.length > 0;

  return (
    <div className="flex flex-row items-center justify-between gap-5">
      <div className="flex w-full flex-1 flex-row gap-2 lg:items-center">
        <div className="flex grow flex-col gap-2 lg:grow-0">
          <Input
            placeholder="Category name"
            value={(getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={handleOnChange}
            className="h-8 w-full lg:w-[175px]"
          />
        </div>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleFilterReset}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {isLoading && <Loader />}
    </div>
  );
}
