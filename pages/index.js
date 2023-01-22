import Head from 'next/head';
import Header from '../components/Header';
import Link from 'next/link';
import Image from 'next/image';
import bookImage from '../assets/book.png';
import eyeImage from '../assets/eye.png';

export default function Home() {
    return (
        <div className='relative h-screen text-[#fff]'>
            <Head>
                <title>Contract Sentinel</title>
            </Head>
            <div className='absolute top-0 left-0 z-20 w-full'>
                <Header />
            </div>
            <div className='flex h-screen w-full bg-[url(../assets/bg.png)] bg-cover px-6 text-center'>
                <div className='md:w-3/5 flex flex-col items-center w-full mx-auto my-auto text-center'>
                    <h1 className='md:max-w-3xl md:text-5xl md:leading-snug text-4xl font-bold text-white'>
                        Audit your smart contracts easy and
                        <span className='text-indigo-600'> fast</span>
                    </h1>
                    <p className='w-fit my-2 font-semibold'>
                        Find errors and vulnerabilities in smart contracts using
                        this AI-powered tool
                    </p>
                    <div className='flex gap-2 mt-6'>
                        <Link
                            className='mr-3 hidden rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-bold text-white focus:outline-none focus:ring-4 focus:ring-gray-800 hover:bg-indigo-900 md:mr-0 md:block'
                            href='/sentinel'
                        >
                            Audit Contract
                        </Link>
                        <Link
                            className='mr-3 hidden rounded-lg bg-gray-700 px-5 py-2.5 text-center text-sm font-bold text-white focus:outline-none focus:ring-4 focus:ring-indigo-900 hover:bg-gray-800 md:mr-0 md:block'
                            href='/contact'
                        >
                            Request Demo
                        </Link>
                    </div>
                </div>
            </div>
            <div className='bg-slate-100 flex w-full h-screen px-6 text-center text-black'>
                <div className='md:w-3/5 flex flex-col items-center w-full mx-auto my-auto text-center'>
                    <h2 className='md:max-w-3xl md:text-5xl md:leading-snug text-4xl font-bold'>
                        <span className='text-indigo-600'>Empowering </span>
                        the Future: AI and Smart Contract
                    </h2>
                    <div className='md:max-w-xl mx-auto'>
                        <Image
                            className='mx-auto'
                            src={bookImage}
                            alt='book with an eye'
                            width={300}
                        />
                    </div>
                    <p className='w-fit my-2 font-semibold'>
                        Unlock the power of AI and Smart Contracts to pave the
                        way for a more secure, trusted, and decentralized future
                        where power is placed in the hands of the people, and
                        trust is built on cutting-edge technology
                    </p>

                    <Link
                        className='mr-3 mt-6 hidden w-fit rounded-lg bg-gray-700 px-5 py-2.5 text-center text-sm font-bold text-white focus:outline-none focus:ring-4 focus:ring-indigo-900 hover:bg-gray-800 md:mr-0 md:block'
                        href='/sentinel'
                    >
                        Try Yourself
                    </Link>
                </div>
            </div>
            <div className='flex h-screen w-full items-center bg-[url(../assets/bg.png)] bg-cover px-6 text-center'>
                <div className='md:w-1/2 w-full mx-auto'>
                    <div className='md:max-w-xl mx-auto'>
                        <h2 className='text-start md:max-w-3xl md:text-5xl md:leading-snug text-4xl font-bold'>
                            Get your smart contract
                            <label className='text-indigo-600'> audited</label>
                        </h2>
                        <p className='w-fit text-start my-6'>
                            Simply enter your smart contract source code and our
                            app will quickly scan for any vulnerabilities. In
                            addition to identifying potential issues, our app
                            also provides specific code suggestions to help you
                            fix them, ensuring the security and integrity of
                            your smart contracts
                        </p>

                        <Link
                            className='mr-3 mt-6 hidden w-fit rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-bold text-white focus:outline-none focus:ring-4 focus:ring-gray-800 hover:bg-indigo-900 md:mr-0 md:block'
                            href='/sentinel'
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
                <div className='md:block md:w-1/2 hidden w-full mx-auto my-auto'>
                    <div className='md:max-w-xl mx-auto'>
                        <Image
                            className='mx-auto'
                            src={eyeImage}
                            alt='book with an eye'
                            width={460}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
