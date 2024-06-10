import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'
import { useOpenCategory } from '@/features/categories/hooks/use-open-categories'
import { cn } from '@/lib/utils'
import { TriangleAlert } from 'lucide-react'
import React from 'react'


type Props = {
    id: string
    category: string | null;
    categoryId: string | null;
}
const CategoryColumn = ({ id, category, categoryId }: Props) => {

    const { onOpen: onOpenAccount } = useOpenCategory();
    const onClick = () => {
        if(categoryId){
            onOpenAccount(categoryId)
        }
       
    }

    return (
        <div onClick={onClick}
            className={cn('flex items-center cursor-pointer hover:underline',
                !category && "text-rose-500"
            )}   >

                {!category && <TriangleAlert className="mr-2 size-4" />}
            {category|| "Uncategorized"}

        </div>
    )
}

export default CategoryColumn