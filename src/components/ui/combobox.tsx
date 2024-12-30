"use client";

import React, { useCallback, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { FormControl } from "~/components/ui/form";

export type ComboBoxItemType = {
  value: string | number;
  label: string;
};

export type ComboboxProps = {
  value?: string;
  label?: string;
  onSelect: (value: string) => void;
  items: ComboBoxItemType[];
  searchPlaceholder?: string;
  noResultsMsg?: string;
  loadingMsg?: string;
  selectItemMsg?: string;
  className?: string;
  unselect?: boolean;
  unselectMsg?: string;
  onSearchChange?: (e: string) => void;
  isFormItem?: boolean;
  isLoading?: boolean;
  manualSearch?: boolean;
  disabled?: boolean;
};

const popOverStyles = {
  width: "var(--radix-popover-trigger-width)",
};

export function Combobox({
  value,
  label,
  onSelect,
  items,
  searchPlaceholder = "Search item...",
  noResultsMsg = "No items found",
  selectItemMsg = "Select an item",
  loadingMsg = "Loading...",
  className,
  unselect = false,
  unselectMsg = "None",
  manualSearch,
  onSearchChange,
  isFormItem,
  isLoading,
  disabled,
}: ComboboxProps) {
  const [open, setOpenState] = useState(false);

  const setOpen = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) onSearchChange?.("");
      setOpenState(isOpen);
    },
    [onSearchChange],
  );

  const handleSelect = useCallback(
    (value?: string) => {
      onSelect(value ?? "");
      setOpen(false);
    },
    [onSelect, setOpen],
  );

  const buttonElement = (
    <Button
      disabled={disabled}
      variant="outline"
      role="combobox"
      aria-expanded={open}
      className={cn("justify-between", className)}
    >
      {label ?? selectItemMsg}
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  );

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        {isFormItem ? (
          <FormControl>{buttonElement}</FormControl>
        ) : (
          buttonElement
        )}
      </PopoverTrigger>
      <PopoverContent style={popOverStyles} className="p-0">
        <Command shouldFilter={!manualSearch}>
          <CommandInput
            disabled={disabled}
            placeholder={searchPlaceholder}
            onValueChange={onSearchChange}
          />
          <CommandList>
            {!isLoading && <CommandEmpty>{noResultsMsg}</CommandEmpty>}
            {isLoading && <CommandLoading>{loadingMsg}</CommandLoading>}
            <CommandGroup>
              {unselect && (
                <CommandItem key="unselect" value="" onSelect={handleSelect}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === "" ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {unselectMsg}
                </CommandItem>
              )}
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value.toString()}
                  keywords={[item.label]}
                  onSelect={handleSelect}
                  disabled={value === item.value}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value == item.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
