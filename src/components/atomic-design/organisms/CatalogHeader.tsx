
import {
    BriefcaseIcon,
    CalendarIcon,
    CheckIcon,
    ChevronDownIcon,
    CurrencyDollarIcon,
    LinkIcon,
    MapPinIcon,
    PencilIcon,
  } from '@heroicons/react/20/solid'
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { tw } from 'twind'
import { BriefcaseMedical, Calendar, ClipboardPlus, Currency, DollarSign, Home, PackagePlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
  
export default function CHeader () {

    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      const checkAdminStatus = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) return;
  
          const decodedToken = JSON.parse(atob(token.split(".")[1])); 
          setIsAdmin(decodedToken.rol.includes("admin")); 
        } catch (error) {
          console.error("Error checking admin status:", error);
        }
      };
  
      checkAdminStatus();
    }, []);
    

    
        return (
            <div className={tw`lg:flex lg:items-center lg:justify-between mt-10 p-5`}>
              <div className={tw`min-w-0 flex-1`}>
                <h3 className={tw`text-2xl/7 font-lilita text-[#587032] sm:truncate sm:text-3xl sm:tracking-tight mb-2`} style={{ fontFamily: '"Lilita One"' }}>
                  Catalogo de Organos
                </h3>
                <div className={tw`mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 text-[#F67227]`}>
                  <div className={tw`mt-2 flex items-center text-sm text-gray-500 gap-2 text-[#F67227]`}>
                    <BriefcaseMedical/>
                    Categoria
                  </div>
                  <div className={tw`mt-2 flex items-center text-sm text-gray-500 gap-2 text-[#F67227]`}>
                    <ClipboardPlus/>
                    Especialidad
                  </div>
                  <div className={tw`mt-2 flex items-center text-sm text-gray-500 gap-2 text-[#F67227]`}>
                    <DollarSign/>
                    Precios
                  </div>
                  <div className={tw`mt-2 flex items-center text-sm text-gray-500 gap-2 text-[#F67227]`}>
                    <Calendar/>
                    Mas recientes
                  </div>
                </div>
              </div>
              <div className={tw`mt-5 flex lg:mt-0 lg:ml-4`}>
        
                <span className={tw`ml-3 hidden sm:block`}>
                  <button
                    type="button"
                    onClick={() => router.push('/main')}
                    className={tw`inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#587032] ring-1 shadow-xs ring-gray-300 ring-inset hover:text-[#F04639] gap-2`}
                  >
                    <Home/>
                    
                  </button>
                </span>

                {isAdmin &&(

                    <span className={tw`sm:ml-3 `}>
                    <button
                      onClick={() => router.push('/create-product')}
                      type="button"
                      className={tw`gap-2 inline-flex items-center rounded-md bg-[#E764A5] px-3 py-2 text-sm font-semibold text-[#FFBCBB] shadow-xs hover:bg-[#FFBCBB] hover:text-[#E764A5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    >
                      <PackagePlus/>
                      Agregar Producto
                    </button>
                    </span>

                )}
        
                
        
                {/* Dropdown */}
                <Menu as="div" className={tw`relative ml-3 sm:hidden`}>
                  <MenuButton className={tw`inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:ring-gray-400`}>
                    More
                    <ChevronDownIcon aria-hidden="true" className={tw`-mr-1 ml-1.5 size-5 text-gray-400`} />
                  </MenuButton>
        
                  <MenuItems
                    transition
                    className={tw`absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in`}
                  >
                    <MenuItem>
                      <a
                        href="#"
                        className={tw`block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden`}
                      >
                        Edit
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className={tw`block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden`}
                      >
                        View
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
    )
}