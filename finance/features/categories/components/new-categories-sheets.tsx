import React from "react";

import {
  Sheet,
  SheetDescription,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import { useNewCategories} from "../hooks/use-new-categories";

import {  insertCategoriesSchema } from "@/db/schema";
import { z } from "zod";

import Categoriesform from "./categories-form";
import { useCreateCategory } from "../api/use-create-accounts";

const formSchema = insertCategoriesSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

const NewCategorysheets = () => {
  const { isOpen, onClose } =  useNewCategories();
 
  const mutation = useCreateCategory();
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
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create new category To Track Your Transaction
          </SheetDescription>
        </SheetHeader>
        <Categoriesform
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultvalues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default NewCategorysheets;
