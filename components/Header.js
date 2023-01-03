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
            className="top-0 px-6 py-6 flex justify-between mx-auto
        z-20 items-center md:py-10 md:px-20"
        >
            <Link className="text-xl md:text-2xl hover:text-cyan-500" href="/">
                Contract Sentinel
            </Link>
            <div className="hidden md:gap-10 md:flex">
                <Link
                    className="border-b border-[#101727] hover:text-[#00B8EE] hover:border-solid
                    hover:border-b hover:border-[#00B8EE]"
                    href="/sentinel"
                >
                    The Sentinel
                </Link>
                <Link
                    className="border-b border-[#101727] hover:text-[#00B8EE] hover:border-solid
                    hover:border-b hover:border-[#00B8EE]"
                    href="/about"
                >
                    About
                </Link>
                <Link
                    className="border-b border-[#101727] hover:text-[#00B8EE] hover:border-solid
                    hover:border-b hover:border-[#00B8EE]"
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
                h-screen w-full bg-[#101727]"
                >
                    <Link
                        className="border-b text-xl py-4 border-[#101727] hover:text-[#00B8EE]"
                        href="/sentinel"
                        onClick={toggleMenu}
                    >
                        The Sentinel
                    </Link>
                    <Link
                        className="border-b text-xl py-4 border-[#101727] hover:text-[#00B8EE]"
                        href="/about"
                        onClick={toggleMenu}
                    >
                        About
                    </Link>
                    <Link
                        className="border-b text-xl py-4 border-[#101727] hover:text-[#00B8EE]"
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
