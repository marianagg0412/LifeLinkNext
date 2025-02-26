import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import config from '../../tailwind.config';
import { headers } from 'next/headers';
import axios from 'axios';
import ProductCard from '@/components/catalog/ProductCard';
import { tw } from 'twind';
import { useRouter } from 'next/router';
import { CardWithForm } from '@/components/catalog/Cardcn';
import { Carousel } from '@/components/ui/carousel';
import { CarouselDemo } from '@/components/atomic-design/molecules/Carouselcn';
import Header from '@/components/atomic-design/organisms/Header';
import CHeader from '@/components/atomic-design/organisms/CatalogHeader';



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
    <div className={tw`container mx-auto `}>
      <Header/>
      {/* ✅ Header with Buttons */}

        <CHeader/>
      

      {/* ✅ Grid Layout for Product Cards */}
      <div className={tw`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10`}>
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className={tw`text-gray-500 text-center`}>No products available</p>
        )}
        {/* <CardWithForm/>
        <CarouselDemo/> */}
      </div>
    </div>
  );
};

export default Catalogo;





