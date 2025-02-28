import { tw } from "twind";


export default function HeaderW({ href, label }: { href: string; label: string }) {
    return(
        <li>
            <a 
                href={href} 
                className={tw`block py-2 pr-4 pl-3 text-[#FBFAE6] border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}>
                {label}
            </a>
        </li>
    )
}