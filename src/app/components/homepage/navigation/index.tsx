'use client';

import { useState, useEffect } from 'react';
import Button from '@/app/components/homepage/button';
import { useRouter } from "next/navigation";
import axios from "axios";
import { User } from 'lucide-react';

type Link = {
  label: string;
  href?: string;
  onClick?: () => void;
};

const Navigation = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleCatalogoClick = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    if (token) {
      setIsLoggedIn(true);
      try {
        const response = await axios.get('http://localhost:3000/auth/profile', config);
        if (response.data.user != null) {
          router.push('/catalogo');
        } else {
          router.push('/login');
          alert('Por favor inicie sesión para ver el catálogo');
        }
      } catch (error) {
        console.error(error);
        alert('Por favor inicie sesión para ver el catálogo');
      }
    } else {
      router.push('/login');
      alert('Por favor inicie sesión para ver el catálogo');
    }
  };

  const links: Link[] = [
    { label: `Quienes somos`, href: `/somos` },
    { label: `Testimonios`, href: `/testimonios` },
    { label: `Catálogo`, onClick: handleCatalogoClick }
  ];

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-12 w-12" src="logo-transparent.png" alt="logo" width={48} height={48} />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {links.map((link) =>
                  link.onClick ? (
                    <button
                      key={link.label}
                      onClick={link.onClick}
                      className="text-gray-500 hover:text-gray-600 px-3 py-2 rounded-md font-medium"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-gray-500 hover:text-gray-600 px-3 py-2 rounded-md font-medium"
                    >
                      {link.label}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            {isLoggedIn ? (
              <div className="ml-4 flex items-center md:ml-6">
                <User color='#FF5A5A' onClick={() => { router.push('/profile'); }} />
              </div>
            ) : (
              <div className="ml-4 flex items-center md:ml-6">
                <Button modifier="border-0 mr-2" navigateTo="/login">Inicia sesión</Button>
                <Button primary navigateTo="/register">Regístrate</Button>
              </div>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <MenuButton showMenu={showMenu} toggleMenu={toggleMenu} />
          </div>
        </div>
      </div>
      {showMenu ? (
        <MobileMenu
          links={links}
          isLoggedIn={isLoggedIn}
          router={router}
          setShowMenu={setShowMenu}
        />
      ) : null}
    </nav>
  );
};

const MenuButton = ({ toggleMenu, showMenu }: { toggleMenu: () => void; showMenu: boolean }) => (
  <button
    type="button"
    aria-controls="mobile-menu"
    aria-expanded={showMenu}
    onClick={toggleMenu}
    className="p-2 text-gray-400"
  >
    <span className="sr-only">Open menu</span>
    {showMenu ? (
      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" width={24} height={24}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ) : (
      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" width={24} height={24}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    )}
  </button>
);

const MobileMenu = ({
  links,
  isLoggedIn,
  router,
  setShowMenu,
}: {
  links: Link[];
  isLoggedIn: boolean;
  router: ReturnType<typeof useRouter>;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div className="md:hidden">
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      {links.map((link: Link) =>
        link.onClick ? (
          <button
            key={link.label}
            onClick={async () => {
              await link.onClick?.();
              setShowMenu(false);
            }}
            className="text-gray-500 block px-3 py-2 text-base font-medium w-full text-left"
          >
            {link.label}
          </button>
        ) : (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setShowMenu(false)}
            className="text-gray-500 block px-3 py-2 text-base font-medium"
          >
            {link.label}
          </a>
        )
      )}
    </div>
    <div className="pt-4 pb-3 border-t border-gray-400">
      <div className="px-2 space-y-1 flex items-center">
        {isLoggedIn ? (
          <button
            onClick={() => {
              setShowMenu(false);
              router.push('/profile');
            }}
            className="flex items-center text-gray-500"
          >
            <User color="#FF5A5A" />
            <span className="ml-2">Perfil</span>
          </button>
        ) : (
          <>
            <a
              href="/login"
              onClick={() => setShowMenu(false)}
              className="block px-3 py-2 text-base font-medium text-gray-500"
            >
              Inicia Sesión
            </a>
            <a
              href="/register"
              onClick={() => setShowMenu(false)}
              className="block px-3 py-2 text-base font-medium text-gray-500"
            >
              Regístrate
            </a>
          </>
        )}
      </div>
    </div>
  </div>
);

export default Navigation;