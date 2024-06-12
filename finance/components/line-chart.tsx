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
    BarChart,
    LineChart,
    Line
} from "recharts";
type Props = {
    data?: {
        date: string;
        income: number;
        expense: number;
    }[];
}

const LineVariant = ({ data }: Props) => {

    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
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
                <Line
                    dot={false}
                    dataKey="income"
                    stroke='#3b82f6'
                    strokeWidth={2} className='drop-shadow-sm' />
                <Line
                    dot={false} dataKey="expense"
                    strokeWidth={2}
                    stroke='#f43f5e' className='drop-shadow-sm' />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default LineVariant