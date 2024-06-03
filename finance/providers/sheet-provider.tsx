"use client"

import Newaccountsheets from '@/features/accounts/components/new-account-sheets'
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
        </div>
    )
}

export default Sheetprovider