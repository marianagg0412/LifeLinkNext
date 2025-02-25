import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import config from '../../tailwind.config';
import { headers } from 'next/headers';
import axios from 'axios';
import ProductCard from '@/components/catalog/ProductCard';
import { tw } from 'twind';
import { useRouter } from 'next/router';



interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  use: string;
  specialty: string;
  availability: number;
}


const Catalogo = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error("No token found");
          return;
        }
        
        const decodedToken = JSON.parse(atob(token.split(".")[1])); //decode payload

        setIsAdmin(decodedToken.rol.includes("admin")); //check if it has admin role

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProducts(data);
        
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [])
  

  return (
    <div className={tw`container mx-auto p-8`}>
      {/* ✅ Header with Buttons */}
      <div className={tw`flex justify-between items-center mb-6`}>
        <h1 className={tw`text-3xl font-bold text-green-600`}>Catálogo de Órganos</h1>

        <div className={tw`flex space-x-4`}>
          {isAdmin && (
            <Link href="/create-product">
              <button className={tw`bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700`}>
                Agregar órgano
              </button>
            </Link>
          )}

          <button
            onClick={() => router.push('/main')}
            className={tw`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200`}
          >
            Volver a la página principal
          </button>
        </div>
      </div>

      {/* ✅ Grid Layout for Product Cards */}
      <div className={tw`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8`}>
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className={tw`text-gray-500 text-center`}>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Catalogo;
