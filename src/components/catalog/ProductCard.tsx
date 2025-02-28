import { tw } from "twind";
import React, { useEffect, useState } from "react";
import router, { useRouter } from 'next/router';
import { isAdminUser } from "@/utils/authUtils";
import axios from "axios";
import { GradientB } from "../atomic-design/molecules/atoms/buttons/GradientB";
import { HomeIcon, Rocket, ShoppingBag, Trash } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  specialty: string;
}



const ProductCard: React.FC<{ product: Product }> = ({ product }) => {

  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    isAdminUser().then(setIsAdmin);
  }, []);

  const handleUpdate = () => {
    router.push(`/update-product?id=${product.id}`);

  }

  const handleDeactivate = async () => {
    const confirmDeactivation = window.confirm(
      `Are you sure you want to deactivate "${product.name}"?`
    );
    if (!confirmDeactivation) return;

    try {
      const token = localStorage.getItem('token');

      console.log("🔍 Token before sending request:", token);

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      console.log(config);
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/product/${product.id}/deactivate`, {}, config);



      alert (`${product.name} has been deactivated`);
      router.reload();
    } catch (error: any) {
      console.error("❌ Error deactivating product:", error.response?.data || error);
      alert(`Failed to deactivate product: ${JSON.stringify(error.response?.data)}`);
    }
  };

  return (
    <div className={tw`bg-[#F1EBE4] rounded-xl shadow-lg overflow-hidden w-full max-w-sm mx-auto relative transition hover:scale-105`}>
      
      
      <div className={tw`bg-[#FFBDB4] h-36 relative rounded-t-xl`}>
        <p className={tw`text-white text-lg font-bold absolute top-3 left-4`}>{product.specialty}</p>
      </div>

      {/* Floating Image */}
      <div className={tw`absolute left-1/2 top-20 transform -translate-x-1/2 mt--5`}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className={tw`w-80 h-40 object-cover bg-white rounded-xl shadow-lg `}
          />
        ) : (
          <div className={tw`w-28 h-20 bg-gray-300 flex items-center justify-center rounded-md`}>
            <span className={tw`text-gray-500 text-sm`}>Imagen no disponible</span>
          </div>
        )}
      </div>

      
      <div className={tw`text-center mt-20 mb-0 p-6`}>
        <h2 className={tw`text-xl font-bold text-[#46C6D7] mt-4`}>{product.name}</h2>
        <p className={tw`text-gray-500 text-sm mt-5`}>{product.description}</p>
        <p className={tw`text-[#F72967] font-bold text-lg mt-3`}>${product.price}</p>
      </div>

      
      <div className={tw` mb-6 flex flex-col items-center justify-center space-y-2 `}>
      <GradientB  
                label="Comprar Ahora"
                onClick={handleUpdate}
                
                
                
            >
              
            </GradientB>

        {isAdmin && (
          <>
            {/* <button
              onClick={handleUpdate}
              className={tw`w-4/5 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition`}
            >
              Actualizar
            </button> */}

            <button 
            onClick={handleUpdate}
            type="button" className={tw`w-4/5 text-white bg-[#BCACCD] hover:bg-[#92D1FF] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center gap-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            >
            <Rocket/>
            Actualizar
            </button>



            <button
              onClick={handleDeactivate}
              className={tw`w-4/5 text-white bg-[#ffd058] hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center gap-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              >
              <Trash/>
            
            
              Eliminar
            </button>
          </>
        )}


      </div>
    </div>
  );
};

export default ProductCard;
