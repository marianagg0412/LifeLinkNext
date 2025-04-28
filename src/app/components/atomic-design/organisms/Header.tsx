import Logo from "../atoms/Logo";
import { useRouter } from "next/navigation";
import HeaderW from "../atoms/HeaderWords";


export default function Header() {
    const router = useRouter();
    return (
        <header>
            <nav className={`bg-[#F04639] border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 w-full text-[#FBFAE6]`}>
                <div className={`flex flex-wrap justify-between items-center w-full px-4`}>
                    <Logo />
                    <div className={`flex items-center lg:order-2`}>
                        <button data-collapse-toggle="mobile-menu-2" type="button" className={`inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
                            aria-controls="mobile-menu-2" aria-expanded="false" onClick={() => console.log("click")}>
                            <span className={`sr-only`}>Open main menu</span>
                            <svg className={`w-6 h-6`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className={`hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu-2">
                        <ul className={`flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0`}>
                            <li>
                                <a href="/" className={`block py-2 pr-4 pl-3 text-[#FFBCBB] rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white`} aria-current="page">Home</a>
                            </li>
                            <HeaderW href="/catalogo" label="Catálogo" />
                            <HeaderW href="/somos" label="Quienes Somos" />
                            <HeaderW href="/testimonios" label="Testimonios" />
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}