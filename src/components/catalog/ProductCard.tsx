import React from 'react'
import CustomButton from '../CustomButton';
import { useRouter } from 'next/router';
import router from 'next/router';

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

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {

  return (
    <div className='border rounded-lg shadow-lg p-4 flex flex-col items-center bg-white'>
        <img src={product.image} alt={product.name} className="w-48 h-48 object-cover rounded-lg" />
        <h2 className='text-xl font-semibold mt-2'>{product.name}</h2>
        <p className='text-gray-600'>{product.description}</p>
        <p className='font-bold text-green-500'>{product.price.toFixed(2)}</p>

        <CustomButton
            className='mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700'
            onClick={() => router.push(`product/${product.id}`)}
        >
            View Details
        </CustomButton>

    </div>

  )
}
