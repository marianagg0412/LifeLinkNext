import Image from "next/image";

export default function Logo() {
    return (
        <a href="/" className={`flex items-center`}>
            <img src="logo-transparent.png" alt="logo" className={`w-10 h-10`}/>
            <span className={`self-center text-xl font-semibold whitespace-nowrap dark:text-white`}>LifeLink</span>
        </a>
    );
};