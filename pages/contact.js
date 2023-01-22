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
            <div className='flex h-screen w-full bg-[url(../assets/bg.png)] bg-cover px-6 text-center'>
                <div className='md:w-3/5 flex flex-col items-center w-full mx-auto my-auto'>
                    <h1 className='md:max-w-3xl md:text-5xl md:leading-snug text-4xl font-bold text-white'>
                        Help us in our mission to
                        <span className='text-indigo-600'> secure </span>
                        the future of web3!
                    </h1>
                    <Form />
                </div>
            </div>
        </div>
    );
}
