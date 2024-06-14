"use client"

import React from 'react'
import qs from "query-string"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const AccountFilter = () => {
    const router = useRouter();
    const pathname = usePathname();


    const { data: accounts,
        isLoading: isLoadingAccounts
    } = useGetAccounts()
    const params = useSearchParams();
    const accountId = params.get("accountId") || "all";
    const from = params.get("from") || "";
    const to = params.get("to") || "";
   
    const onChange = (newvalue: string) => {
        const query = {
            accountId: newvalue,
            from,
            to,
        }
        if (newvalue === "all") {
            query.accountId = ""
        }
        const url = qs.stringifyUrl({
            url: pathname,
            query,
        }, { skipNull: true, skipEmptyString: true});
        console.log(url)
        router.push(url)
    }
    return (
        <Select
            value={accountId}
            onValueChange={onChange}
            disabled={isLoadingAccounts}
        >
            <SelectTrigger className='lg:w-auto h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none outline-none text-white focus:bg-white/30 focus:ring-transparent '>
                <SelectValue placeholder="Account" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">
                    All Acounts
                </SelectItem>
                {
                    accounts?.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                            {account.name}
                        </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    )
}

export default AccountFilter