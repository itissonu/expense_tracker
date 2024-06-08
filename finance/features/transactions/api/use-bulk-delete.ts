import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hone";

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-delete"]["$post"]>;

type RequestType = InferRequestType<typeof client.api.transactions["bulk-delete"]["$post"]>["json"]

export const useBulkDeletetTransaction = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {

            const response = await client.api.transactions["bulk-delete"]["$post"]({ json })
         
            return await response.json();
        },
        onSuccess: () => {
            toast.success("transactions deleted")
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
        onError: (error) => {
            
            toast.error("failed to delete transactions")
        }
    });
    return mutation;
}

