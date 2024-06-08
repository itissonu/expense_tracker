"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/use.new.account";
import { Loader2, Plus } from "lucide-react";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeletetAccount } from "@/features/accounts/api/use-bulk-delete";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransaction } from "@/features/transactions/api/use-get-transcation";

const data: [] = [];

const TranscationPage = () => {
  const { onOpen } = useNewTransaction();
  const accountQuery = useGetTransaction();
  const accounts = accountQuery.data || [];
  const deleteAccounts = useBulkDeletetAccount();
  const isDisabled = (accountQuery.isLoading || deleteAccounts.isPending)

  if (accountQuery.isLoading || isDisabled) {
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
          <CardTitle className="text-xl line-clamp-1">Account page</CardTitle>
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
              deleteAccounts.mutate({ ids });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TranscationPage;
