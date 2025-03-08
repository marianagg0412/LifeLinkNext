import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/catalog/ProductCard';
import { tw } from 'twind';
import { useRouter } from 'next/router';
import Header from '@/components/atomic-design/organisms/Header';
import CHeader from '@/components/atomic-design/organisms/CatalogHeader';
import { fetchProducts } from '@/api/products';
import { Product } from '@/interfaces/products';


const Catalogo = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filters, setFilters] = useState({ category: '', use: '', specialty: '' });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error("No token found");
          return;
        }

        const decodedToken = JSON.parse(atob(token.split(".")[1])); //decode payload

        setIsAdmin(decodedToken.rol.includes("admin")); //check if it has admin role

        const productsData = await fetchProducts(token); // Use the fetchProducts function
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter(product => {
    return (
      (!filters.category || product.category === filters.category) &&
      (!filters.use || product.use === filters.use) &&
      (!filters.specialty || product.specialty === filters.specialty)
    );
  });

  const categories = Array.from(new Set(products.map(product => product.category)));
  const prices = Array.from(new Set(products.map(product => product.price)));
  const specialties = Array.from(new Set(products.map(product => product.specialty)));

  

  return (
    <div className={tw`container mx-auto `}>
      <Header/>
      <CHeader categories={categories} prices={prices} specialties={specialties} />
      <div className={tw`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10`}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className={tw`text-gray-500 text-center`}>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Catalogo;





