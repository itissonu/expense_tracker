"use client"
import React, { useState } from 'react'
import NavButton from './NavButton'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet'
import { useMedia } from 'react-use'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'

const routes = [
    {
        href: '/',
        label: 'Overview'
    }, {
        href: '/transaction',
        label: 'transactions'
    }, {
        href: '/accounts',
        label: 'Accounts'
    }, {
        href: '/categories',
        label: 'Categories'
    }, {
        href: '/settings',
        label: 'Settings'
    }
]
const Navigation = () => {
    const pathname = usePathname();
    const router = useRouter()
    const isMobile = useMedia("(max-width:1024px)", false)
    const [isOpen, setIsOpen] = useState(false)
    const onClick = (href: string) => {
        router.push(href);
        setIsOpen(false);
    }
    if(isMobile){
        return(
           <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
                <Button variant="outline"
                size='sm'
                className='font-normal hover:bg-white/20 hover:text-white border-none outline-none text-white focus:bg-white/30 transition bg-white/10'>
                    <Menu className='h-4 w-4'/>

                </Button>

            </SheetTrigger>
            <SheetContent side="left" className='px-2'>
                <nav className='flex flex-col gap-3 pt-6'>
                    {routes.map(route=>(
                        <Button
                        key={route.href}
                        variant={route.href===pathname?"secondary":"ghost"}
                        onClick={()=>onClick(route.href)}
                        >
                            {route.label}
                            
                        </Button>
                    ))}
                </nav>
                
            </SheetContent>

           </Sheet> 
        )
    }
    return (
        <nav className='hidden lg:flex items-center gap-2 overflow-auto'>{routes.map((route) => (

            <NavButton
                key={route.href}
                href={route.href}
                label={route.label}
                isActive={pathname === route.href} />
        ))}</nav>
    )
}

export default Navigation