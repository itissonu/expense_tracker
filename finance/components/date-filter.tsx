"use client"
import React, { useState } from 'react'
import qs from "query-string"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { format, subDays } from 'date-fns'
import { isDateRange, DateRange } from 'react-day-picker'
import { cn, formatDaterange } from '@/lib/utils'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from './ui/popover'
import { ChevronDown } from 'lucide-react'

const DateFilter = () => {
    const router = useRouter();
    const pathname = usePathname();



    const params = useSearchParams();
    const accountId = params.get("accountId") ;
    const from = params.get("from") || "";
    const to = params.get("to") || "";

    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const paramsState = {
        from: from ? new Date(from) : defaultFrom,
        to: to ? new Date(to) : defaultTo
    }
    const [date, setDate] = useState<DateRange | undefined>()
    const pushToUrl = (dateRange: DateRange | undefined) => {
        const query = {
            from: format(dateRange?.from || defaultFrom, "yyyy-MM-dd"),
            to: format(dateRange?.to || defaultTo, "yyyy-MM-dd")

        }
        const url = qs.stringifyUrl({
            url: pathname,
            query,
        }, { skipNull: true, skipEmptyString: true });
        router.push(url)
    }

    const onReset = () => {
        setDate(undefined);
        pushToUrl(undefined);
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={false}
                    size="sm"



                    className='lg:w-auto h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none outline-none text-white focus:bg-white/30 focus:ring-transparent'
                >
                    <span>{formatDaterange(paramsState)}</span>
                    <ChevronDown className='ml-2 size-4 opacity-50' />

                </Button>
            </PopoverTrigger>
            <PopoverContent
                className='lg:w-auto w-full p-0'
                align='start'>
                <Calendar
                    disabled={false}
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}

                />
                <div className='flex w-full items-center p-4'>
                    <PopoverClose asChild>
                        <Button
                            onClick={onReset}
                            disabled={!date?.from || !date?.to}
                            variant="outline"
                        >
                            Reset
                        </Button>
                    </PopoverClose>
                    <PopoverClose asChild>
                        <Button
                            onClick={()=>pushToUrl(date)}
                            disabled={!date?.from || !date?.to}
                            variant="outline"
                        >
                           Apply
                        </Button>
                    </PopoverClose>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default DateFilter