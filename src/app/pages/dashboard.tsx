'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Dashboard = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className={(`min-h-screen flex flex-col bg-gray-100`)}>
      <div className={(`relative w-full p-4 flex justify-between items-center bg-white shadow-md`)}>
        <h1 className={(`text-3xl font-bold`)}>Dashboard del usuario</h1>
        <button onClick={toggleDropdown} className={(`cursor-pointer text-blue-500 hover:text-blue-700`)}>
          Opciones
        </button>
      </div>
      <div className={(`flex flex-col items-center justify-center flex-grow`)}>
        {showDropdown && (
          <div className={(`bg-white shadow-md rounded-lg p-4 mt-4`)}>
            <button
              type="button"
              onClick={
                () => {
                  localStorage.clear();
                  sessionStorage.clear();
                  alert('Sesión cerrada');
                  router.push('/')
                }}
              className={(`w-full bg-red-500 text-white py-2 px-4 rounded-lg mb-2 hover:bg-red-600 transition duration-200`)}
            >
              Cerrar sesión
            </button>
            <button
              type="button"
              onClick={() => router.push('/profile')}
              className={(`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200`)}
            >
              Abrir perfil
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
