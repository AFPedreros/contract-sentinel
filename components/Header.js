import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

// Header component
export default function Header() {
    const SocialLoginDynamic = dynamic(
        () => import("./Auth").then((res) => res.default),
        {
            ssr: false,
        }
    );

    useEffect(() => {
        console.log("re-render");
    }, []);
    // Toggle state for mobile menu
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Function to toggle mobile menu
    function toggleMobileMenu() {
        setMobileMenuOpen((prev) => !prev);
        const overflow = mobileMenuOpen ? "visible" : "hidden";
        document.body.style.overflow = overflow;
    }

    return (
        <header
            className="w-full px-6 py-6 flex items-center justify-between my-0 mx-auto
        z-20 md:h-16 md:px-56"
        >
            <Link className="text-xl font-bold" href="/">
                Contract Sentinel
            </Link>

            <div className="hidden items-center  md:gap-10 md:flex">
                <Link
                    className="font-bold hover:text-[#4f5fe4]"
                    href="/sentinel"
                >
                    Sentinel
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
                {/* <Suspense fallback={<div>Loading...</div>}>
                    <SocialLoginDynamic />
                </Suspense> */}
            </div>
            <button onClick={toggleMobileMenu} className="block md:hidden">
                {mobileMenuOpen ? (
                    <FontAwesomeIcon icon={faX} size="xl" />
                ) : (
                    <FontAwesomeIcon icon={faBars} size="xl" />
                )}
            </button>

            {mobileMenuOpen ? (
                <div
                    className="md:hidden items-center absolute flex flex-col top-0 mt-16 right-0
                h-screen w-full bg-[#fff]"
                >
                    <Link
                        className="font-bold text-xl py-4 hover:text-[#4f5fe4]"
                        href="/sentinel"
                        onClick={toggleMobileMenu}
                    >
                        Sentinel
                    </Link>
                    <Link
                        className="font-bold text-xl py-4 hover:text-[#4f5fe4]"
                        href="/about"
                        onClick={toggleMobileMenu}
                    >
                        About
                    </Link>
                    <Link
                        className="font-bold text-xl py-4 hover:text-[#4f5fe4]"
                        href="/contact"
                        onClick={toggleMobileMenu}
                    >
                        Contact
                    </Link>
                    {/* <Suspense fallback={<div>Loading...</div>}>
                        <SocialLoginDynamic />
                    </Suspense> */}
                </div>
            ) : (
                <></>
            )}
        </header>
    );
}
