"use client";

import React, { useEffect, useState, type ReactNode } from "react";
import {
  useController,
  type Control,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { cn } from "~/lib/utils";
import { Combobox, type ComboboxProps } from "~/components/ui/combobox";

type FormComboboxProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  name: TName;
  control: Control<TFieldValues>;
} & Pick<ControllerProps<TFieldValues, TName>, "disabled" | "rules"> &
  Omit<ComboboxProps, "onSelect" | "isFormItem" | "value" | "label"> & {
    formLabel?: ReactNode;
    showError?: boolean;
    required?: boolean;
    description?: string;
  };

function FormCombobox<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  required,
  className,
  control,
  formLabel,
  description,
  disabled,
  showError = true,
  rules,
  isLoading,
  items,
  loadingMsg,
  manualSearch,
  searchPlaceholder,
  noResultsMsg,
  onSearchChange,
  selectItemMsg,
  unselect,
  unselectMsg,
}: FormComboboxProps<TFieldValues, TName>) {
  const {
    field: { value: selectedValue },
  } = useController({ name, control });
console.log("selectedValue",selectedValue, typeof selectedValue)
  const [selectedLabel, setSelectedLabel] = useState<string>();

  useEffect(() => {
    const currentItem = items.find((item) => item.value == selectedValue);
    if (currentItem || !selectedValue) {
      setSelectedLabel(currentItem?.label);
    }
  }, [items, selectedValue]);

  return (
    <FormField
      rules={rules}
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {formLabel && (
              <FormLabel className="flex gap-1 leading-5">
                {typeof formLabel === "string" ? (
                  <span>{formLabel}</span>
                ) : (
                  formLabel
                )}
                {required && <span className="text-red-500">*</span>}
              </FormLabel>
            )}
            <Combobox
              value={field.value}
              label={selectedLabel}
              items={items}
              className={cn(className)}
              isFormItem
              onSelect={field.onChange}
              disabled={disabled}
              isLoading={isLoading}
              loadingMsg={loadingMsg}
              manualSearch={manualSearch}
              searchPlaceholder={searchPlaceholder}
              noResultsMsg={noResultsMsg}
              onSearchChange={onSearchChange}
              selectItemMsg={selectItemMsg}
              unselect={unselect}
              unselectMsg={unselectMsg}
            />
            {description && <FormDescription>{description}</FormDescription>}
            {showError && <FormMessage />}
          </FormItem>
        );
      }}
    />
  );
}

export default FormCombobox;
