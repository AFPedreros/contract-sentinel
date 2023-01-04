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
            <div className="h-[30rem] bg-slate-100 px-6 text-center w-full"></div>
            <div className="my-20 px-6 md:px-0 mx-auto text-center">
                <h1 className="text-2xl font-semibold   ">
                    Chat with us or give us some feedback
                </h1>
                <p
                    className="cursor-pointer my-6 border-b border-[#3c3c57] w-fit mx-auto"
                    onClick={sendEmail}
                >
                    Send us an email
                </p>
                {/* <form
                    onSubmit={handleOnSubmit}
                    className="md:w-1/3 w-full mt-10 flex flex-col gap-6 text-left mx-auto"
                    method="post"
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name || ""}
                            onChange={handleChange}
                            className="w-full rounded p-4 h-10 focus:border focus:outline-none
                        focus:border-[#00B8EE] bg-[#232938]"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email || ""}
                            onChange={handleChange}
                            className="w-full rounded p-4 h-10 focus:border focus:outline-none
                        focus:border-[#00B8EE] bg-[#232938]"
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
                            className="w-full rounded p-4 h-32 focus:border focus:outline-none
                        focus:border-[#00B8EE] resize-none bg-[#232938]"
                        />
                    </div>
                    <button
                        className="bg-[#00B8EE] text-md rounded-full w-fit px-6 py-2 text-white
                    font-regular tracking-wide cursor-pointer hover:bg-[#017295]"
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
