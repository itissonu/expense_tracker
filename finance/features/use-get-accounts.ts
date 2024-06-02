import { client } from "@/lib/hone";
import { useQuery } from "@tanstack/react-query";


export const useGetAccounts = () => {
    const query = useQuery({
        queryKey: ["accounts"],
        queryFn: async () => {
            const response = await client.api.accounts.$get()
            if (!response.ok) {
                throw new Error("falied to fetch error");
            }
            const { data } = await response.json()
            return data;
        }

    });
    return query;
}