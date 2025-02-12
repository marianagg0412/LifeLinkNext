

import { isAdminUser } from '@/utils/authUtils';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { tw } from 'twind';

const UpdateProduct = () => {

  const router = useRouter();
  const { id } = router.query; // get product ID from URL
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "Tejido Blando",
    use: "Rehabilitación Ortopédica",
    specialty: "Ortopedia",
  });

  useEffect(() => {
    isAdminUser().then(setIsAdmin); 
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {

        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("API Response before filtering:", res.data);

            setFormData({
                name: res.data.name,
                price: res.data.price, 
                description: res.data.description,
                image: res.data.image,
                category: res.data.category,
                use: res.data.use,
                specialty: res.data.specialty,
              });
              console.log("Filtered product data (without id):", formData);
        } catch (error) {
            console.error("Error fetching product:", error);
            alert("Error fetching product details.");
        }
    };

    fetchProduct();
    
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Raw formData before filtering:", formData);
    
    

    try {
        const token = localStorage.getItem("token");
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert ("Product updated successfully");
      router.push("/catalogo");
    } catch (error:any) {
        console.error("Error updating product:", error.response?.data || error);
        alert(`Failed to update the product: ${JSON.stringify(error.response?.data)}`);
    }
  };

  if(!isAdmin) {
    return <p className={tw`text-center text-red-500 text-lg`}>Access Denied. Only admins can update products.</p>;
  }

  return (
    <div className={tw`container mx-auto p-8 max-w-md`}>
      <h1 className={tw`text-2xl font-bold mb-4`}>Update Product</h1>
      <form onSubmit={handleSubmit} className={tw`bg-white p-6 rounded-lg shadow-md`}>
        <label className={tw`block mb-2`}>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={tw`w-full p-2 border rounded-md mb-4`}
          required
        />

        <label className={tw`block mb-2`}>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className={tw`w-full p-2 border rounded-md mb-4`}
          required
        />

        <label className={tw`block mb-2`}>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={tw`w-full p-2 border rounded-md mb-4`}
          required
        />

        <label className={tw`block mb-2`}>Image URL:</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className={tw`w-full p-2 border rounded-md mb-4`}
        />

        <label className={tw`block mb-2`}>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={tw`w-full p-2 border rounded-md mb-4`}
        >
          <option value="Tejido Blando">Tejido Blando</option>
          <option value="Tejido Duro">Tejido Duro</option>
          <option value="Tejido Ocular">Tejido Ocular</option>
        </select>

        <label className={tw`block mb-2`}>Use:</label>
        <select
          name="use"
          value={formData.use}
          onChange={handleChange}
          className={tw`w-full p-2 border rounded-md mb-4`}
        >
          <option value="Rehabilitación Ortopédica">Rehabilitación Ortopédica</option>
          <option value="Reparación de Heridas">Reparación de Heridas</option>
          <option value="Recuperación Visual">Recuperación Visual</option>
          <option value="Mejora de la Función Cardíaca">Mejora de la Función Cardíaca</option>
        </select>

        <label className={tw`block mb-2`}>Specialty:</label>
        <select
          name="specialty"
          value={formData.specialty}
          onChange={handleChange}
          className={tw`w-full p-2 border rounded-md mb-4`}
        >
          <option value="Ortopedia">Ortopedia</option>
          <option value="Cardiología">Cardiología</option>
          <option value="Oftalmología">Oftalmología</option>
          <option value="Cirugía Plástica">Cirugía Plástica</option>
        </select>

        <button type="submit" className={tw`w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700`}>
          Save Changes
        </button>
      </form>
    </div>
  );
  
}

export default UpdateProduct;
