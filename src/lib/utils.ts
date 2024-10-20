import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    year: "numeric",
    month: "long",
  }).format(date);
};
