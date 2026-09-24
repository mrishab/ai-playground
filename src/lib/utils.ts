import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(val: number, decimals = 2): string {
  if (Number.isInteger(val)) return val.toString();
  return val.toFixed(decimals);
}
