import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hone";

type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>;

type RequestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>["json"]

export const useBulkDeletetcategories = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {

            const response = await client.api.categories["bulk-delete"]["$post"]({ json })
            console.log(response)
            return await response.json();
        },
        onSuccess: () => {
            toast.success("category deleted")
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            queryClient.invalidateQueries({ queryKey: ["summary"] });
        },
        
        onError: (error) => {
            
            toast.error("failed to delete category")
        }
    });
    return mutation;
}

