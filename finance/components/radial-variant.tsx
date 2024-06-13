
import { convertamountFromMiliUnits, formatCurrency, formatpercentage } from "@/lib/utils"
import {
    Cell,
    Legend, Pie, PieChart, ResponsiveContainer, Tooltip, RadialBar, RadialBarChart,
} from "recharts"
const COLORS = ["#0062FF", "#12c6FF", "#FF647F", "#FF9354"]

type Props = {
    data?: {
        name: string;
        value: number;
    }[];
}

export const RadialVariant = ({ data }: Props) => {
    
    return (
        <ResponsiveContainer width="100%" height={350}>
            <RadialBarChart
                cx="50%"
                cy="30%"
                innerRadius="90%"
                outerRadius="40%"
                data={data?.map((item, index) => ({
                    ...item,

                    fill: COLORS[index % COLORS.length]


                }
                ))}
            >
                <RadialBar
                    label={{ fill: '#666', position: 'insideStart' }} background dataKey='value'
                />
                <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="right"
                    iconType="circle"
                    content={({ payload }: any) => {

                        return (
                            <ul className="flex flex-col space-y-2">
                                {
                                    payload.map((entry: any, index: number) => (
                                        <li key={`item-${index}`}
                                            className="flex items-center">
                                            <span className="size-4 rounded-full mr-1"
                                                style={{ backgroundColor: entry.color }} />
                                            <div className="space-x-1">
                                                <span className="text-sm text-muted-foreground">
                                                    {(entry.value)}

                                                </span>
                                                <span className="text-sm">
                                                    {formatCurrency(entry.payload.value )}
                                                </span>
                                            </div>


                                        </li>
                                    ))
                                }

                            </ul>
                        )

                    }}


                />
                {/* <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                    fill="#8884d8"
                    labelLine={false}

                >
                    {data?.map((_entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}

                        />

                    ))}


                </Pie> */}
                <Tooltip />
            </RadialBarChart>
        </ResponsiveContainer>
    )
}