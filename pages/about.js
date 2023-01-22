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

            <div className='flex h-screen w-full bg-my_bg_image bg-cover px-6 text-center'>
                <div className='mx-auto my-auto w-full text-center md:w-3/5'>
                    <h1 className='mx-auto text-4xl font-bold text-white md:max-w-3xl md:text-5xl md:leading-snug'>
                        We <span className='text-indigo-600'>empower </span>
                        teams through AI smart contract auditing
                    </h1>
                </div>
            </div>
            <div className='flex h-screen w-full items-center bg-slate-100 bg-cover px-6 text-center'>
                <div className='mx-auto w-full md:w-1/2'>
                    <div className='mx-auto md:max-w-xl'>
                        <h2 className='text-start text-4xl font-bold md:max-w-3xl md:text-5xl md:leading-snug'>
                            Empowering Teams to Confidently
                            <label className='text-indigo-600'> Audit </label>
                            Smart Contracts
                        </h2>
                        <p className='my-6 w-fit text-start'>
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
                <div className='mx-auto my-auto hidden w-full md:block md:w-1/2'>
                    <div className='mx-auto md:max-w-xl'>
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
