import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertamount(amount: number) {
  return Math.round(amount * 1000)
};

export function convertamountFromMiliUnits(amount: number) {
  return amount / 1000;
};

export function formatCurrency(value: number) {
  const finalvalue=convertamountFromMiliUnits(value)
  return Intl.NumberFormat("en-US",{
    style:"currency",
    currency:"INR",
    minimumFractionDigits:2,
    
  }).format(finalvalue)
}