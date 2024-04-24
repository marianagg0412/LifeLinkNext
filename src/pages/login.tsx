import { useState} from 'react';
import '../styles/LoginForm.css';
import { NextRouter, useRouter} from 'next/router';
import axios from 'axios';

const handleLogin = async (userData: { email: string; password: string; }, router: NextRouter) => {
    try {
        const response = await axios.post('http://localhost:3000/auth/login', userData);
        localStorage.setItem('token', response.data.access_token);
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
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='container'>
        <div className='card'>
            <h1 className='headers'> Inicio de sesión</h1>
            <form onSubmit={(event) => { event.preventDefault();
                const userData = {
                    email,
                    password,
                }
                handleLogin(userData, router); }}>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                value={email}
                placeholder='hey@tuemail.com'
                onChange={(event) => setEmail(event.target.value)}
            />

            <label htmlFor="password">Contraseña</label>
            <input
                type="password"
                name="password"
                value={password}
                placeholder='Introduce tu contraseña'
                onChange={(event) => setPassword(event.target.value)}
            />
          
            <button type="submit">Inicia Sesión</button>
            </form>
        </div>
    </div>
  )
}

export default Login
