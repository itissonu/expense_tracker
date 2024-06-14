"use client"
import React from 'react'
import HeaderLogo from './headerLogo'
import Navigation from '../navigation'
import { ClerkLoaded, ClerkLoading, UserButton, useUser } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import Filters from '../filters'

const Header = () => {
    const {user,isLoaded}=useUser()
    return (
        <header className='bg-gradient-to-b from-blue-500 to-blue-300 px-4 py-8 lg:px-14 pb-36'>
            <div className='max-w-screen-2xl mx-auto'>
                <div className='w-full flex items-center justify-between mb-14'>
                    <div className='flex items-center lg:gap-x-16'>
                        <HeaderLogo/>
                        <Navigation/>
                    </div>
                    <ClerkLoaded>
                        <UserButton afterSignOutUrl='/'/>
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className='animate-spin'/>
                    </ClerkLoading>

                </div>
                <div className='space-y-2 mb-4'>
                    <h2 className='text-2xl lg:text-4xl text-white font-medium'>
                        Welcome back{isLoaded?" ,":" "}👋{user?.firstName}

                    </h2>
                    <p className='text-sm lg:text0base text-[#89b6fd]'>
                        This iS your Finacial Overview Check it out

                    </p>
                    <Filters/>
                </div>
            </div>

        </header>
    )
}

export default Header