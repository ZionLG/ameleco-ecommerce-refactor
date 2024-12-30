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
import SubSubCategoryCreation from "../SubSubCategoryCreation";
import { DataTableMultiRowsActions } from "./data-table-multi-row-actions";

function CategoriesTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const { pageIndex, pageSize } = pagination;

  const { data, isPending } = api.subSubCategories.getSubSubCategories.useQuery(
    {
      limit: pageSize,
      offset: pageSize * pageIndex,
      includeCategory: true,
      includeSubCategory: true,
    },
    {
      placeholderData: (previous) => previous,
      refetchOnWindowFocus: false,
    },
  );

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  console.log(sorting);

  return (
    <DataTable
      FooterCell={<SubSubCategoryCreation />}
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
