import Head from 'next/head';
import Header from '../components/Header';
import Form from '../components/Form';

// Contact page component
// TODO: make the form a component
export default function Contact() {
    return (
        <div className='relative text-gray-900'>
            <Head>
                <title>Contract Sentinel</title>
            </Head>
            <div className='absolute top-0 left-0 z-20 w-full'>
                <Header />
            </div>
            <div className='bg-my_bg_image flex w-full h-screen px-6 text-center bg-cover'>
                <div className='md:w-3/5 flex flex-col items-center w-full mx-auto my-auto'>
                    <h1 className='md:leading-snugtext-4xl md:max-w-3xl md:text-5xl font-bold text-white'>
                        Help us in our mission to
                        <span className='text-indigo-600'> secure </span>
                        the future of web3!
                    </h1>
                    <div className='mt-8 max-h-[28rem] overflow-auto'>
                        <Form />
                    </div>
                </div>
            </div>
        </div>
    );
}
