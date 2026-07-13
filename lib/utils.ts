import { clsx, type ClassValue } from "clsx";

/** Tiny classnames helper. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
