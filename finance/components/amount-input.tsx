import { cn } from '@/lib/utils'
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Info, MinusCircle, PlusCircle } from 'lucide-react'
import CurrencyInput from 'react-currency-input-field'

type Props = {
    value: string;
    onChange: (value: string | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
}


const AmountInput = ({ value, onChange, placeholder, disabled }: Props) => {
    const parseValue = parseFloat(value)
    const isExpense = parseValue < 0;
    const isIncome = parseValue > 0;

    const onReverseValue = () => {
        if (!value) return;
        const newvalue = parseFloat(value) * -1;
        onChange(newvalue.toString());

    }



    return (
        <div className='relative'>
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <button type='button' onClick={onReverseValue}
                            className={cn(
                                "bg-slate-400 hover:bg-slate-500 absolute top-1.5 left-1.5 rounded-md p-2 flex items-center justify-center transition",
                                isIncome && "bg-emerald-500 hover:bg-emerald-600",
                                isExpense && "bg-rose-500 hover:bg-red-600"

                            )}>
                            {!parseValue && <Info className='size-3 text-white ' />}
                            {isIncome && <PlusCircle className='size-3 text-white ' />}
                            {isExpense && <MinusCircle className='size-3 text-white ' />}
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Use [+] for Income and [-] for Expense
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <CurrencyInput
                prefix='₹'
                className='pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

                placeholder={placeholder}
                value={value}
                decimalScale={2}
                decimalsLimit={2}
                onValueChange={onChange}
                disabled={disabled}
            />
            <p className='text-xs text-muted-foreground mt-2'>
                {isIncome && "You are adding this for income"}
                {isExpense && "You are adding this for Expense"}

            </p>

        </div>
    )
}

export default AmountInput