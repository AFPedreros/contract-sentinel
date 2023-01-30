import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import Head from 'next/head';
import Header from '../components/Header';

// Contact page component
// TODO: make the form a component
export default function Form() {
    const [isLoading, setIsLoading] = useState(false);

    // State to hold form data
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    });

    // Function to handle input changes in form
    function handleChange(e) {
        const { value, name } = e.target;
        setForm((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    }

    // Function to handle form submission
    function handleOnSubmit(e) {
        e.preventDefault();

        setIsLoading(true);

        // Send form data to server
        fetch('api/form', {
            method: 'POST',
            body: JSON.stringify(form),
        });

        // Reset form data after submission
        setForm({
            name: '',
            email: '',
            message: '',
        });
        setIsLoading(false);
    }

    return (
        <form
            onSubmit={handleOnSubmit}
            className=' mx-auto mt-4 flex w-full flex-col gap-6 text-left sm:w-[36rem] md:px-8'
            method='post'
        >
            <input
                required={true}
                placeholder='Enter your full name'
                type='text'
                name='name'
                value={form.name || ''}
                onChange={handleChange}
                className='block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm  text-white placeholder-gray-400 focus:border-indigo-600 focus:ring-indigo-600'
            />
            <input
                required={true}
                placeholder='Enter your email address'
                type='email'
                name='email'
                value={form.email || ''}
                onChange={handleChange}
                className='block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm  text-white placeholder-gray-400 focus:border-indigo-600 focus:ring-indigo-600'
            />

            <textarea
                required={true}
                placeholder='Leave a message'
                name='message'
                value={form.message || ''}
                onChange={handleChange}
                className='block h-fit w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-indigo-600 focus:ring-indigo-600'
            />

            <button className='w-full cursor-pointer rounded-lg bg-indigo-600 py-3 text-sm font-bold text-white hover:bg-indigo-900 md:w-full md:text-base'>
                {isLoading ? (
                    <div className='flex justify-center'>
                        <svg
                            className='mr-2 h-5 w-5 animate-spin text-white'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <circle
                                className='opacity-25'
                                cx='12'
                                cy='12'
                                r='10'
                                stroke='currentColor'
                                stroke-width='4'
                            ></circle>
                            <path
                                className='opacity-75'
                                fill='currentColor'
                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                            ></path>
                        </svg>
                        <span>Sending...</span>
                    </div>
                ) : (
                    <div className='flex items-center justify-center'>
                        <FontAwesomeIcon className='mr-2' icon={faPaperPlane} />
                        <span>Send</span>
                    </div>
                )}
            </button>
        </form>
    );
}
