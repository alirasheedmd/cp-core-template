import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import prettyBytes from "pretty-bytes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToMb = (bytes: number) => {
  return prettyBytes(bytes, {
    bits: false,
    maximumFractionDigits: 1,
    space: false,
  });
};
