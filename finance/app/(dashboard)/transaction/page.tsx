"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Loader2, Plus } from "lucide-react";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";

import { Skeleton } from "@/components/ui/skeleton";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransaction } from "@/features/transactions/api/use-get-transcation";
import { useBulkDeletetTransaction } from "@/features/transactions/api/use-bulk-delete";

const data: [] = [];

const TranscationPage = () => {
  const { onOpen } = useNewTransaction();
  const transactiontQuery = useGetTransaction();
  const transactions = transactiontQuery.data || [];
  console.log(transactions)
  const deleteTransaction = useBulkDeletetTransaction();
  const isDisabled = (transactiontQuery.isLoading || deleteTransaction.isPending)

  if (transactiontQuery.isLoading || isDisabled) {
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
          <CardTitle className="text-xl line-clamp-1">Transaction page</CardTitle>
          <Button onClick={onOpen}>
            <Plus className="size-4 mr-2" /> Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactions}
            disabled={isDisabled}
            filterKey="payee"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransaction.mutate({ ids });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TranscationPage;
