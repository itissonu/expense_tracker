"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Loader2, Plus } from "lucide-react";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";

import { Skeleton } from "@/components/ui/skeleton";

import { useNewCategories } from "@/features/categories/hooks/use-new-categories";
import { useGetCategories } from "@/features/categories/api/use-get-accounts";
import { useBulkDeletetcategories } from "@/features/categories/api/use-bulk-delete";

const data: [] = [];

const CategoriesPage = () => {
  const { onOpen } = useNewCategories();

  const categoriesQuery = useGetCategories();
  const accounts = categoriesQuery.data || [];
  const deletecategories = useBulkDeletetcategories();
  const isDisabled = (categoriesQuery.isLoading || deletecategories.isPending)

  if (categoriesQuery.isLoading || isDisabled) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10  -mt-24">
        <Card className=" border-none drop-shadow-sm ">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent className="h-[500px] w-full flex justify-center items-center">
            <Loader2 className="size-8 animate-spin" />

          </CardContent>
        </Card>
      </div>

    )
  }
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10  -mt-24">
      <Card className=" border-none drop-shadow-sm ">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Categories page</CardTitle>
          <Button onClick={onOpen}>
            <Plus className="size-4 mr-2" /> Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={accounts}
            disabled={isDisabled}
            filterKey="email"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deletecategories.mutate({ ids });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;
