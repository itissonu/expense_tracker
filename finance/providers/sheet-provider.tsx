"use client"

import Editaccountsheets from '@/features/accounts/components/edit-account-sheet'
import Newaccountsheets from '@/features/accounts/components/new-account-sheets'
import Editcategorysheets from '@/features/categories/components/edit-categories-sheet'
import NewCategorysheets from '@/features/categories/components/new-categories-sheets'
import EditTransactionsheets from '@/features/transactions/components/edit-transactions-sheet'
import NewTransactionsheets from '@/features/transactions/components/new-transactions-sheets'
import React, { useEffect, useState } from 'react'
import { useMountedState } from 'react-use'

const Sheetprovider = () => {
    //const isMounted=useMountedState()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <Newaccountsheets />
            <Editaccountsheets/>
            <NewCategorysheets/>
            <Editcategorysheets/>
            <NewTransactionsheets/>
            <EditTransactionsheets/>
        </div>
    )
}

export default Sheetprovider