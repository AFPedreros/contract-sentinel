import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import Head from "next/head";
import Header from "../components/Header";
import BuildspaceLogo from "../components/BuildspaceLogo";

// Contact page component
// TODO: make the form a component
export default function Contact() {
    const [isLoading, setIsLoading] = useState(false);

    // State to hold form data
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
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
        fetch("api/form", {
            method: "POST",
            body: JSON.stringify(form),
        });

        // Reset form data after submission
        setForm({
            name: "",
            email: "",
            message: "",
        });
        setIsLoading(false);
    }

    return (
        <div className="text-[#3c3c57]">
            <Head>
                <title>Contract Sentinel</title>
            </Head>
            <Header />
            <div className="h-[30rem] bg-slate-100 px-6 text-center w-full flex items-center">
                <div className="flex flex-col w-full items-center justify-center md:w-1/2 mx-auto">
                    <h1 className="text-4xl font-bold  md:text-5xl">
                        Help us in our mission to secure the future of web3!
                    </h1>
                </div>
            </div>
            <div className="my-20 px-0 mx-6 md:mx-auto text-center">
                <h1 className="text-2xl font-semibold   ">
                    Get in touch and give us some feedback
                </h1>
                <form
                    onSubmit={handleOnSubmit}
                    className="md:w-1/3 w-full mt-4 flex flex-col md:px-8 gap-6 text-left mx-auto"
                    method="post"
                >
                    <div className="flex flex-col gap-2">
                        <input
                            required={true}
                            placeholder="Enter your full name"
                            type="text"
                            name="name"
                            value={form.name || ""}
                            onChange={handleChange}
                            className="w-full rounded px-2 py-4 h-10 bg-slate-100 border border-slate-300
                            focus:border-slate-500 focus:border outline-none"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <input
                            required={true}
                            placeholder="Enter your email address"
                            type="email"
                            name="email"
                            value={form.email || ""}
                            onChange={handleChange}
                            className="w-full rounded px-2 py-4 h-10 bg-slate-100 border border-slate-300
                            focus:border-slate-500 focus:border outline-none"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <textarea
                            required={true}
                            placeholder="Leave a message"
                            name="message"
                            value={form.message || ""}
                            onChange={handleChange}
                            className="w-full rounded px-2 py-2 h-48 bg-slate-100 border border-slate-300
                            focus:border-slate-500 focus:border outline-none"
                        />
                    </div>
                    <button
                        className="cursor-pointer mx-auto bg-[#4f5fe4] uppercase text-sm rounded-lg w-full md:w-fit px-10 py-3 text-white
                        font-semibold tracking-wide md:text-ml hover:bg-[#3645ca] shadow-md"
                    >
                        {isLoading ? (
                            <div className="flex justify-center">
                                <svg
                                    class="h-5 mr-2 w-5 animate-spin text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                <span>Sending...</span>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center">
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={faPaperPlane}
                                />
                                <span>Send</span>
                            </div>
                        )}
                    </button>
                </form>
            </div>
            <BuildspaceLogo />
        </div>
    );
}
