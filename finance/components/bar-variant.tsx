import { format, parseISO } from 'date-fns';
import React from 'react';
import {
    Tooltip,
    XAxis,
    AreaChart,
    Area,
    ResponsiveContainer,
    CartesianGrid,
    YAxis,
    Bar,
    BarChart
} from "recharts";
type Props = {
    data?: {
        date: string;
        income: number;
        expense: number;
    }[];
}

const BarVariant = ({ data }: Props) => {

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
            
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(value, "dd MMM")}
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
               
                <Tooltip />
                <Bar type="monotone" dataKey="income"
                fill='#3b82f6' className='drop-shadow-sm' />
                <Bar type="monotone" dataKey="expense" 
                fill='#f43f5e' className='drop-shadow-sm' />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BarVariant