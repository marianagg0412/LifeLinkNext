import { tw } from 'twind';
import { useState, useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';
import axios from 'axios';
import MyButton from "@/components/RefreshButton";

const handleLogin = async (userData: { email: string; password: string; }, router: NextRouter) => {
    try {
        const response = await axios.post('http://localhost:3000/auth/login', userData);
        localStorage.setItem('token', response.data.token);
        await router.push('/dashboard');
        alert('Se ha iniciado sesión correctamente');
    } catch (error) {
        console.error('Login error:', error);
        alert('La información de inicio de sesión que ingresaste está incorrecta');
    }
};

const Login = () => {
 const router = useRouter();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 useEffect(() => {
    router.beforePopState(({ url, as, options }) => {
      // Custom logic here, e.g., show a confirmation dialog or redirect
      console.log('state popped');
      if (as !== "/" && as !== "/other") {
        // SSR-render the specified location. (Should 404)
        window.location.href = as;
        return false;
     }

      return true;
    });
 }, []);

 return (
  <div className={tw(`min-h-screen flex items-center justify-center bg-gray-100`)}>
    <div className={tw(`max-w-md w-full bg-white shadow-md rounded-lg p-8`)}>
      <h1 className={tw(`text-3xl font-bold text-center mb-6`)}>Inicio de sesión</h1>
      <form onSubmit={(event) => {
        event.preventDefault();
        const userData = { email, password };
        handleLogin(userData, router);
      }}>
        <div className={tw(`mb-4`)}>
          <label htmlFor="email" className={tw(`block text-gray-700 mb-2`)}>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="hey@tuemail.com"
            onChange={(event) => setEmail(event.target.value)}
            className={tw(`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`)}
          />
        </div>
        <div className={tw(`mb-6`)}>
          <label htmlFor="password" className={tw(`block text-gray-700 mb-2`)}>Contraseña</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Introduce tu contraseña"
            onChange={(event) => setPassword(event.target.value)}
            className={tw(`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`)}
          />
        </div>
        <button className={tw(`w-full bg-[#FF5A5A] text-white p-3 rounded-lg font-semibold hover:bg-[#FF3A3A] transition duration-200`)}>Inicia Sesión</button>
      </form>
        <MyButton/>
    </div>
  </div>
);
}

export default Login;
