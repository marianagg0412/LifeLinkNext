import {
  ChevronDownIcon,
} from '@heroicons/react/20/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { BriefcaseMedical, ClipboardPlus, DollarSign, Home, PackagePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lilita_One } from 'next/font/google';

const lilita = Lilita_One({
  subsets: ['latin'],
  weight: '400',
});

interface CHeaderProps {
  categories: string[];
  prices: number[];
  specialties: string[];
  onFilterChange: (filterType: FilterType, value: string | number) => void;
  filters: { [key in FilterType]: (string | number)[] }; 
  onClearFilters: () => void;
}
type FilterType = 'category' | 'use' | 'specialty' | 'price';

export default function CHeader({ categories, prices, specialties, onFilterChange, filters, onClearFilters}: CHeaderProps) {
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
    <div className={`lg:flex lg:items-center lg:justify-between mt-10 p-5`}>
      <div className={`min-w-0 flex-1`}>
        <h3 className={`${lilita.className} font-bold text-2xl/7 text-[#587032] sm:truncate sm:text-3xl sm:tracking-tight mb-2`}>
          Catálogo de Órganos
        </h3>
        <div className={`mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 text-[#F67227]`}>
          <div className={`mt-2 flex items-center text-sm text-gray-500 gap-2`}>
            <BriefcaseMedical />
            <Menu as="div" className={`relative inline-block text-left`}>
              <MenuButton className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50`}>
                Categoría
                <ChevronDownIcon className={`-mr-1 ml-2 h-5 w-5`} aria-hidden="true" />
              </MenuButton>
              <MenuItems className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50`}>
                {categories.map((category) => (
                  <MenuItem key={category}>
                    {({ active }) => (
                      <label className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}>
                        <input
                          type="checkbox"
                          className={`mr-2 `}
                          checked={filters.category.includes(category)}
                          onChange={() => onFilterChange('category', category)}
                        />
                        {category}
                      </label>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
          <div className={`mt-2 flex items-center text-sm text-gray-500 gap-2`}>
            <ClipboardPlus />
            <Menu as="div" className={`relative inline-block text-left`}>
              <MenuButton className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50`}>
                Especialidad
                <ChevronDownIcon className={`-mr-1 ml-2 h-5 w-5`} aria-hidden="true" />
              </MenuButton>
              <MenuItems className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50`}>
                {specialties.map((specialty) => (
                  <MenuItem key={specialty}>
                    {({ active }) => (
                      <label className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}>
                        <input
                          type="checkbox"
                          className={`mr-2`}
                          checked={filters.specialty.includes(specialty)}
                          onChange={() => onFilterChange('specialty', specialty)}
                        />
                        {specialty}
                      </label>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
          <div className={`mt-2 flex items-center text-sm text-gray-500 gap-2`}>
            <DollarSign />
            <Menu as="div" className={`relative inline-block text-left`}>
              <MenuButton className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50`}>
                Precios
                <ChevronDownIcon className={`-mr-1 ml-2 h-5 w-5`} aria-hidden="true" />
              </MenuButton>
              <MenuItems className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50`}>
                {prices.sort((a, b) => a - b).map((price) => (
                  <MenuItem key={price}>
                    {({ active }) => (
                      <label className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}>
                        <input
                          type="checkbox"
                          className={`mr-2`}
                          checked={filters.price.includes(price)}
                          onChange={() => onFilterChange('price', price)}
                        />
                        ${price}
                      </label>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
          <div className={`mt-2 flex items-center text-sm text-gray-500 gap-2`}>
            <button
              type="button"
              onClick={onClearFilters}
              className={`inline-flex items-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-700`}
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
      <div className={`mt-5 flex lg:mt-0 lg:ml-4`}>
        <span className={`ml-3 hidden sm:block`}>
          <button
            type="button"
            onClick={() => router.push('/')}
            className={`inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#587032] ring-1 shadow-xs ring-gray-300 ring-inset hover:text-[#F04639] gap-2`}
          >
            <Home />
          </button>
        </span>
        {isAdmin && (
          <span className={`sm:ml-3`}>
            <button
              onClick={() => router.push('/create-product')}
              type="button"
              className={`gap-2 inline-flex items-center rounded-md bg-[#E764A5] px-3 py-2 text-sm font-semibold text-[#FFBCBB] shadow-xs hover:bg-[#FFBCBB] hover:text-[#E764A5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
              <PackagePlus />
              Agregar Producto
            </button>
          </span>
        )}
        <Menu as="div" className={`relative ml-3 sm:hidden`}>
          <MenuButton className={`inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:ring-gray-400`}>
            More
            <ChevronDownIcon aria-hidden="true" className={`-mr-1 ml-1.5 size-5 text-gray-400`} />
          </MenuButton>
          <MenuItems
            transition
            className={`absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in`}
          >
            <MenuItem>
              <a
                href="#"
                className={`block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden`}
              >
                Edit
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                className={`block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden`}
              >
                View
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}