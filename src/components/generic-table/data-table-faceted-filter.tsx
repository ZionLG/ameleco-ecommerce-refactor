import type { Column } from "@tanstack/react-table";
import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, PlusCircleIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge } from "../badge";
import { Button } from "../button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Separator } from "../separator";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  isSingleSelect?: boolean;
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  isSingleSelect,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);
  const { t, i18n } = useTranslation();
  return (
    <Popover>
      <PopoverTrigger asChild dir={i18n.language !== "en" ? "rtl" : "ltr"}>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed "
          dir={i18n.language !== "en" ? "rtl" : "ltr"}
        >
          <PlusCircleIcon className="h-4 w-4 ltr:mr-2 rtl:ml-2 " />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden gap-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} {t("faceted-filter.selected")}
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-0"
        align="start"
        dir={i18n.language !== "en" ? "rtl" : "ltr"}
      >
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>{t("no-results")}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        if (isSingleSelect) {
                          selectedValues.clear();
                        }

                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined,
                      );
                    }}
                  >
                    <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-sm border border-primary ltr:mr-2 rtl:ml-2 ",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <CheckCircle2 className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && (
                      <option.icon className="h-4 w-4 text-muted-foreground ltr:mr-2 rtl:ml-2" />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    {t("faceted-filter.clear")}
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
