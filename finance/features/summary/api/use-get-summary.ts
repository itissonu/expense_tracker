import { categories } from '@/db/schema';
import { client } from "@/lib/hone";
import { convertamountFromMiliUnits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";


export const useGetSummary = () => {
    const params = useSearchParams()
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const accountId = params.get("accountId") || ""

    console.log({ from, to, accountId });
    const query = useQuery({
        queryKey: ["summary", { from, to, accountId }],
        queryFn: async () => {
            const response = await client.api.summary.$get({
                query: {
                    from, accountId, to
                }
            })
            if (!response.ok) {
                console.log(response)
                throw new Error("falied to fetch error");
            }
            const { data } = await response.json()
            return {
                ...data,
                incomeAmount: convertamountFromMiliUnits(data.incomeAmount),
                expensesAmount: convertamountFromMiliUnits(data.expensesAmount),
                remainingAmount: convertamountFromMiliUnits(data.remainingAmount),
                categories: data.categories.map((category) => ({
                    ...category,
                    value: convertamountFromMiliUnits(category.value)
                })),
                days: data.days.map((day) => ({
                    ...day,
                    income: convertamountFromMiliUnits(day.income),
                    expense: convertamountFromMiliUnits(day.expense)

                }))
            }
        }

    });
    return query;
}