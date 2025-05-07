'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Header from '@/app/components/atomic-design/organisms/Header';
import { User } from '@/interfaces/user';
import OrderList from '@/app/components/atomic-design/organisms/OrderList';
import { fetchOrdersOfUser } from '@/api/orders';



const UserProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Only runs in browser
        const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;
        if (!token) {
          router.push('/login');
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get('http://localhost:3000/auth/profile', config);
        setUser(response.data.user);

        const userOrders = await fetchOrdersOfUser(token);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFBABA] via-pink-50 to-blue-50 animate-pulse">
        <span className="text-2xl font-bold text-gray-700">Cargando panel de usuario...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFBABA] via-pink-50 to-blue-50">
        <span className="text-2xl font-bold text-red-600">Error cargando datos de usuario</span>
      </div>
    );
  }

    return (

    <div>
      <Header />

    <div className={` bg-blue-50 p-6 flex flex-col items-center`}>
      <div className={`max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6`}>
        {/* User Profile Card */}
        <div className={`bg-white p-6 rounded-2xl shadow-md col-span-2 flex flex-col items-center`}>
          
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Portrait_of_Neytiri.jpg"
            alt="User Profile"
            width={100}
            height={100}
            className={`rounded-full mb-4`}
          />
          <h2 className={`text-xl font-bold`}>{user.name}</h2>
          <p className={`text-gray-600`}> {user.lastname}</p>
          <p className={`text-gray-600`}>{user.email}</p>
          <p className={`text-gray-600`}>{user.phone}</p>
          
        </div>

        {/* Payment Information */}
        <div className={`bg-white p-6 rounded-2xl shadow-md flex flex-col items-center`}>
          <h3 className={`text-lg font-semibold mb-4`}>Información de facturación</h3>
          <p className={`text-gray-600`}>Medio de pago: **** **** ****</p>
          <p className={`text-gray-600`}>Dirección: Calle xsur #xx-xx</p>
          <div className={`flex flex-row items-center mt-3`}>
            <img src="https://img.icons8.com/?size=100&id=13608&format=png&color=000000" alt="Visa" width={50} height={20} />
            <img src="https://img.icons8.com/?size=100&id=SqTkfR7592t9&format=png&color=000000" alt="MasterCard" width={50} height={20} />
            <img src="https://img.icons8.com/?size=100&id=SZ8HYUgmLcNc&format=png&color=000000" alt="Google Pay" width={50} height={20} />
          </div>
          <button className={`mt-4 bg-purple-600 text-white px-4 py-2 rounded-xl`}> Editar </button>
        </div>
      </div>

      {/* Order Section */}
      <div className={`mt-6 max-w-4xl w-full bg-white p-6 rounded-2xl shadow-md flex flex-col`}>
        <h3 className={`mt-1 text-lg font-semibold`}>Мis pedidos</h3>
        <div className={`flex flex-row justify-evenly h-full`}>
          <OrderList orders={orders} />
          

        </div>
        
      </div>

      {/* Subscription Section */}
      <div className={`mt-6 max-w-4xl w-full bg-purple-100 p-6 rounded-2xl shadow-md text-purple-900`}>
        <h3 className={`text-lg font-semibold mb-4`}>Beneficios de usuario LifeLink</h3>
        <ul className={`list-disc list-inside text-purple-800`}>
          <li>Busca o brinda ayuda a personas en tu zona</li>
          <li>Aprende sobre ser candidato o receptor de donaciones</li>
          <li>Adquirir conocimiento sobre órganos no vitales</li>
        </ul>
        <div className={`flex flex-row justify-between`}>
          <button className={`mt-4 bg-purple-600 text-white px-4 py-2 rounded-xl`}
                  onClick={() => router.push("/catalogo")}>Explorar catálogo</button>
          <button 
            className={`mt-4 bg-red-600 text-white px-4 py-2 rounded-xl`}
            onClick={() => {
              localStorage.removeItem('token');
              router.push("/")
            }}
          > Cerrar Sesión </button>

        </div>
      </div>
    </div>
    </div>
    
  );
};

export default UserProfile;


//   return (
//     <div className={`min-h-screen bg-blue-50 p-6 flex flex-col items-center`}>
//       <Header />
//       <div className={`max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6`}>
//         {/* User Profile Card */}
//         <div className={`bg-white p-6 rounded-2xl shadow-md col-span-2 flex flex-col items-center`}>
//           <Image
//             src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Portrait_of_Neytiri.jpg"
//             alt="User Profile"
//             width={100}
//             height={100}
//             className={`rounded-full mb-4`}
//           />
//           <h2 className={`text-xl font-bold`}>{user.name}</h2>
//           <p className={`text-gray-600`}>Дата регистрации: {user.lastname}</p>
//           <p className={`text-gray-600`}>Город: {user.email}</p>
//           <p className={`text-gray-600`}>Дата рождения: {user.donor}</p>
//           <p className={`text-gray-600`}>Телефон: {user.phone}</p>
          
//         </div>

//         {/* Payment Information */}
//         <div className={`bg-white p-6 rounded-2xl shadow-md`}>
//           <h3 className={`text-lg font-semibold mb-4`}>Платежные данные</h3>
//           <p className={`text-gray-600`}>Номер карты: **** **** ****</p>
//           <div className={`flex space-x-3 mt-3`}>
//             <Image src="/visa.png" alt="Visa" width={40} height={20} />
//             <Image src="/mastercard.png" alt="MasterCard" width={40} height={20} />
//             <Image src="/gpay.png" alt="Google Pay" width={40} height={20} />
//           </div>
//         </div>
//       </div>

//       {/* Courses Section */}
//       <div className={`mt-6 max-w-4xl w-full bg-white p-6 rounded-2xl shadow-md`}>
//         <h3 className={`text-lg font-semibold mb-4`}>Мои курсы</h3>
        
//       </div>

//       {/* Subscription Section */}
//       <div className={`mt-6 max-w-4xl w-full bg-purple-100 p-6 rounded-2xl shadow-md text-purple-900`}>
//         <h3 className={`text-lg font-semibold mb-4`}>Индивидуальная подписка Success Premium</h3>
//         <ul className={`list-disc list-inside text-purple-800`}>
//           <li>Доступ к новым курсам</li>
//           <li>Сертификаты по завершении</li>
//           <li>Студенческое сообщество</li>
//         </ul>
//         <button className={`mt-4 bg-purple-600 text-white px-4 py-2 rounded-xl`}>Подписаться</button>
//       </div>
//     </div>
//   );