'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { isAdminUser } from "@/utils/authUtils";
import axios from "axios";
import { GradientB } from "../atomic-design/atoms/buttons/GradientB";
import { HomeIcon, Rocket, ShoppingBag, Trash } from "lucide-react";
import { Product } from "@/interfaces/products";
import { toast } from "sonner";

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

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/product/${product.id}/deactivate`, {}, config);

      toast(`${product.name} has been deactivated`);
    } catch (error: any) {
      console.error("❌ Error deactivating product:", error.response?.data || error);
      toast(`Falló la desactivación del producto`);
    }
  };

  return (
    <div className={`bg-[#F1EBE4] rounded-xl shadow-lg overflow-hidden w-full max-w-sm mx-auto relative transition hover:scale-105`}>


      <div className={`bg-[#FFBDB4] h-36 relative rounded-t-xl`}>
        <p className={`text-white text-lg font-bold absolute top-3 left-4`}>{product.specialty}</p>
      </div>

      {/* Floating Image */}
      <div className={`absolute left-1/2 top-20 transform -translate-x-1/2 mt--5`}>
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className={`w-80 h-40 object-cover bg-white rounded-xl shadow-lg `}
          />
        ) : (
          <div className={`w-28 h-20 bg-gray-300 flex items-center justify-center rounded-md`}>
            <span className={`text-gray-500 text-sm`}>Imagen no disponible</span>
          </div>
        )}
      </div>


      <div className={`text-center mt-20 mb-0 p-6`}>
        <h2 className={`text-xl font-bold text-[#46C6D7] mt-4`}>{product.name}</h2>
        <p className={`text-gray-500 text-sm mt-5`}>{product.description}</p>
        <p className={`text-[#F72967] font-bold text-lg mt-3`}>${product.price}</p>
      </div>


      <div className={` mb-6 flex flex-col items-center justify-center space-y-2 `}>
        <GradientB
          label="Comprar Ahora"
          onClick={handleUpdate}



        >

        </GradientB>

        {isAdmin && (
          <>
            {/* <button
              onClick={handleUpdate}
              className={`w-4/5 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition`}
            >
              Actualizar
            </button> */}

            <button
              onClick={handleUpdate}
              type="button" className={`w-4/5 text-white bg-[#BCACCD] hover:bg-[#92D1FF] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center gap-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            >
              <Rocket />
              Actualizar
            </button>



            <button
              onClick={handleDeactivate}
              className={`w-4/5 text-white bg-[#ffd058] hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center gap-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            >
              <Trash />


              Eliminar
            </button>
          </>
        )}


      </div>
    </div>
  );
};

export default ProductCard;
