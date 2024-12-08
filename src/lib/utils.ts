import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { withFluid } from "@fluid-tailwind/tailwind-merge";
import type { SortingState } from "@tanstack/react-table";

export function cn(...inputs: ClassValue[]) {
  const twMerge = extendTailwindMerge(withFluid);
  return twMerge(clsx(inputs));
}

export function filterSortingState<const T extends readonly string[]>(
  sorting: SortingState,
  allowedIds: T,
): { desc: boolean; id: T[number] }[] {
  return sorting.filter((sort) => allowedIds.includes(sort.id));
}
