

import { isAdminUser } from '@/utils/authUtils';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const UpdateProduct = () => {

  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
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

            setFormData({
                name: res.data.name,
                price: res.data.price, 
                description: res.data.description,
                image: res.data.image,
                category: res.data.category,
                use: res.data.use,
                specialty: res.data.specialty,
              });
        } catch (error) {
            console.error("Error fetching product:", error);
            alert("Error fetching product details.");
        }
    };

    fetchProduct();
    
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    let value: any = e.target.value;

    if (e.target.name === "price") {
      value = parseFloat(value);
      if (isNaN(value) || value < 0) {
        value = 0; // Ensure it's a valid number
      }
    }
    
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    return <p className={`text-center text-red-500 text-lg`}>Acceso Restringido. Solo los administradores pueden editar órganos.</p>;
  }

  return (
    <div className={`container mx-auto p-8 max-w-md`}>
        <button
          onClick={() => router.push('/catalogo')}
          className={(`absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200`)}
        >
          Volver al catálogo
        </button>
      <h1 className={`text-2xl font-bold mb-4`}>Actualizar producto</h1>
      <form onSubmit={handleSubmit} className={`bg-white p-6 rounded-lg shadow-md`}>
        <label className={`block mb-2`}>Nombre:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md mb-4`}
          required
        />

        <label className={`block mb-2`}>Precio:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md mb-4`}
          required
        />

        <label className={`block mb-2`}>Descripción:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md mb-4`}
          required
        />

        <label className={`block mb-2`}>URL de la imagen:</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md mb-4`}
        />

        <label className={`block mb-2`}>Categoría:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md mb-4`}
        >
          <option value="Tejido Blando">Tejido Blando</option>
          <option value="Tejido Duro">Tejido Duro</option>
          <option value="Tejido Ocular">Tejido Ocular</option>
        </select>

        <label className={`block mb-2`}>Uso:</label>
        <select
          name="use"
          value={formData.use}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md mb-4`}
        >
          <option value="Rehabilitación Ortopédica">Rehabilitación Ortopédica</option>
          <option value="Reparación de Heridas">Reparación de Heridas</option>
          <option value="Recuperación Visual">Recuperación Visual</option>
          <option value="Mejora de la Función Cardíaca">Mejora de la Función Cardíaca</option>
        </select>

        <label className={`block mb-2`}>Specialidad:</label>
        <select
          name="specialty"
          value={formData.specialty}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md mb-4`}
        >
          <option value="Ortopedia">Ortopedia</option>
          <option value="Cardiología">Cardiología</option>
          <option value="Oftalmología">Oftalmología</option>
          <option value="Cirugía Plástica">Cirugía Plástica</option>
        </select>

        <button type="submit" className={`w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700`}>
          Guardar cambios
        </button>
      </form>
    </div>
  );
  
}

export default UpdateProduct;
