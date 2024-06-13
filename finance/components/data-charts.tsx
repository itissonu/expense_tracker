"use client"
import { useGetSummary } from '@/features/summary/api/use-get-summary'
import React from 'react'
import Charts from './charts'
import PiCharts from './pie-chart'

const DataCharts = () => {
    const { data, isLoading } = useGetSummary()

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className='flex flex-col lg:flex-row justify-center'>
            <div className='lg:w-2/3 lg:mr-6'>
                <Charts data={data?.days} />
            </div>
            <div className='lg:w-1/3'>
                <PiCharts data={data?.categories}/>
            </div>
        </div>
    )
}

export default DataCharts
