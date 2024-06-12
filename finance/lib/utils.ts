import { type ClassValue, clsx } from "clsx"
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
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
  return (((current - previous) / previous) * 100);
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
type Period = {
  from: string | Date | undefined;
  to: string | Date | undefined

}

export function formatDaterange(period?: Period) {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);


  if (!period?.from) {
    return `${format(defaultFrom, "LLL dd")} - ${format(defaultTo, "LLL dd ,y")}
   `
  };
  if (period?.to) {
    return `${format(period.from, "LLL dd")} - ${format(period.to, "LLL dd y")}
   `
  };
  return format(period.from, "LLL dd,y")


}

export function formatpercentage(
  value: number,


) {

  const result = new Intl.NumberFormat("en-US",
    {
      style: "percent",
    }).format(value / 100);
  if ( value > 0) {
    return `+${result}`
  }

  return result;

}