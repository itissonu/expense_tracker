import { client } from "@/lib/hone";
import { convertamountFromMiliUnits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";


export const useGetTransaction = () => {
    const params = useSearchParams()
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const accountId = params.get("accountId") || ""

    console.log({ from, to, accountId });
    const query = useQuery({
        queryKey: ["transactions", { from, to, accountId }],
        queryFn: async () => {
            const response = await client.api.transactions.$get({
                query:{
                    from,accountId,to
                }
            })
            if (!response.ok) {
                console.log(response)
                throw new Error("falied to fetch error");
            }
            const { data } = await response.json()
            return data.map((transaction)=>({
                ...transaction,
                amount:convertamountFromMiliUnits(transaction.amount)
            }));
        }

    });
    return query;
}