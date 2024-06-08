import React from "react";

import {
    Sheet,
    SheetDescription,
    SheetContent,
    SheetTitle,
    SheetHeader,
} from "@/components/ui/sheet";


import {  insertCategoriesSchema } from "@/db/schema";
import { z } from "zod";

// import { newwC } from "../hooks/use-new-categories";

import { Loader2 } from "lucide-react";
import { useEditCategory } from "../api/use-edit-account";

import Categoriesform from "./categories-form";

import { useOpenCategory } from "../hooks/use-open-categories";
import { useDeleteCategory } from "../api/use-delete-account";
import { useGetAcategory } from "../api/use-get-singleCategory";

const formSchema = insertCategoriesSchema.pick({
    name: true,
});
type FormValues = z.input<typeof formSchema>;

const Editcategorysheets = () => {
    const { isOpen, onClose, id } = useOpenCategory();
    const accountquerry = useGetAcategory(id)
    const editmutation = useEditCategory(id)
    const deletemutation = useDeleteCategory(id)

    const isPending = editmutation.isPending || deletemutation.isPending
    const isLoading = accountquerry.isLoading

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
    const defaultvalues = accountquerry?.data ?
        { name: accountquerry.data.name }
        : { name: "" }
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Category</SheetTitle>
                    <SheetDescription>
                        Edit The Category To Track Your Transaction
                    </SheetDescription>
                </SheetHeader>
                {
                    isLoading ? (<div className="flex items-center justify-center" >
                        <Loader2 className="size-4 animate-spin text-muted-foreground" /></div>) : (<div>  <Categoriesform

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

export default Editcategorysheets;
