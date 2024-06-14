
import Header from '@/components/ui/Header';
import React from 'react'

const Dashlayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="w-full overflow-hidden">
      <Header />
      <main className="px-3 lg:px-14 w-full">
        {children}
      </main>
    </div>
    )
}

export default Dashlayout