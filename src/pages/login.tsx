import { useState} from 'react';
import '/Users/mariana/Desktop/LifeLinkNext/src/styles/LoginForm.css';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post('localhost:3000/auth/login', {
        email,
        password
      },
      {
        withCredentials: true
      });
  
      const data = response.data;
      console.log(data);
      console.log(response);
  
      router.push('src/pages/dashboard.tsx');
    } catch (error) {
      console.error('Login error:', error);
      // Handle API call errors (e.g., network issues)
    }
  };

  return (
    <div className='container'>
        <div className='card'>
            <h1 className='headers'> Inicio de sesión</h1>
            <form onSubmit={(event) => { event.preventDefault(); handleLogin(email, password); }}>
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
          
            <button type="submit">Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login
