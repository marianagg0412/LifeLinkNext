
import {
    ChevronDownIcon,
  } from '@heroicons/react/20/solid'
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { tw } from 'twind'
import { BriefcaseMedical, Calendar, ClipboardPlus, DollarSign, Home, PackagePlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
  
interface CHeaderProps {
  categories: string[];
  prices: number[];
  specialties: string[];
}

export default function CHeader ({ categories, prices, specialties }: CHeaderProps) {

    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

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
                <div className={tw`mt-2 flex items-center text-sm gap-2 text-[#F67227]`}>
            <BriefcaseMedical />
            <Menu as="div" className={tw`relative inline-block text-left`}>
              <MenuButton className={tw`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 z-50`}>
                Categoria
                <ChevronDownIcon className={tw`-mr-1 ml-2 h-5 w-5`} aria-hidden="true" />
              </MenuButton>
              <MenuItems className={tw`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                {categories.map((category) => (
                  <MenuItem key={category}>
                    {({ active }) => (
                      <a
                        href="#"
                        className={tw`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
                      >
                        {category}
                      </a>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
          <div className={tw`mt-2 flex items-center text-sm gap-2 text-[#F67227]`}>
            <ClipboardPlus />
            <Menu as="div" className={tw`relative inline-block text-left`}>
              <MenuButton className={tw`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50`}>
                Especialidad
                <ChevronDownIcon className={tw`-mr-1 ml-2 h-5 w-5`} aria-hidden="true" />
              </MenuButton>
              <MenuItems className={tw`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50`}>
                {specialties.map((specialty) => (
                  <MenuItem key={specialty}>
                    {({ active }) => (
                      <a
                        href="#"
                        className={tw`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
                      >
                        {specialty}
                      </a>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
          <div className={tw`mt-2 flex items-center text-sm  gap-2 text-[#F67227]`}>
            <DollarSign />
            <Menu as="div" className={tw`relative inline-block text-left`}>
              <MenuButton className={tw`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50`}>
                Precios
                <ChevronDownIcon className={tw`-mr-1 ml-2 h-5 w-5`} aria-hidden="true" />
              </MenuButton>
              <MenuItems className={tw`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50`}>
                {prices.sort((a,b) => a - b).map((price) => (
                  <MenuItem key={price}>
                    {({ active }) => (
                      <a
                        href="#"
                        className={tw`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
                      >
                        ${price}
                      </a>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
                  <div className={tw`mt-2 flex items-center text-sm gap-2 text-[#F67227]`}>
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