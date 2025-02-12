import React, { useEffect, useState } from 'react'
import Link from 'next/link';

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


export const Catalogo = () => {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`)
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [])
  

  return (
    <div className='container mx-auto p-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Product Catalog</h1>
        <Link href="/create-product">
          <button className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700'></button>
            Create Product
        </Link>
      </div>
      <div></div>
    </div>
  )
}
