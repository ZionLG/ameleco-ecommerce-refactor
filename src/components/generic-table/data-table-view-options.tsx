import type { Table } from "@tanstack/react-table";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Settings2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../dropdown-menu";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

const GetColumnTranslationKey = ({ columnId }: { columnId: string }) => {
  const { t } = useTranslation();

  switch (columnId) {
    case "createdAt":
      return t("created-at");
    case "firstName":
      return t("register.first-name");
    case "lastName":
      return t("register.last-name");
    case "email":
      return t("login.email");
    case "userType":
      return t("employee.employee-type");
    case "InstallationSchedule":
      return t("employee.does-have-schedule");
    case "status":
      return t("order.status");
    case "customerName":
      return t("customer.name");
    case "productItems":
    case "productItemsStaff":
      return t("product.products");
    case "notes":
      return t("order.notes");
    case "contactCity":
      return t("contact.city");
    case "contactAddress":
      return t("contact.address");
    case "contactName":
      return t("contact.contact-name");
    case "contactEmail":
      return t("contact.email");
    case "contactPhone":
      return t("contact.phone");
    case "contactLocation":
      return t("contact.location-name");
    case "employees":
      return t("employee.employees");
    case "plannedDate":
      return t("schedule.planned-date");
    case "internalId":
      return t("customer.internal-id");
    case "size":
      return t("product.size");
    case "productType":
      return t("product.product-type");
    case "solidColor":
      return t("product.color");
    case "solidOption":
      return t("product.solid-type");
    case "model":
      return t("product.model");
    case "manufacturer":
      return t("product.manufacturer");
    case "customerType":
      return t("customer.customer-type");
    case "mainContact":
      return t("customer.contact");
    case "contacts":
      return t("customer.branches");
    case "frontTireSize":
      return t("operational-tool.front-tire-size");
    case "backTireSize":
      return t("operational-tool.back-tire-size");
    case "operationalToolType":
      return t("operational-tool.vehicle-type");
    case "description":
      return t("events.description");
    case "employee":
      return t("events.employee");
    default:
      return columnId.split(/(?=[A-Z])/).join(" ");
  }
};

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const { t, i18n } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`ml-auto flex h-8 ${i18n.language == "en" ? "flex-row" : "flex-row-reverse"} gap-2`}
        >
          <Settings2 className=" h-4 w-4" />
          {t("view")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        <DropdownMenuLabel>{t("toggle-columns")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide(),
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                <GetColumnTranslationKey columnId={column.id} />
              </DropdownMenuCheckboxItem>
            );
          })
          .reverse()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
