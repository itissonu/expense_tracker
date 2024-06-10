"use client"
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction'
import { Edit, MoreHorizontal } from 'lucide-react'
import React from 'react'
type Props = {
    id: string
}
const Actions = ({ id }: Props) => {
    const{ onOpen }=useOpenTransaction()
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild ><Button variant="ghost" className='size-8 p-0'>
                    <MoreHorizontal />
                </Button></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem 
                    disabled={false}
                    onClick={()=>onOpen(id)}>
                        <Edit className='size-4 mr-2' />
                        Edit
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}

export default Actions