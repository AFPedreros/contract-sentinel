import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [toggle, setToggle] = useState(false);

    const toggleMenu = () => {
        setToggle((prev) => !prev);
    };

    return (
        <header
            className="sticky top-0 py-10 px-6 flex justify-between max-w-4xl mx-auto
        z-20 items-center"
        >
            <Link className="font-bold hover:text-cyan-500" href="/">
                Contract Sentinel
            </Link>
            <div className="hidden md:gap-10 md:flex">
                <Link
                    className="border-b border-white hover:text-cyan-500 hover:border-solid
                    hover:border-b hover:border-cyan-500"
                    href="/audit-contract"
                >
                    Audit
                </Link>
                <Link
                    className="border-b border-white hover:text-cyan-500 hover:border-solid
                    hover:border-b hover:border-cyan-500"
                    href="/contact-us"
                >
                    Contact
                </Link>
                <Link
                    className="border-b border-white hover:text-cyan-500 hover:border-solid
                    hover:border-b hover:border-cyan-500"
                    href="/about-us"
                >
                    About
                </Link>
            </div>
            <button onClick={toggleMenu} className="block md:hidden">
                {toggle ? (
                    <FontAwesomeIcon icon={faX} size="xl" />
                ) : (
                    <FontAwesomeIcon icon={faBars} size="xl" />
                )}
            </button>
            {toggle ? (
                <div className="md:hidden text-center absolute flex flex-col top-20 right-0 h-screen w-full bg-white">
                    <Link
                        className="border-b border-white hover:text-cyan-500"
                        href="/audit-contract"
                    >
                        Audit
                    </Link>
                    <Link
                        className="border-b border-white hover:text-cyan-500"
                        href="/contact-us"
                    >
                        Contact
                    </Link>
                    <Link
                        className="border-b border-white hover:text-cyan-500"
                        href="/about-us"
                    >
                        About
                    </Link>
                </div>
            ) : (
                <></>
            )}
        </header>
    );
};

export default Header;
