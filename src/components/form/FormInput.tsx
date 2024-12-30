"use client";

import React, { type ReactNode } from "react";
import type {
  Control,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Checkbox } from "~/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";

type ExtendedInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  type?:
    | React.InputHTMLAttributes<HTMLInputElement>["type"]
    | "textarea"
    | "switch";
};

type FormInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  name: TName;
  control: Control<TFieldValues>;
} & Pick<ControllerProps<TFieldValues, TName>, "disabled" | "rules"> &
  ExtendedInputProps & {
    placeholder?: string;
    label?: ReactNode;
    showError?: boolean;
    required?: boolean;
    description?: string;
  };

type RenderInputElementParams<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  type: ExtendedInputProps["type"];
  field: ControllerRenderProps<TFieldValues, TName>;
  placeholder?: string;
  disabled?: boolean;
};

function getRenderInputElement<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  type,
  disabled,
  placeholder,
}: RenderInputElementParams<TFieldValues, TName>) {
  switch (type) {
    case "switch":
      return (
        <Switch
          disabled={disabled}
          checked={field.value}
          onCheckedChange={field.onChange}
          {...field}
        />
      );
    case "textarea":
      return (
        <Textarea
          placeholder={placeholder}
          disabled={disabled}
          className="resize-none"
          {...field}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          disabled={disabled}
          checked={field.value}
          onCheckedChange={field.onChange}
          {...field}
        />
      );
    default:
      return (
        <Input
          placeholder={placeholder}
          disabled={disabled}
          {...field}
          type={type}
          onChange={(e) => {
            field.onChange(
              type === "number" ? e.target.valueAsNumber : e.target.value,
            );
          }}
        />
      );
  }
}

function FormInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  placeholder,
  required,
  className,
  control,
  label,
  description,
  type,
  disabled,
  showError = true,
  rules,
}: FormInputProps<TFieldValues, TName>) {
  return (
    <FormField
      rules={rules}
      control={control}
      name={name}
      render={({ field }) => {
        const inputElement = getRenderInputElement({
          type,
          field,
          placeholder,
          disabled,
        });

        return (
          <FormItem
            className={cn(
              type === "switch" &&
                "flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm",
              type === "checkbox" &&
                "flex items-center gap-3 space-y-0 rounded-md border p-4",
              className,
            )}
          >
            {type === "checkbox" && <FormControl>{inputElement}</FormControl>}
            {label && (
              <FormLabel className="flex gap-1 leading-5">
                {typeof label === "string" ? <span>{label}</span> : label}
                {required && <span className="text-red-500">*</span>}
              </FormLabel>
            )}
            {type !== "checkbox" && <FormControl>{inputElement}</FormControl>}
            {description && <FormDescription>{description}</FormDescription>}
            {showError && <FormMessage />}
          </FormItem>
        );
      }}
    />
  );
}

export default FormInput;
