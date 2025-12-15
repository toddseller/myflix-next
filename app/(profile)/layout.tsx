import LeftSidebar from '@/components/navigation/LeftSidebar';
import Navbar from '@/components/navigation/navbar';
import { ReactNode } from 'react';

const ProfileLayout = ({children}: {children: ReactNode}) => {
  return (
    <main>
      <Navbar />
      <div className="flex">
        <LeftSidebar />

        <section className="flex min-h-screen flex-1 flex-col px-6 pt-36 pb-6 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
      </div>
    </main>
  )
}

export default ProfileLayout