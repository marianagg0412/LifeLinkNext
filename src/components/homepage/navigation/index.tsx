import { tw } from 'twind';
import { useState } from 'react';
import Button from '@/components/homepage/button';
import router from "next/router";
import axios from "axios";

interface IMenuButton {
  toggleMenu: React.MouseEventHandler<HTMLButtonElement>;
  showMenu: boolean;
}


const handleCatalogoClick = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    if (token) {
      try {
        const response = await axios.get('http://localhost:3000/auth/profile', config);
        if (response.data.user != null) {
          router.push('/catalogo'); // Navigate to Catalogo if token is valid
        } else {
          await router.push('/login');
          alert('Por favor inicie sesión para ver el catálogo'); // Show error if token is invalid
        }
      } catch (error) {
        console.error(error);
        alert('Por favor inicie sesión para ver el catálogo');
      }
    } else {
      router.push('/login');
      alert('Por favor inicie sesión para ver el catálogo'); // Show error if token is invalid
    }
};


type Link = {
  label: string;
  href?: string;
  onClick?: () => void;
};


const links: Link[] = [
  {
    label: `Quienes somos`,
    href: `/somos`,
  },
  {
    label: `Testimonios`,
    href: `/testimonios`,
  },
  {
    label: `Catálogo`,
    onClick: handleCatalogoClick
  }
];

const secondaryLinks = [
  {
    label: `Contact sales`,
    href: `/`,
  },
  {
    label: `Inicia Sesión`,
    href: `/login`,
  },
  {
    label: `Regístrate`,
    href: `/register`,
  },
];

const MenuButton = ({ toggleMenu, showMenu }: IMenuButton) => (
  <button
    type="button"
    aria-controls="mobile-menu"
    aria-expanded={showMenu}
    onClick={toggleMenu}
    className={tw(`p-2 text-gray-400`)}
  >
    <span className={tw(`sr-only`)}>Open menu</span>
    {showMenu ? (
      <svg
        className={tw(`h-6 w-6`)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
        width={24}
        height={24}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ) : (
      <svg
        className={tw(`h-6 w-6`)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
        width={24}
        height={24}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    )}
  </button>
);

const MobileMenu = () => (
  <div className={tw(`md:hidden`)}>
    <div className={tw(`px-2 pt-2 pb-3 space-y-1 sm:px-3`)}>
      {links.map((link: Link) => (
        <a href={link.href} className={tw(`text-gray-500 block px-3 py-2 text-base font-medium`)} key={link.label}>
          {link.label}
        </a>
      ))}
    </div>
    <div className={tw(`pt-4 pb-3 border-t border-gray-400`)}>
      <div className={tw(`px-2 space-y-1`)}>
        {secondaryLinks.map((link: Link) => (
          <a
            key={`mobile-${link.label}`}
            href={link.href || '#'}
            className={tw(`block px-3 py-2 text-base font-medium text-gray-500`)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </div>
);

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
      <nav className={tw(`bg-white`)}>
        <div className={tw(`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`)}>
          <div className={tw(`flex items-center justify-between h-24`)}>
            <div className={tw(`flex items-center`)}>
              <div className={tw(`flex-shrink-0`)}>
                <img className={tw(`h-12 w-12`)} src="logo-transparent.png" alt="logo" width={48} height={48} />
              </div>
              <div className={tw(`hidden md:block`)}>
                {/* <div className={tw(`ml-10 flex items-baseline space-x-4`)}>
                  {links.map((link) => (
                      <a
                          key={link.label}
                          href={link.href}
                          onClick={link.onClick}
                          className={tw(`text-gray-500 hover:text-gray-600 px-3 py-2 rounded-md font-medium`)}
                      >
                        {link.label}
                      </a>
                  ))}
                </div> */}
                <div className={tw(`ml-10 flex items-baseline space-x-4`)}>
                  {links.map((link) => (
                    link.onClick ? (
                      <button
                        key={link.label}
                        onClick={link.onClick}
                        className={tw(`text-gray-500 hover:text-gray-600 px-3 py-2 rounded-md font-medium`)}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        key={link.label}
                        href={link.href}
                        className={tw(`text-gray-500 hover:text-gray-600 px-3 py-2 rounded-md font-medium`)}
                      >
                        {link.label}
                      </a>
                    )
                  ))}
                </div>

              </div>
            </div>
          <div className={tw(`hidden md:block`)}>
            <div className={tw(`ml-4 flex items-center md:ml-6`)}>
              <Button modifier="border-0 mr-2">Contact sales</Button>
              <Button modifier="border-0 mr-2" navigateTo="/login">Inicia sesión</Button> {/* Added navigateTo prop */}
              <Button primary navigateTo="/register">Regístrate</Button> {/* Added navigateTo prop */}
            </div>
          </div>
          <div className={tw(`-mr-2 flex md:hidden`)}>
            <MenuButton showMenu={showMenu} toggleMenu={toggleMenu} />
          </div>
        </div>
      </div>
      {showMenu ? <MobileMenu /> : null}
    </nav>
  );
};

export default Navigation;
