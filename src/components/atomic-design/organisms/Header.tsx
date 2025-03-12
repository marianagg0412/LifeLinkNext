import { tw } from "twind";
import Logo from "../molecules/atoms/Logo";
import NButton from "../molecules/atoms/buttons/NormalB";
import { useRouter } from "next/router";
import HeaderW from "../molecules/atoms/HeaderWords";


export default function Header(){
    const router = useRouter();
    return (
        <header>
            <nav className={tw`bg-[#F04639] border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 w-full text-[#FBFAE6]`}>
                <div className={tw`flex flex-wrap justify-between items-center mx-auto max-w-screen-xl`}>
                    <Logo/>
                    <div className={tw`flex items-center lg:order-2`}>
                        <button data-collapse-toggle="mobile-menu-2" type="button" className={`inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`} aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className={tw`sr-only`}>Open main menu</span>
                            <svg className={tw`w-6 h-6`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                            <svg className={tw`hidden w-6 h-6`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className={tw`hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu-2">
                        <ul className={tw`flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0`}>
                            <li>
                                <a href="/main" className={tw`block py-2 pr-4 pl-3 text-[#FFBCBB] rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white`} aria-current="page">Home</a>
                            </li>
                            <HeaderW href="/catalogo" label="Catálogo"/>
                            <HeaderW href="/somos" label="Quienes Somos"/>
                            <HeaderW href="/testimonios" label="Testimonios"/>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}