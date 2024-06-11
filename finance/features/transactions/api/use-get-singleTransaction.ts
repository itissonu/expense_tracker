import { convertamount, convertamountFromMiliUnits } from '@/lib/utils';
import { client } from "@/lib/hone";
import { useQuery } from "@tanstack/react-query";


export const useGetATransaction = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["transaction", { id }],
        queryFn: async () => {
            const response = await client.api.transactions[":id"].$get(({
                param: { id }
            }))
            if (!response.ok) {
                throw new Error("falied to fetch error");
            }
            const { data } = await response.json()

            return { ...data, amount: convertamountFromMiliUnits(data.amount) };
        }

    });
    return query;
}