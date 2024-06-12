"use client"
import { useGetSummary } from '@/features/summary/api/use-get-summary'
import React from 'react'
import Charts from './charts'

const DataCharts = () => {

    const { data, isLoading } = useGetSummary()
    if (isLoading) {
        return (
            <div>

            </div>
        )
    }


    return (
        <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
            <div className='col-span-1 lg:col-span-3 xl:col-span-4'>
                <Charts data={data?.days} />
            </div>
        </div>
    )
}

export default DataCharts