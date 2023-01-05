import { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import BuildspaceLogo from "../components/BuildspaceLogo";
const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const sendEmail = () => {
        window.open("mailto:felipe.pedreros94@gmail.com");
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setForm((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        fetch("api/form", {
            method: "POST",
            body: JSON.stringify(form),
        });

        setForm({
            name: "",
            email: "",
            message: "",
        });
    };

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
            <div className="my-20 px-6 md:px-0 mx-auto text-center">
                <h1 className="text-2xl font-semibold   ">
                    Chat with us or give us some feedback
                </h1>
                <p
                    className="mx-auto cursor-pointer bg-[#4f5fe4] uppercase text-sm rounded-lg w-fit mt-4 px-10 py-3 text-white
                    font-semibold tracking-wide md:text-ml hover:bg-[#3645ca] shadow-md"
                    onClick={sendEmail}
                >
                    Send us an email
                </p>
                {/* <form
                    onSubmit={handleOnSubmit}
                    className="md:w-2/5 w-full mt-10 flex flex-col p-8 gap-6 text-left mx-auto bg-slate-100 shadow-md"
                    method="post"
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name || ""}
                            onChange={handleChange}
                            className="w-full rounded p-4 h-10 bg-white"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email || ""}
                            onChange={handleChange}
                            className="w-full rounded p-4 h-10 bg-white"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Message*</label>
                        <textarea
                            required={true}
                            placeholder="Message"
                            name="message"
                            value={form.message || ""}
                            onChange={handleChange}
                            className="w-full rounded p-4 h-32 resize-none bg-white"
                        />
                    </div>
                    <button
                        className="cursor-pointer bg-[#4f5fe4] uppercase text-sm rounded-lg w-full px-10 py-3 text-white
                        font-semibold tracking-wide md:text-ml hover:bg-[#3645ca] shadow-md"
                    >
                        Submit
                    </button>
                </form> */}
            </div>
            <BuildspaceLogo />
        </div>
    );
};

export default Contact;
