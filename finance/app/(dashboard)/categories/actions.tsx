"use client"
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'
import { useOpenCategory } from '@/features/categories/hooks/use-open-categories'
import { Edit, MoreHorizontal } from 'lucide-react'
import React from 'react'
type Props = {
    id: string
}
const Actions = ({ id }: Props) => {
    const{ onOpen }=useOpenCategory()
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