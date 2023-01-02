import Head from "next/head";
import Header from "../components/Header";
import BuildspaceLogo from "../components/BuildspaceLogo";
const Contact = () => {
    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log("Clicked");
    };

    return (
        <div className="text-white">
            <Head>
                <title>Contract Sentinel</title>
            </Head>
            <Header />
            <div className="mt-10 mx-auto md:mt-16 text-center">
                <h1 className="text-2xl font-semibold mb-2   ">
                    Contact with us or give us some feedback
                </h1>
                <form
                    onSubmit={handleOnSubmit}
                    className="w-1/3 mt-10 flex flex-col gap-6 text-left mx-auto"
                    method="post"
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full rounded p-4 h-10 focus:border focus:outline-none
                        focus:border-[#00B8EE] bg-[#232938]"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full rounded p-4 h-10 focus:border focus:outline-none
                        focus:border-[#00B8EE] bg-[#232938]"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Message*</label>
                        <textarea
                            required={true}
                            placeholder="Message"
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
                </form>
            </div>
            <BuildspaceLogo />
        </div>
    );
};

export default Contact;
