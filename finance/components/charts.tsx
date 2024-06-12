import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AreaChart, FileSearch, LineChart, LineChartIcon } from 'lucide-react';
import AreaVariant from './area-variant';
import BarVariant from './bar-variant';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import LineVariant from './line-chart';

type Props = {
    data?: {
        date: string;
        income: number;
        expense: number;
    }[];
}

const Charts = ({ data = [] }: Props) => {
    const [chartType, setChartType] = useState("area")
    const onTypeChange = (type: string) => {
        setChartType(type)
    }
    return (
        <Card className='border-none drop-shadow-sm'>
            <CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
                <CardTitle>
                    Transactions
                </CardTitle>
                <Select
                    defaultValue={chartType}
                    onValueChange={onTypeChange}
                >
                    <SelectTrigger className='lg:w-auto h-9 rounded-md px-3'>
                        <SelectValue placeholder="Chart Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="line">
                            <div className='flex items-center'>
                                <LineChartIcon className='size-4 mr-2 shrink-0' />
                                <p className='line-clamp-1'>
                                    Line Chart
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="area">
                            <div className='flex items-center'>
                                <AreaChart className='size-4 mr-2 shrink-0' />
                                <p className='line-clamp-1'>
                                    Area Chart
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="bar">
                            <div className='flex items-center'>
                                <LineChart className='size-4 mr-2 shrink-0' />
                                <p className='line-clamp-1'>
                                    Bar Chart
                                </p>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                {
                    data.length === 0 ? (
                        <div className='flex flex-col gap-y-4 items-center justify-center h-[350px] w-full'>
                            <FileSearch className='size-6 text-muted-foreground ' />
                            <p className='text-muted-foreground text-sm'>
                                No data for this period
                            </p>
                        </div>
                    ) : (
                        <>
                            {chartType === "bar" && <BarVariant data={data} />}
                            {chartType === "area" && <AreaVariant data={data} />}
                            {chartType === "line" && <LineVariant data={data} />}
                        </>
                    )
                }
            </CardContent>
        </Card>
    )
}

export default Charts;
