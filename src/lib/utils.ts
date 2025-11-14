import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats currency value in lakhs or crores
 * @param value - Value in lakhs
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted string: ₹X.XL if < 100L, ₹X.XCr if >= 100L
 */
export function formatCurrency(value: number, decimals: number = 1): string {
  if (value >= 100) {
    const crores = value / 100;
    return `₹${crores.toFixed(decimals)}Cr`;
  }
  return `₹${value.toFixed(decimals)}L`;
}
