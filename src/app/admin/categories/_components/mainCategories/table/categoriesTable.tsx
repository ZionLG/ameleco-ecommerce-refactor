"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  type ColumnFiltersState,
  type SortingState,
  type PaginationState,
} from "@tanstack/react-table";
import { DataTable } from "~/components/generic-table/data-table";
import { useTRPC } from "~/trpc/react";
import { columns } from "./columns";
import { DataTableToolbar } from "./data-table-toolbar";
import CategoryCreation from "../CategoryCreation";
import { DataTableMultiRowsActions } from "./data-table-multi-row-actions";

function CategoriesTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const { pageIndex, pageSize } = pagination;
  const trpc = useTRPC();

  const { data, isPending } = useQuery(
    trpc.categories.getCategories.queryOptions(
      {
        limit: pageSize,
        offset: pageSize * pageIndex,
      },
      { placeholderData: (previous) => previous, refetchOnWindowFocus: false },
    ),
  );

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  console.log(sorting);

  return (
    <DataTable
      FooterCell={<CategoryCreation />}
      Toolbar={DataTableToolbar}
      MultiActions={DataTableMultiRowsActions}
      data={{
        isLoading: isPending,
        rows: data,
        initialVisibility: {
          id: false,
        },
        pagination,
        setPagination,
        columnFilters,
        setColumnFilters,
        sorting,
        setSorting,
      }}
      columns={columns}
    />
  );
}

export default CategoriesTable;
