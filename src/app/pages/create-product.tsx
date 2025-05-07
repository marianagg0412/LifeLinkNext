'use client';

import axios from "axios";
import { useRouter } from "next/navigation"
import React, { useState } from "react";
import { toast } from "sonner";

const CreateProduct = () => {

    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        category: 'Tejido Blando',
        use: 'Rehabilitación Ortopédica',
        specialty: 'Ortopedia'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        if (!formData.use || !formData.specialty) {
            toast("Por favor, complete todos los campos");
            return;
        }

        try {
            const token = localStorage.getItem('token');

            if(!token) {
                console.error("No token found");
                return;
            }

            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/product`, 
                {...formData, price: Number(formData.price)},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast('Órgano creado correctamente');
            router.push('/catalogo');
        } catch (error:any) {
            console.error("Error al agregar organo:", error);
            toast(`Error: ${error.response?.data?.message || "Hubo un error al agregar el órgano"}`);
        }
    };

  return (
    <div className="container mx-auto p-8 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Agregar organo</h1>

        <button
            onClick={() => router.push('/catalogo')}
            className={`absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200`}
          >
            Volver al catálogo
          </button>

        <form onSubmit= {handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <label className="block mb-2">Nombre:</label>
            <input 
                type="text" 
                name="name"
                maxLength={150}
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md mb-4"
                required
            />

            <label className="block mb-2">Precio:</label>
            <input 
                type="text" 
                name="price"
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border rounded-md mb-4"
                required
            />

            <label className="block mb-2">Descripción:</label>
            <input 
                type="text" 
                name="description"
                maxLength={500}
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md mb-4"
                required
            />

            <label className="block mb-2">URL de la imagen:</label>
            <input 
                type="url" 
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-2 border rounded-md mb-4"
                required
            />

            <label className="block mb-2">Categoría:</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded-md mb-4">
                <option>Tejido Blando</option>
                <option>Tejido Duro</option>
                <option>Tejido Ocular</option>
            </select>

            <label className="block mb-2">Uso:</label>
            <select name="use" value={formData.use} onChange={handleChange} className="w-full p-2 border rounded-md mb-4">
                <option value="Rehabilitación Ortopédica">Rehabilitación Ortopédica</option>
                <option value="Reparación de Heridas">Reparación de Heridas</option>
                <option value="Recuperación Visual">Recuperación Visual</option>
                <option value="Mejora de la Función Cardíaca">Mejora de la Función Cardíaca</option>
            </select>

            <label className="block mb-2">Especialidad Medica:</label>
            <select name="specialty" value={formData.specialty} onChange={handleChange} className="w-full p-2 border rounded-md mb-4">
                <option value="Ortopedia">Ortopedia</option>
                <option value="Cardiología">Cardiología</option>
                <option value="Oftalmología">Oftalmología</option>
                <option value="Cirugía Plástica">Cirugía Plástica</option>
            </select>

            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700">
                Agregar
            </button>
        </form>
    </div>
  );
};

export default CreateProduct;
