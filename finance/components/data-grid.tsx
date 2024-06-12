"use client"

import { useGetSummary } from '@/features/summary/api/use-get-summary'
import { formatDaterange } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { FaPiggyBank } from "react-icons/fa"
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6"
import DataCard from './data-card'
import { Card, CardContent, CardHeader } from './ui/card'
import { Skeleton } from './ui/skeleton'

export const DataGrid = () => {
  const params = useSearchParams()
  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;

  const dateRangelabel = formatDaterange({ to, from })

  const { data, isLoading } = useGetSummary()
  if (isLoading) {
    return (
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mt-8' >
        <DataCardLoader />
        <DataCardLoader />
        <DataCardLoader />
      </div>

    )
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mt-8' >
      <DataCard
        title="Remaining"
        value={data?.remainingAmount}
        percentageChange={data?.remainingChange}
        icon={FaPiggyBank}
        variant="default"
        dateRange={dateRangelabel}

      />
      <DataCard
        title="Income"
        value={data?.incomeAmount}
        percentageChange={data?.incomeChange}
        icon={FaArrowTrendUp}

        dateRange={dateRangelabel}

      />
      <DataCard
        title="Expenses"
        value={data?.expensesAmount}
        percentageChange={data?.expenseChange}
        icon={FaArrowTrendDown}

        dateRange={dateRangelabel}

      />

    </div>
  )
}



export const DataCardLoader = () => {
  return (
    <Card className='border-none drop-shadow-sm h-[192px]'>
      <CardHeader className='flex flex-row items-center justify-between gap-x-4'>
        <div className='space-y-2'>
          <Skeleton className='h-6 w-24' />
          <Skeleton className='h-6 w-40' />

        </div>
        <Skeleton className='size-12' />
      </CardHeader>
      <CardContent>
        <Skeleton className='shrink-0 h-10 w-24 mb-2' />
        <Skeleton className='shrink-0 h-4 w-40' />
      </CardContent>
    </Card>
  )
}