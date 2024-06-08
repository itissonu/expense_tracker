import React from "react";

import {
  Sheet,
  SheetDescription,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import {  useNewTransaction} from "../hooks/use-new-transaction";

import {   insertTransactionSchema } from "@/db/schema";
import { z } from "zod";



import { useCreateTransaction } from "../api/use-create-transaction";
import Transactionform from "./transactions-form";

const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

const NewTransactionsheets = () => {
  const { isOpen, onClose } =  useNewTransaction();
 
  const mutation = useCreateTransaction();
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
        {/* <Transactionform
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultvalues={{ name: "" }}
        /> */}
      </SheetContent>
    </Sheet>
  );
};

export default NewTransactionsheets;
