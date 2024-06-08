import React from "react";

import {
    Sheet,
    SheetDescription,
    SheetContent,
    SheetTitle,
    SheetHeader,
} from "@/components/ui/sheet";

import Accountform from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";

import { useOpenAccount } from "../hooks/use-open-account";
import { useGetAccount } from "../api/use-get-singleaccount";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "../api/use-edit-account";
import { useDeleteAccount } from "../api/use-delete-account";

const formSchema = insertAccountSchema.pick({
    name: true,
});
type FormValues = z.input<typeof formSchema>;

const Editaccountsheets = () => {
    const { isOpen, onClose, id } = useOpenAccount();
    const accountquerry = useGetAccount(id)
    const editmutation = useEditAccount(id)
    const deletemutation = useDeleteAccount(id)

    const isPending = editmutation.isPending||deletemutation.isPending 
    const isLoading = accountquerry.isLoading

    const onSubmit = (values: FormValues) => {
        editmutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }

        });
    };
    const onDelete=async()=>{
        deletemutation.mutate(undefined,{
            onSuccess:()=>{
                onClose();
            }
        })
    }
    const defaultvalues = accountquerry?.data ?
        { name: accountquerry.data.name }
        : { name: "" }
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Account</SheetTitle>
                    <SheetDescription>
                        Edit The account To Track Your Transaction
                    </SheetDescription>
                </SheetHeader>
                {
                    isLoading ? (<div className="flex items-center justify-center" >
                        <Loader2 className="size-4 animate-spin text-muted-foreground" /></div>) : (<div>  <Accountform

                            id={id}
                            onSubmit={onSubmit}
                            disabled={isPending}
                            defaultvalues={defaultvalues}
                            onDelete={onDelete}
                        /></div>)
                }

            </SheetContent>
        </Sheet>
    );
};

export default Editaccountsheets;
