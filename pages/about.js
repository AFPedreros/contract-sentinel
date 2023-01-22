import Head from 'next/head';
import Header from '../components/Header';
import Image from 'next/image';
import bookImage from '../assets/book.png';

// About page component
export default function About() {
    return (
        <div className='relative text-gray-900'>
            <Head>
                <title>Contract Sentinel</title>
            </Head>
            <div className='absolute top-0 left-0 z-20 w-full'>
                <Header />
            </div>

            <div className='flex h-screen w-full bg-[url(../assets/bg.png)] bg-cover px-6 text-center'>
                <div className='md:w-3/5 w-full mx-auto my-auto text-center'>
                    <h1 className='md:max-w-3xl md:text-5xl md:leading-snug mx-auto text-4xl font-bold text-white'>
                        We <span className='text-indigo-600'>empower </span>
                        teams through AI smart contract auditing
                    </h1>
                </div>
            </div>
            <div className='bg-slate-100 flex items-center w-full h-screen px-6 text-center bg-cover'>
                <div className='md:w-1/2 w-full mx-auto'>
                    <div className='md:max-w-xl mx-auto'>
                        <h2 className='text-start md:max-w-3xl md:text-5xl md:leading-snug text-4xl font-bold'>
                            Empowering Teams to Confidently
                            <label className='text-indigo-600'> Audit </label>
                            Smart Contracts
                        </h2>
                        <p className='w-fit text-start my-6'>
                            Our mission is to provide fast and easy-to-use
                            AI-powered auditing for smart contracts. Our goal is
                            to assist small and medium size teams in checking
                            their contracts, so they can focus on building and
                            shipping their products. While our app is not meant
                            to replace enterprise-level audits, it is designed
                            to help ensure the security and reliability of smart
                            contracts, particularly for teams that may not have
                            the resources or expertise to conduct thorough
                            manual audits. By providing a simple and efficient
                            solution for auditing smart contracts, we hope to
                            empower teams to confidently use this powerful
                            technology and continue pushing the boundaries of
                            what is possible
                        </p>
                    </div>
                </div>
                <div className='md:block md:w-1/2 hidden w-full mx-auto my-auto'>
                    <div className='md:max-w-xl mx-auto'>
                        <Image
                            className='mx-auto'
                            src={bookImage}
                            alt='book with an eye'
                            width={460}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
