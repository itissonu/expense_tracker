import React from "react";

import {
  Sheet,
  SheetDescription,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import { useNewAccount } from "../hooks/use.new.account";
import Accountform from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateAccount } from "../api/use-create-accounts";

const formSchema = insertAccountSchema.pick({
  name: true,
});
type FormValues = z.input<typeof formSchema>;

const Newaccountsheets = () => {
  const { isOpen, onClose } = useNewAccount();
  const mutation = useCreateAccount();
  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onError(error, variables, context) {
          console.log(error)
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create new account To Track Your Transaction
          </SheetDescription>
        </SheetHeader>
        <Accountform
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultvalues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default Newaccountsheets;
