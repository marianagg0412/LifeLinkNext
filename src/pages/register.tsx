import { useState} from 'react';
import '../styles/LoginForm.css';
import { NextRouter, useRouter} from 'next/router';
import axios, {AxiosError} from 'axios';

const handleRegistration = async (userData: {
    email: string;
    password: string;
    name: string;
    lastname: string;
    docnum: string;
    phone: string;
    bloodType: string;
}, router: NextRouter) => {
    try {
        const response = await axios.post(
          'http://localhost:3000/auth/register',
          userData
        );
        alert('El usuario se creó exitosamente');
        router.push('/dashboard');
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          alert('Alguna credencial ingresada ya está en uso');
        } else {
          alert('Se produjo un error inesperado al registrar el usuario');
        }
      }
    };

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [docnum, setDocnum] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bloodType, setBloodType] = useState('');

  return (
    <div className='container'>
        <div className='card'>
            <h1 className='headers'> Registro de usuario</h1>
            <form onSubmit={(event) => {
                event.preventDefault();
                const userData = {
                    email,
                    password,
                    name,
                    lastname,
                    docnum,
                    phone,
                    bloodType
                }
                handleRegistration(userData, router);
            }}>
                <label htmlFor="name">Nombre</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder='Ingrese su nombre'
                    onChange={(event) => setName(event.target.value)}
                />

                <label htmlFor="lastname">Apellido</label>
                <input
                    type="text"
                    name="lastname"
                    value={lastname}
                    placeholder='Ingrese su apellido'
                    onChange={(event) => setLastname(event.target.value)}
                />

                <label htmlFor="docnum">Numero de documento</label>
                <input
                    type="text"
                    name="docnum"
                    value={docnum}
                    placeholder='Ingrese su número de documento'
                    onChange={(event) => setDocnum(event.target.value)}
                />

                <label htmlFor="phone">Teléfono</label>
                <input
                    type="text"
                    name="phone"
                    value={phone}
                    placeholder='Ingrese phone'
                    onChange={(event) => setPhone(event.target.value)}
                />

            <label htmlFor="bloodType">Tipo de sangre</label>
            <input
                type="text"
                name="bloodType"
                value={bloodType}
                placeholder='Ingrese su tipo de sangre'
                onChange={(event) => setBloodType(event.target.value)}
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
                <button className='btn1'>Regístrate</button>
            </form>
            <button className='btn2'onClick={() => router.push('/')}>Retornar a menu</button>
        </div>
    </div>
  )
}

export default Register
