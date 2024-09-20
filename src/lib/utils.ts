import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { withFluid } from "@fluid-tailwind/tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  const twMerge = extendTailwindMerge(withFluid);
  return twMerge(clsx(inputs));
}
