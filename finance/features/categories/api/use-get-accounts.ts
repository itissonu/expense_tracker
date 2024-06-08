import { client } from "@/lib/hone";
import { useQuery } from "@tanstack/react-query";


export const useGetCategories = () => {
    const query = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await client.api.categories.$get("json")
            if (!response.ok) {
                throw new Error("falied to fetch error");
            }
            const { data } = await response.json()
            return data;
        }

    });
    return query;
}