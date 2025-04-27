'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/app/components/catalog/ProductCard';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/atomic-design/organisms/Header';
import CHeader from '@/app/components/atomic-design/organisms/CatalogHeader';
import { fetchProducts } from '@/api/products';
import { Product } from '@/interfaces/products';

const Catalogo = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  type FilterType = 'category' | 'use' | 'specialty' | 'price';
  const [filters, setFilters] = useState<{ [key in FilterType]: (string | number)[] }>({ category: [], use: [], specialty: [], price: [] });

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
      (filters.category.length === 0 || filters.category.includes(product.category)) &&
      (filters.specialty.length === 0 || filters.specialty.includes(product.specialty)) &&
      (filters.price.length === 0 || filters.price.includes(product.price))
    );
  });

  const categories = Array.from(new Set(products.map(product => product.category)));
  const prices = Array.from(new Set(products.map(product => product.price)));
  const specialties = Array.from(new Set(products.map(product => product.specialty)));

  const handleFilterChange = (filterType: FilterType, value: string | number) => {
    setFilters(prevFilters => {
      const newFilterValues = prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item: string | number) => item !== value)
        : [...prevFilters[filterType], value];
      return {
        ...prevFilters,
        [filterType]: newFilterValues
      };
    });
  };

  const handleClearFilters = () => {
    setFilters({ category: [], use: [], specialty: [], price: [] });
  };

  return (
    <div>
      <Header />
      <CHeader 
        categories={categories} 
        prices={prices} 
        specialties={specialties} 
        onFilterChange={handleFilterChange} 
        filters={filters} 
        onClearFilters={handleClearFilters}
      />
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10`}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className={`text-gray-500 text-center`}>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Catalogo;