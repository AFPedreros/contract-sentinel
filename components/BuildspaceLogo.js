import Image from "next/image";
import buildspaceLogo from "../assets/buildspace-logo.png";

export default function BuildspaceLogo() {
    return (
        <div className="badge-container grow">
            <a
                href="https://buildspace.so/nights-and-weekends"
                target="_blank"
                rel="noreferrer"
            >
                <div className="badge">
                    <Image src={buildspaceLogo} alt="buildspace logo" />
                    <p>N&W S2</p>
                </div>
            </a>
        </div>
    );
}
