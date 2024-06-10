import React from "react";

import {
  Sheet,
  SheetDescription,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import { useNewTransaction } from "../hooks/use-new-transaction";

import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";



import { useCreateTransaction } from "../api/use-create-transaction";
import Transactionform from "./transactions-form";
import { useCreateCategory } from "@/features/categories/api/use-create-accounts";
import { useGetCategories } from "@/features/categories/api/use-get-accounts";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-accounts";
import { Loader } from "lucide-react";

const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

const NewTransactionsheets = () => {
  const { isOpen, onClose } = useNewTransaction();
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

  const isPending = mutation.isPending || accountmutation.isPending || categorymutation.isPending;

  const isLoading = accounts.isLoading || categoryies.isLoading;


  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose()
      }

    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>
            Create a new  Transaction
          </SheetDescription>
        </SheetHeader>
        {
          isLoading ? (<div className=" items-center justify-center flex absolute">
            <Loader className="animate-spin size-5" />
          </div>) :
            <Transactionform
              onSubmit={onSubmit}
              disabled={isPending}
              categoryOptions={categoryOption}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOption}
              onCreateAccount={onCreateAccount}
             
            />

        }

      </SheetContent>
    </Sheet>
  );
};

export default NewTransactionsheets;
