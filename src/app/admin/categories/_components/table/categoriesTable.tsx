"use client";

import React, { useState } from "react";
import {
  type ColumnFiltersState,
  type SortingState,
  type PaginationState,
} from "@tanstack/react-table";
import { DataTable } from "~/components/generic-table/data-table";
import { api } from "~/trpc/react";
import { columns } from "./columns";
import { DataTableToolbar } from "./data-table-toolbar";
import CategoryCreation from "../CategoryCreation";
import { DataTableMultiRowsActions } from "./data-table-multi-row-actions";
import { useSearchParams } from "next/navigation";

function CategoriesTable() {
  const searchParams = useSearchParams();

  const pageSize = parseInt(searchParams.get("pageSize") ?? "5");
  const pageIndex = parseInt(searchParams.get("pageIndex") ?? "1");

  const { data, isFetching } = api.categories.getCategories.useQuery(
    {
      limit: pageSize,
      offset: pageSize * (pageIndex - 1),
    },
    {
      placeholderData: (previous) => previous,
      refetchOnWindowFocus: false,
    },
  );
  
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: pageIndex - 1,
    pageSize,
  });
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
        isLoading: isFetching,
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
