import router from 'next/router';
import { useState } from 'react';
import { tw } from 'twind';

const Dashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className={tw(`min-h-screen flex flex-col bg-gray-100`)}>
      <div className={tw(`relative w-full p-4 flex justify-between items-center bg-white shadow-md`)}>
        <h1 className={tw(`text-3xl font-bold`)}>Dashboard del usuario</h1>
        <button onClick={toggleDropdown} className={tw(`cursor-pointer text-blue-500 hover:text-blue-700`)}>
          Opciones
        </button>
      </div>
      <div className={tw(`flex flex-col items-center justify-center flex-grow`)}>
        {showDropdown && (
          <div className={tw(`bg-white shadow-md rounded-lg p-4 mt-4`)}>
            <button
              type="button"
              onClick={() => router.push('/main')}
              className={tw(`w-full bg-red-500 text-white py-2 px-4 rounded-lg mb-2 hover:bg-red-600 transition duration-200`)}
            >
              Cerrar sesión
            </button>
            <button
              type="button"
              onClick={() => router.push('/profile')}
              className={tw(`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200`)}
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
