import { cn, formatCurrency, formatpercentage } from '@/lib/utils';
import React from 'react'
import { VariantProps, cva } from 'class-variance-authority';
import { IconType } from 'react-icons/lib';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { CountUp } from './count-up';


interface dataCardProps extends BoxVariants, IconVariants {
    title: string;
    value?: number;
    percentageChange?: number;
    icon: IconType;
    dateRange: string;
}

const boxVariant = cva("rounded-md p-3",
    {
        variants: {
            variant: {
                default: "bg-blue-500/20",
                success: "bg-emerland-500/20",
                danger: "bg-rose-500/20",
                warning: "bg-yellow-500/20",
            }
        },
        defaultVariants: {
            variant: "default"
        },
    },
)

const iconVariant = cva("size-6",
    {
        variants: {
            variant: {
                default: "fill-blue-500",
                success: "fill-emerland-500",
                danger: "fill-rose-500",
                warning: "fill-yellow-500",
            }
        },
        defaultVariants: {
            variant: "default"
        },
    },
)

type BoxVariants = VariantProps<typeof boxVariant>
type IconVariants = VariantProps<typeof iconVariant>


const DataCard = ({ title, value = 0, percentageChange = 0, icon: Icon, variant, dateRange }: dataCardProps) => {
    return (
        <Card className='border-none drop-shadow-sm'>
            <CardHeader className='flex flex-row items-center justify-between gap-x-4'>
                <div className='space-y-2'>
                    <CardTitle className='text-2xl line-clamp-1'>
                        {title}
                    </CardTitle>
                    <CardDescription className='line-clamp-1'>
                        {dateRange}
                    </CardDescription>

                </div>
                <div className={cn("shrink-0",
                    boxVariant({ variant })
                )}>
                    <Icon className={cn(iconVariant({ variant }))} />

                </div>
            </CardHeader>
            <CardContent>
                <h1 className='font-bold text-2xl mb-2 line-clamp-1 break-all'>
                    <CountUp
                        preserveValue
                        start={0}
                        end={(value)}
                        decimalPlaces={2}
                        formattingFn={formatCurrency} />
                </h1>

                <p className={cn(
                    "text-muted-foreground text-sm line-clamp-1",
                    percentageChange > 0 && "text-emerald-500",
                    percentageChange < 0 && "text-rose-500"
                )}>
                    {formatpercentage(percentageChange)} from last period
                </p>

            </CardContent>
        </Card>
    )
}

export default DataCard