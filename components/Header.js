import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [toggle, setToggle] = useState(false);

    const toggleMenu = () => {
        setToggle((prev) => !prev);
        const overflow = toggle ? "visible" : "hidden";
        document.body.style.overflow = overflow;
    };

    return (
        <header
            className="w-full px-6 py-6 flex justify-between mx-auto
        z-20 items-center md:py-6 md:px-52"
        >
            <Link className="text-xl font-bold" href="/">
                Contract Sentinel
            </Link>
            <div className="hidden md:gap-10 md:flex">
                <Link
                    className="font-bold hover:text-[#4f5fe4]"
                    href="/sentinel"
                >
                    The Sentinel
                </Link>
                <Link className="font-bold hover:text-[#4f5fe4]" href="/about">
                    About
                </Link>
                <Link
                    className="font-bold hover:text-[#4f5fe4]"
                    href="/contact"
                >
                    Contact
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
                <div
                    className="md:hidden text-center absolute flex flex-col top-0 mt-16 right-0
                h-screen w-full bg-[#fff]"
                >
                    <Link
                        className="font-bold text-xl py-4 hover:text-[#4f5fe4]"
                        href="/sentinel"
                        onClick={toggleMenu}
                    >
                        The Sentinel
                    </Link>
                    <Link
                        className="font-bold text-xl py-4 hover:text-[#4f5fe4]"
                        href="/about"
                        onClick={toggleMenu}
                    >
                        About
                    </Link>
                    <Link
                        className="font-bold text-xl py-4 hover:text-[#4f5fe4]"
                        href="/contact"
                        onClick={toggleMenu}
                    >
                        Contact
                    </Link>
                </div>
            ) : (
                <></>
            )}
        </header>
    );
};

export default Header;
