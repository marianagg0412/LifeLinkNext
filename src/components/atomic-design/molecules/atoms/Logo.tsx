import Image from "next/image";
import { tw } from "twind";


export default function Logo() {
    return (
        <a href="/" className={tw`flex items-center`}>
            <img src="logo-transparent.png" alt="logo" className={tw`w-10 h-10`}/>
            <span className={tw`self-center text-xl font-semibold whitespace-nowrap dark:text-white`}>LifeLink</span>
        </a>
    );
};