'use client'

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const AuthLayout = ({children}: {children: ReactNode}) => {
  const pathname = usePathname()
  const routesWithoutHeaders = ['/forgot-password', '/reset-password', '/verify-email']
  return (
    <main className='flex min-h-screen items-center justify-center bg-auth bg-cover bg-center bg-no-repeat'>
      <section className='light-border background-light800_dark200 shadow-light100_dark100 min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8'>
        <div className='flex items-center justify-between gap-2'>
          {!routesWithoutHeaders.includes(pathname) && <div className='space-y-2.5'>
            <h1 className='h2-bold text-dark100_light900'>Join MYFLIX</h1>
            <p className='-mt-3 paragraph-regular text-sm text-dark500_light400'>Get started for free. No credit card
                                                                                 required.</p>
          </div>}
            <Image src='/images/logo_red.svg' alt='MYFLIX Logo' width={110} height={25} className='object-contain' />
        </div>
        {children}
      </section>
    </main>
  )
}

export default AuthLayout
