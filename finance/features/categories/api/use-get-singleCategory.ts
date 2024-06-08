import { client } from "@/lib/hone";
import { useQuery } from "@tanstack/react-query";


export const useGetAcategory = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["categories", { id }],
        queryFn: async () => {
            const response = await client.api.categories[":id"].$get(({
                param: { id }
            }))
            if (!response.ok) {
                throw new Error("falied to fetch error");
            }
            const { data } = await response.json()
            return data;
        }

    });
    return query;
}