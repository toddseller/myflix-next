import Theme from '@/components/navigation/navbar/Theme';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='flex-between background-light900_dark200 fixed z-50 w-full p-6 dark:shadow-none sm:px-12 shadow-light-300 gap-5'>
      <Link href='/' className='flex items-center gap-1'>
        <Image
          src='/images/logo_red.svg'
          alt='MYFLIX Logo'
          width={93}
          height={23}
        />
      </Link>

      <div className='flex-between gap-5'>
        <Theme />
      </div>
    </nav>
  )
}

export default Navbar
