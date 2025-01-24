"use client";
import React, { type ReactNode } from "react";
import type {
  Control,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type FormInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  name: TName;
  control: Control<TFieldValues>;
} & Pick<ControllerProps<TFieldValues, TName>, "disabled" | "rules"> & {
    placeholder?: string;
    label?: ReactNode;
    showError?: boolean;
    required?: boolean;
    description?: string;
    items: { value: string; label: string }[];
    className?: string;
  };

function FormSelect<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  items,
  name,
  placeholder,
  required,
  control,
  label,
  description,
  disabled,
  showError = true,
  rules,
  className,
}: FormInputProps<TFieldValues, TName>) {
  return (
    <FormField
      rules={rules}
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={className}>
            {label && (
              <FormLabel className="flex gap-1 leading-5">
                {typeof label === "string" ? <span>{label}</span> : label}
                {required && <span className="text-red-500">*</span>}
              </FormLabel>
            )}
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {items.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {description && <FormDescription>{description}</FormDescription>}
            {showError && <FormMessage />}
          </FormItem>
        );
      }}
    />
  );
}

export default FormSelect;
