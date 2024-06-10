import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hone";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>;

type RequestType = InferRequestType<typeof client.api.categories[":id"]["$patch"]>["json"]

export const useEditCategory = (id?:string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation <ResponseType, Error,RequestType> ({
            mutationFn: async (json) => {
               
                const response = await client.api.categories[":id"]["$patch"]({ json,
                    param:{id}
                 })
                return await response.json();
            },
            onSuccess: () => {
                toast.success("Category updated")
                queryClient.invalidateQueries({ queryKey: ["categories" ,{id}] });
                queryClient.invalidateQueries({ queryKey: ["categories"] });
                queryClient.invalidateQueries({ queryKey: ["transactions"] });
            },
            onError: (error) => {
              
                toast.error("failed to create category")
            }
        });
    return mutation;
}

