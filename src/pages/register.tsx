import { useState} from 'react';
import '/Users/mariana/Desktop/LifeLinkNext/src/styles/LoginForm.css';
import { useRouter } from 'next/router';
import axios from 'axios';

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [docnum, setDocnum] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async (name: string, lastname: string, docnum: string, phone: string, email: string, password: string) => {

  };

  return (
    <div className='container'>
        <div className='card'>
            <h1 className='headers'> Registro de usuario</h1>
            <form onSubmit={(event) => { event.preventDefault(); handleRegistration(name, lastname, docnum, phone, email, password)}}>
            <label htmlFor="name">Nombre</label>
            <input
                type="name"
                name="name"
                value={name}
                placeholder='Ingrese su nombre'
                onChange={(event) => setName(event.target.value)}
            />

            <label htmlFor="lastname">Apellido</label>
            <input
                type="lastname"
                name="lastname"
                value={lastname}
                placeholder='Ingrese su apellido'
                onChange={(event) => setLastname(event.target.value)}
            />

            <label htmlFor="docnum">Numero de documento</label>
            <input
                type="docnum"
                name="docnum"
                value={docnum}
                placeholder='Ingrese docNum'
                onChange={(event) => setDocnum(event.target.value)}
            />

            <label htmlFor="phone">Telefono</label>
            <input
                type="phone"
                name="phone"
                value={phone}
                placeholder='Ingrese phone'
                onChange={(event) => setPhone(event.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                value={email}
                placeholder='hey@mail.com'
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

export default Register
