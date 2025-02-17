import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'
import { cn } from '@/lib/utils'
import React from 'react'


type Props = {

    account: string;
    accountId: string;
}
const AccountColumn = ({ account, accountId }: Props) => {

    const { onOpen: onOpenAccount } = useOpenAccount();
    const onClick = () => {
        onOpenAccount(accountId)
    }

    return (
        <div onClick={onClick}
            className='flex items-center cursor-pointer hover:underline'   >
            {account}

        </div>
    )
}

export default AccountColumn