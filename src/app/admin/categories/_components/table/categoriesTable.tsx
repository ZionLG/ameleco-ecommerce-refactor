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

function CategoriesTable() {
  const { data, isFetching } = api.categories.getAll.useQuery(undefined, {
    placeholderData: (previous) => previous,
    refetchOnWindowFocus: false,
  });

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  return (
    <DataTable
      FooterCell={<CategoryCreation />}
      Toolbar={DataTableToolbar}
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
