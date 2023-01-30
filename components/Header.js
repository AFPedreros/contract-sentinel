import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import contractSentinelLogo from '../assets/logo-blanco.png';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    function toggleMobileMenu() {
        setMobileMenuOpen((prev) => !prev);
        const overflow = mobileMenuOpen ? 'visible' : 'hidden';
        document.body.style.overflow = overflow;
    }

    return (
        <nav className='top-0 left-0 z-20 w-full bg-transparent px-2 py-2.5 backdrop-blur-lg sm:px-4'>
            <div className='container flex flex-wrap items-center md:justify-between'>
                <a
                    href='https://contract-sentinel.vercel.app/'
                    className='mx-auto flex items-center md:mx-0'
                >
                    <Image
                        src={contractSentinelLogo}
                        alt='contract sentinel logo'
                        height={40}
                    />
                    <span className='self-center whitespace-nowrap text-xl font-semibold text-white'>
                        Contract Sentinel
                    </span>
                </a>
                <div className='md:order-2'>
                    <Link
                        className='mr-3 hidden rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-bold text-white focus:outline-none focus:ring-4 focus:ring-gray-800 hover:bg-indigo-900 md:mr-0 md:block'
                        href='/sentinel'
                    >
                        Sentinel App
                    </Link>
                </div>
                <button
                    type='button'
                    className='inline-flex items-center rounded-lg p-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:bg-transparent md:hidden'
                    aria-expanded='false'
                    onClick={toggleMobileMenu}
                >
                    <span className='sr-only'>Open main menu</span>
                    <svg
                        className='h-6 w-6'
                        aria-hidden='true'
                        fill='white'
                        viewBox='0 0 20 20'
                    >
                        <path
                            fill-rule='evenodd'
                            d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                            clip-rule='evenodd'
                        ></path>
                    </svg>
                </button>
                <div className='hidden w-full items-center justify-between md:order-1 md:flex md:w-auto'>
                    <ul className='mt-4 flex flex-col p-4 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-bold'>
                        <li>
                            <Link
                                className='block rounded py-2 pl-3 pr-4 text-white hover:text-indigo-600 md:bg-transparent md:p-0 md:text-white'
                                href='/'
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                className='block rounded py-2 pl-3 pr-4 text-white hover:text-indigo-600 md:bg-transparent md:p-0 md:text-white'
                                href='/about'
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                className='block rounded py-2 pl-3 pr-4 text-white hover:text-indigo-600 md:bg-transparent md:p-0 md:text-white'
                                href='/contact'
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            {mobileMenuOpen ? (
                <div className='mt-10 flex h-screen w-full flex-col items-center text-indigo-600 md:hidden'>
                    <Link
                        className='py-4 text-xl font-bold hover:text-[#4f5fe4]'
                        href='/sentinel'
                        onClick={toggleMobileMenu}
                    >
                        Sentinel
                    </Link>
                    <Link
                        className='py-4 text-xl font-bold hover:text-[#4f5fe4]'
                        href='/about'
                        onClick={toggleMobileMenu}
                    >
                        About
                    </Link>
                    <Link
                        className='py-4 text-xl font-bold hover:text-[#4f5fe4]'
                        href='/contact'
                        onClick={toggleMobileMenu}
                    >
                        Contact
                    </Link>
                    <Link
                        className='mt-3 rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-bold text-white focus:outline-none focus:ring-4 focus:ring-indigo-900 hover:bg-indigo-900 md:mr-0 md:block'
                        href='/'
                    >
                        Sentinel App
                    </Link>
                </div>
            ) : (
                <></>
            )}
        </nav>
    );
}
