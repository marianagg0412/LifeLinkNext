
import Input from "@/components/atomic-design/molecules/atoms/Input";
import Logo from "@/components/atomic-design/molecules/atoms/Logo";
import axios from "axios";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { tw } from "twind";


const handleLogin = async (userData: { email: string; password: string; }, router: NextRouter) => {
    try {
        const response = await axios.post('http://localhost:3000/auth/login', userData);
        localStorage.setItem('token', response.data.token);
        await router.push('/user-dashboard');
        alert('Se ha iniciado sesión correctamente');
    } catch (error) {
        console.error('Login error:', error);
        alert('La información de inicio de sesión que ingresaste está incorrecta');
    }
};


const Login2 = () => {
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
     });


     return (
        <section className={tw`bg-pink-50 dark:bg-gray-800`}>
            <div className={tw`flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0`}>
                <Logo/>

                <div className={tw`w-full bg-gray-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-2xl xl:p-0 dark:bg-gray-800 dark:border-gray-700`}>
                    <div className={tw`p-6 space-y-4 md:space-y-6 sm:p-8`}>
                        <h1 className={tw`text-xl font-bold leading-tight tracking-tight text-red-700 md:text-2xl dark:text-white`}>
                            Inicia sesión en tu cuenta
                        </h1>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const userData = { email, password };
                            handleLogin(userData, router);
                        }}>
                            <div className={tw`mb-5`}>
                                <label htmlFor="email" className={tw`block mb-2 text-sm font-medium text-red-400 dark:text-white`}>Correo</label>
                                <Input 
                                    type="email" 
                                    name="email" 
                                    value={email} 
                                    placeholder="usuario@email.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    
                                />
                            </div>
                            <div className={tw`mb-5`}>
                                <label htmlFor="password" className={tw`block mb-2 text-sm font-medium text-red-400 dark:text-white`}>Contraseña</label>
                                <Input 
                                    type="password" 
                                    name="password" 
                                    value={password} 
                                    placeholder="••••••••"
                                    onChange={(e) => setPassword(e.target.value)}
                                    
                                />
                            </div >
                            <button type="submit" className={tw`bg-red-600 w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>Inicia Sesion</button>
                            
                            <p className={tw`text-sm font-light text-gray-500 dark:text-gray-400`}>
                                ¿No tienes una cuenta? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrarse</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
     )
}

export default Login2;