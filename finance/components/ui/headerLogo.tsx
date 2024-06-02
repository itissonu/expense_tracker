import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import img from '../../public/vercel.svg'
const HeaderLogo = () => {
    return (
        <Link href='/'>
            <div className='hidden lg:flex items-center'>
                <Image src={img} className='size-20' alt='logo' />
                <p className='font text-white ml-3'>Finace</p>
            </div>
        </Link>
    )
}

export default HeaderLogo