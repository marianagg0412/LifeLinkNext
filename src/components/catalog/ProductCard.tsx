import { tw } from "twind";
import React, { useEffect, useState } from "react";
import router, { useRouter } from 'next/router';
import { isAdminUser } from "@/utils/authUtils";
import axios from "axios";

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
    <div className={tw`bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-sm mx-auto relative transition hover:scale-105`}>
      
      
      <div className={tw`bg-gradient-to-b from-pink-500 to-pink-300 h-36 relative rounded-t-xl`}>
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
          <div className={tw`w-24 h-24 bg-gray-300 flex items-center justify-center rounded-xl`}>
            <span className={tw`text-gray-500 text-sm`}>No Image</span>
          </div>
        )}
      </div>

      
      <div className={tw`text-center mt-20 mb-0 p-6`}>
        <h2 className={tw`text-xl font-bold text-gray-800 mt-4`}>{product.name}</h2>
        <p className={tw`text-gray-500 text-sm mt-5`}>{product.description}</p>
        <p className={tw`text-pink-600 font-bold text-lg mt-3`}>${product.price}</p>
      </div>

      
      <div className={tw`  mt-0 mb-5 flex flex-col items-center space-y-2`}>
        <button className={tw`w-4/5 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-700 transition`}>
          Buy Now
        </button>

        {isAdmin && (
          <>
            <button
              onClick={handleUpdate}
              className={tw`w-4/5 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition`}
            >
              Actualizar
            </button>

            <button
              onClick={handleDeactivate}
              className={tw`w-4/5 bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 transition`}
            >
              Deactivate
            </button>
          </>
        )}


      </div>
    </div>
  );
};

export default ProductCard;
