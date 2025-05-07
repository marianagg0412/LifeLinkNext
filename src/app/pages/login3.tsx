'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import MyButton from "@/app/components/RefreshButton";
import { toast } from 'sonner';

const handleLogin = async (userData: { email: string; password: string; }, router: ReturnType<typeof useRouter>) => {
    try {
        const response = await axios.post('http://localhost:3000/auth/login', userData);
        localStorage.setItem('token', response.data.token);
        router.push('/user-dashboard');
        toast('Se ha iniciado sesión correctamente');
    } catch (error) {
        console.error('Login error:', error);
        toast('La información de inicio de sesión que ingresaste está incorrecta');
    }
};

const Login = () => {
 const router = useRouter();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Inicio de sesión</h1>
      <form onSubmit={(event) => {
        event.preventDefault();
        const userData = { email, password };
        handleLogin(userData, router);
      }}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="hey@tuemail.com"
            onChange={(event) => setEmail(event.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">Contraseña</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Introduce tu contraseña"
            onChange={(event) => setPassword(event.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="w-full bg-[#FF5A5A] text-white p-3 rounded-lg font-semibold hover:bg-[#FF3A3A] transition duration-200">Inicia Sesión</button>
      </form>
        <MyButton/>
    </div>
  </div>
 );
}

export default Login;