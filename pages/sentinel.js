import Head from 'next/head';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import contractSentinelLogo from '../assets/logo-blanco.png';

import mixpanel from 'mixpanel-browser';

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN);

// Audit smart contracts component
export default function Home() {
    // State variables for user input, vulnerability output, vulnerabilities, recommendations, and loading state
    const [userInput, setUserInput] = useState('');
    const [vulnerabilityOutput, setVulnerabilityOutput] = useState('');

    const [vulnerabilities, setVulnerabilities] = useState('');
    const [recommendations, setRecommendations] = useState('');
    const [tab, setTab] = useState(0);

    const [isGenerating, setIsGenerating] = useState(false);
    const [isSmartContract, setIsSmartContract] = useState(false);

    // Function to call the API to check for vulnerabilities
    async function checkVulnerabilities() {
        // Reset recommendations and set loading state
        setRecommendations('');
        setIsGenerating(true);

        console.log('Calling OpenAI...');
        const response = await fetch('/api/generateVulnerabilities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput }),
        });

        const data = await response.json();
        const { output } = data;

        if (!output.text.includes('error')) {
            setIsSmartContract(
                output.text.toLowerCase().includes('vulnerability')
            );
            setVulnerabilityOutput(output.text);

            const linesArray = format(output.text);
            const vulnerabilities = linesArray.filter(
                (x) => x !== '' && x !== ' '
            );
            const vulElement = vulnerabilities.map((vul, index) => {
                return (
                    <p key={index} className='mt-4'>
                        {vul}
                    </p>
                );
            });
            setVulnerabilities(vulElement);
        } else {
            setVulnerabilities(
                "We're experiencing exceptionally high demand. Please hang tight as we work on scaling our systems."
            );
        }
        setTab(0);
        setIsGenerating(false);
        mixpanel.track('Button Clicked');
    }

    // Function to call the API to check for recommendations
    async function checkRecommendations() {
        setIsGenerating(true);
        const input = `${userInput}
        ${vulnerabilityOutput}
        `;

        console.log('Calling OpenAI...');
        const response = await fetch('/api/generateRecommendations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input }),
        });

        const data = await response.json();
        const { output } = data;

        if (!output.text.includes('error')) {
            const linesArray = format(output.text);
            const recommendations = linesArray.filter(
                (x) => x !== '' && x !== ' '
            );
            const recElement = recommendations.map((rec, index) => {
                return (
                    <p key={index} className='mt-2'>
                        {rec}
                    </p>
                );
            });

            setRecommendations(recElement);
        } else {
            setRecommendations(
                "We're experiencing exceptionally high demand. Please hang tight as we work on scaling our systems."
            );
        }
        setTab(1);
        setIsGenerating(false);
        mixpanel.track('Check Recommendations Clicked');
    }

    // Function to handle changes to the user input
    function onUserChangedText(e) {
        setUserInput(e.target.value);
    }

    // Function to format a string into an array of lines
    function format(formatString) {
        const array = [];

        // Split the string into lines and add each line to the array
        formatString.split('\n').forEach((line) => {
            array.push(line);
        });

        return array;
    }

    return (
        <div className='relative h-screen overflow-hidden bg-my_bg_image bg-cover text-white'>
            <Head>
                <title>Contract Sentinel</title>
            </Head>
            <nav className='absolute top-0 left-0 z-20 w-full bg-transparent px-2 py-2.5 backdrop-blur-lg sm:px-4'>
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
            </nav>
            <div className='h-full text-white md:flex'>
                <div className='relative h-full md:w-1/2'>
                    <textarea
                        placeholder='Paste your Smart Contract'
                        className='h-full w-full resize-none border-none bg-transparent px-4 pt-20 pb-14 scrollbar  scrollbar-track-transparent scrollbar-thumb-[#7285a0] focus:outline-none'
                        value={userInput}
                        onChange={onUserChangedText}
                    />
                    {isSmartContract ? (
                        <div className='absolute bottom-0 left-0 flex w-full gap-[0.125rem]'>
                            <button
                                className={`${
                                    isGenerating
                                        ? 'cursor-wait'
                                        : 'cursor-pointer'
                                }  md:text-ml w-1/2 rounded-tl-lg bg-indigo-600 px-4 py-4 text-start font-semibold hover:bg-indigo-900`}
                                onClick={checkVulnerabilities}
                                disabled={isGenerating}
                            >
                                {isGenerating ? (
                                    <div className='flex text-gray-800'>
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
                                                strokeWidth='4'
                                            ></circle>
                                            <path
                                                className='opacity-75'
                                                fill='currentColor'
                                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                            ></path>
                                        </svg>
                                        <span>Generating...</span>
                                    </div>
                                ) : (
                                    'Find Vulnerabilities'
                                )}
                            </button>
                            <button
                                className={`${
                                    isGenerating
                                        ? 'cursor-wait'
                                        : 'cursor-pointer'
                                } md:text-ml w-1/2 rounded-tr-lg bg-indigo-600 px-4 py-4 text-start font-semibold tracking-wide hover:bg-indigo-900`}
                                onClick={checkRecommendations}
                                disabled={isGenerating}
                            >
                                {isGenerating ? (
                                    <div className='flex text-gray-800'>
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
                                                strokeWidth='4'
                                            ></circle>
                                            <path
                                                className='opacity-75'
                                                fill='currentColor'
                                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                            ></path>
                                        </svg>
                                        <span>Generating...</span>
                                    </div>
                                ) : (
                                    'Get Code Suggestions'
                                )}
                            </button>
                        </div>
                    ) : (
                        <button
                            className={`${
                                isGenerating ? 'cursor-wait' : ' cursor-pointer'
                            } md:text-ml absolute bottom-0 left-0 w-full rounded-t-lg bg-indigo-600 px-4 py-4 text-start font-semibold hover:bg-indigo-900`}
                            onClick={checkVulnerabilities}
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <div className='flex text-gray-800'>
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
                                            strokeWidth='4'
                                        ></circle>
                                        <path
                                            className='opacity-75'
                                            fill='currentColor'
                                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                        ></path>
                                    </svg>
                                    <span>Generating...</span>
                                </div>
                            ) : (
                                'Find Vulnerabilities'
                            )}
                        </button>
                    )}
                </div>
                <div className='border-l border-gray-700 pt-4 md:w-1/2 md:pt-0'>
                    {vulnerabilities && (
                        <div className='relative mx-6 h-[80%] rounded-lg shadow-xl md:mx-auto md:mt-24 md:w-4/5 md:py-2'>
                            <div className='absolute top-0 left-0 flex w-full gap-4 rounded-t-lg p-4 text-white backdrop-blur-lg'>
                                <label
                                    className={`cursor-pointer font-bold ${
                                        tab === 0
                                            ? 'text-indigo-600'
                                            : 'text-gray-800'
                                    }`}
                                    onClick={() => {
                                        setTab(0);
                                    }}
                                >
                                    Vulnerabilities
                                </label>
                                {recommendations && (
                                    <label
                                        className={`cursor-pointer font-bold ${
                                            tab === 1
                                                ? 'text-indigo-600'
                                                : 'text-gray-800'
                                        }`}
                                        onClick={() => {
                                            setTab(1);
                                        }}
                                    >
                                        Code suggestions
                                    </label>
                                )}
                            </div>
                            <div className='h-full overflow-y-auto scrollbar scrollbar-track-transparent scrollbar-thumb-[#787f89] md:px-4 md:py-8'>
                                <h3 className='mt-8 text-xl font-semibold'>
                                    {tab === 0
                                        ? 'Possible vulnerabilities'
                                        : 'Recommendations'}
                                </h3>

                                {tab === 0 ? vulnerabilities : recommendations}
                            </div>
                        </div>
                    )}
                    {vulnerabilities && (
                        <div className='h-full overflow-y-auto scrollbar scrollbar-track-transparent scrollbar-thumb-[#787f89] md:p-8'>
                            <h3 className='mt-8 text-xl font-semibold'>
                                Possible vulnerabilities
                            </h3>

                            {vulnerabilities}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
