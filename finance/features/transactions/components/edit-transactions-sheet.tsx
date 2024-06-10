import React from "react";

import {
    Sheet,
    SheetDescription,
    SheetContent,
    SheetTitle,
    SheetHeader,
} from "@/components/ui/sheet";


import { insertCategoriesSchema, insertTransactionSchema } from "@/db/schema";
import { z } from "zod";

// import { newwC } from "../hooks/use-new-categories";

import { Loader2 } from "lucide-react";
import { useEditTransaction } from "../api/use-edit-transaction";

import TransactionForm from "./transactions-form";

import { useOpenTransaction } from "../hooks/use-open-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useGetATransaction } from "../api/use-get-singleTransaction";
import { useGetCategories } from "@/features/categories/api/use-get-accounts";
import { useCreateTransaction } from "../api/use-create-transaction";
import { useCreateCategory } from "@/features/categories/api/use-create-accounts";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-accounts";

const formSchema = insertTransactionSchema.omit({
    id: true,
});
type FormValues = z.input<typeof formSchema>;

const EditTransactionsheets = () => {
    const { isOpen, onClose, id } = useOpenTransaction();
    const transactionquerry = useGetATransaction(id)
    const editmutation = useEditTransaction(id)
    const deletemutation = useDeleteTransaction(id)
    const categoryies = useGetCategories()
    const mutation = useCreateTransaction();
    const categorymutation = useCreateCategory()

    const onCreateCategory = (name: string) => categorymutation.mutate({
        name
    })
    const categoryOption = (categoryies.data ?? []).map((category) => ({
        label: category.name,
        value: category.id
    }))
    /////
    const accounts = useGetAccounts()

    const accountmutation = useCreateAccount()

    const onCreateAccount = (name: string) => accountmutation.mutate({
        name
    })

    const accountOption = (accounts.data ?? []).map((account) => ({
        label: account.name,
        value: account.id
    }))

    const isPending = editmutation.isPending || deletemutation.isPending || transactionquerry.isLoading || categorymutation.isPending ||
        accountmutation.isPending


    const isLoading = transactionquerry.isLoading || categoryies.isLoading ||
        accounts.isLoading

    const onSubmit = (values: FormValues) => {
        editmutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }

        });
    };
    const onDelete = async () => {
        deletemutation.mutate(undefined, {
            onSuccess: () => {
                onClose();
            }
        })
    }
    const defaultvalues = transactionquerry?.data ?
        {
            accountId: transactionquerry.data?.accountid,
            categoryId: transactionquerry.data?.categoryId,
            amount: transactionquerry.data?.amount.toString(),
            date: transactionquerry.data?.date ? new Date(transactionquerry.data?.date) : new Date(),
            payee: transactionquerry.data?.payee,
            notes: transactionquerry.data?.notes,

        }
        : {
            accountId: "",
            categoryId: "",
            amount: "",
            date: new Date(),
            payee: "",
            notes: "",
        }
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Transaction</SheetTitle>
                    <SheetDescription>
                        Edit an existing Transaction
                    </SheetDescription>
                </SheetHeader>
                {
                    isLoading ? (<div className="flex items-center justify-center" >
                        <Loader2 className="size-4 animate-spin text-muted-foreground" /></div>) : (<div>  <TransactionForm
                            id={id}
                            onSubmit={onSubmit}
                            disabled={isPending}
                            categoryOptions={categoryOption}
                            onCreateCategory={onCreateCategory}
                            accountOptions={accountOption}
                            onCreateAccount={onCreateAccount}
                            defaultvalues={defaultvalues}
                            onDelete={onDelete}

                        /></div>)
                }

            </SheetContent>
        </Sheet>
    );
};

export default EditTransactionsheets;
