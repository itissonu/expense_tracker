import { type ClassValue, clsx } from "clsx"
import { eachDayOfInterval, isSameDay } from "date-fns";
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

  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,

  }).format(value)
}

export function calculatepercentage(
  current: number,
  previous: number
) {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }
  return (((current - previous) / previous) * 100).toFixed(2);
};

export function fillMissingdays(activeDays: {
  date: Date,
  income: number,
  expense: number
}[],
  startDate: Date,
  endDate: Date,
) {
  if (activeDays.length === 0) {
    return [];
  }
  const alldays = eachDayOfInterval({
    start: startDate,
    end: endDate
  });
  const transactionByDay = alldays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day));

    if (found) {
      return found;
    }
    else {
      return {
        date: day,
        income: 0,
        expense: 0,
      }
    }

  })
  return transactionByDay


}