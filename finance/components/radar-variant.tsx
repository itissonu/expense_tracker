
import { formatpercentage } from "@/lib/utils"
import {
    Cell,
    Legend, Pie, PieChart, ResponsiveContainer, Tooltip, RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar
} from "recharts"
const COLORS = ["#0062FF", "#12c6FF", "#FF647F", "#FF9354"]

type Props = {
    data?: {
        name: string;
        value: number;
    }[];
}

export const RadarVariant = ({ data }: Props) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <RadarChart outerRadius={90} width={730} height={250} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
               
                    <Radar
                       
                        dataKey="value"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.6}

                    />

            

                <Legend />
                <Tooltip/>
            </RadarChart>

        </ResponsiveContainer>
    )
}