import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar as CalenderIcon } from 'lucide-react'
import React from 'react'
import { SelectSingleEventHandler } from 'react-day-picker'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'


type Props = {
    value?: Date;
    onChange?: SelectSingleEventHandler;
    disabled?: boolean

}
const Datepicker = ({ value, onChange, disabled }: Props) => {

    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button disabled={disabled}
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground")}>
                        <CalenderIcon className="size-4 mr-2" />
                        {value ? format(value, "PPP") : <span>pick a date</span>}
                    </Button>

                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        mode='single'
                        selected={value}
                        onSelect={onChange}
                        disabled={disabled}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Datepicker