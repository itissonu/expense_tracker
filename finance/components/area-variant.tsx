import { format, parseISO } from 'date-fns';
import React from 'react';
import {
    Tooltip,
    XAxis,
    AreaChart,
    Area,
    ResponsiveContainer,
    CartesianGrid,
    YAxis
} from "recharts";

type Props = {
    data: {
        date: string;
        income: number;
        expense: number;
    }[];
};



const AreaVariant = ({ data }: Props) => {
    console.log('Data length:', data.length);
    console.log('Data:', data);
    const parsedData = data.map(item => ({
        ...item,
        date: parseISO(item.date)
    }));
    console.log('Parsed Data:', parsedData);
  
    return (
        <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={parsedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <defs>
                    <linearGradient id="income" x1="0" y1="0" y2="1">
                        <stop offset="2%" stopColor='#3d82f6' stopOpacity={0.8} />
                        <stop offset="98%" stopColor='#3d82f6' stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expense" x1="0" y1="0" y2="1">
                        <stop offset="2%" stopColor='#f43f53' stopOpacity={0.8} />
                        <stop offset="98%" stopColor='#f43f53' stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(value, "dd MMM")}
                    style={{ fontSize: "12px" }}
                   
                />
                <YAxis 
                
                
                />
                <Tooltip  />
                <Area type="monotone" dataKey="income" stroke="#3d82f6" fill="url(#income)" className='drop-shadow-sm' />
                <Area type="monotone" dataKey="expense" stroke="#f43f53" fill="url(#expense)" className='drop-shadow-sm' />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default AreaVariant;
