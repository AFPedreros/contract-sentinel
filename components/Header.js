import Link from "next/link";

const Header = () => {
    return (
        <header
            className=" sticky top-0 py-10 flex items-start justify-between max-w-4xl mx-auto
        z-20 xl:items-center"
        >
            <Link href="/">Contract Sentinel</Link>
            <div className=" flex gap-10">
                <Link href="/audit-contract">Audit</Link>
                <Link href="/contact-us">Contact</Link>
                <Link href="/about-us">About</Link>
            </div>
        </header>
    );
};

export default Header;
