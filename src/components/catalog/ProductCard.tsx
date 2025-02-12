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
    <div className={tw`bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-sm mx-auto p-6 transform transition hover:scale-105 border border-gray-300`}>
      
      <div className={tw`bg-gradient-to-b from-pink-400 to-pink-200 flex justify-center items-center p-6 rounded-lg relative`}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className={tw`w-28 h-20 object-cover rounded-md border-4 border-white shadow-lg`} // ✅ Rectangle Image
          />
        ) : (
          <div className={tw`w-28 h-20 bg-gray-300 flex items-center justify-center rounded-md`}>
            <span className={tw`text-gray-500 text-sm`}>Imagen no disponible</span>
          </div>
        )}
      </div>

      
      <div className={tw`text-center mt-4`}>
        <h2 className={tw`text-xl font-bold text-gray-800`}>{product.name}</h2>
        <p className={tw`text-gray-500 text-sm mt-2 px-4`}>{product.description}</p>
        <p className={tw`text-pink-600 font-bold text-lg mt-3`}>${product.price}</p>
      </div>

      
      <div className={tw`mt-4`}>
        <button className={tw`w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-700 transition`}>
          Comprar ahora
        </button>

        {isAdmin && (
          <>
            <button
              onClick={handleUpdate}
              className={tw`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition`}
            >
              Actualizar
            </button>

            <button
              onClick={handleDeactivate}
              className={tw`w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 transition`}
            >
              Eliminar
            </button>
          </>
        )}


      </div>
    </div>
  );
};

export default ProductCard;
