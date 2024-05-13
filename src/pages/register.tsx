import { useState} from 'react';
import '../styles/LoginForm.css';
import { useRouter} from 'next/router';
import axios from 'axios';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Modal from '@/components/Modal';
import CustomButton from '@/components/CustomButton';

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [docnum, setDocnum] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [docnum_type, setdocnum_type] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (event: { target: { value: any; }; }) => {
    const value = event.target.value;
    // Allow for an empty string or a string that starts with a digit
    // Test the cleaned value against the updated regex
    if (/^[0-9]*$/.test(value)) {
      setDocnum(value);
    } else {
      alert("Por favor, ingrese solo números para CC o CE.");
      // Optionally, reset the input to the last valid value
      setDocnum(docnum); // Assuming docnum is the state holding the current input value
    }
  };
  const allowedOptions = ["CC", "CE", "Pasaporte"];

  const handleRegistration = async (event: { email: string; password: string; name: string; lastname: string; docnum_type: string; docnum: string; phone: string; bloodType: string; }) => {
    //event.preventDefault(); // Prevent form submission
    if (!termsAccepted) {
      alert('Por favor, acepta los términos y condiciones antes de registrarte.');
      return;
    }
    const userData = {
      email,
      password,
      name,
      lastname,
      docnum_type,
      docnum,
      phone,
      bloodType
    }
    try {
      const response = await axios.post('http://localhost:3000/auth/register', userData);
      alert('El usuario se creó exitosamente');
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        alert('Se produjo un error inesperado al registrar el usuario');
      }
    }
  };

  const onAcceptTerms = () => {
    setTermsAccepted(true);
  };

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
                    docnum_type,
                    docnum,
                    phone,
                    bloodType
                }
                handleRegistration(userData);
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
                <div style={{ display: 'flex', alignItems: 'center' }}> {/* Wrap input and select in a div for alignment */}
                    <select
                        name="docType"
                        value={docnum_type}
                        onChange={(e) => {
                            setdocnum_type(e.target.value);
                            if (!allowedOptions.includes(e.target.value)) {
                                alert('Por favor, seleccione una opción válida.');
                            }
                        }}
                        style={{ marginLeft: '10px' }} className='selecterDocType' // Style to add space between input and select
                    >
                        <option value="">Seleccione el tipo de documento</option>
                        <option value="CC">CC</option>
                        <option value="CE">CE</option>
                        <option value="PA">Pasaporte</option>
                    </select>

                    {docnum_type === "CC" || docnum_type === "CE"? (
                                    <input className='docInput'
                                        type="text"
                                        name="docnum"
                                        placeholder='Ingrese su número de documento'
                                        onChange={handleInputChange}
                                    />
                                    ) : (
                                    <input className='docInput'
                                        type="text"
                                        name="docnum"
                                        placeholder='Ingrese su número de documento'
                                        onChange={(event) => setDocnum(event.target.value)}
                                        disabled={docnum_type === ""}
                                    />
                                    )}
                </div>
                <label htmlFor="phone">Teléfono</label>
                <PhoneInput className='phoneInput' 
                defaultCountry="co"
                value={phone}
                onChange={(phone) => setPhone(phone)}
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
            <CustomButton className='btn2' onClick={openModal} onAcceptTerms={onAcceptTerms}>Abrir los Términos and Condiciones</CustomButton>
            <Modal isOpen={isModalOpen} onClose={closeModal} />

            <button className='btn2'onClick={() => router.push('/')}>Retornar a menu</button>
        </div>
    </div>
  )
}

export default Register
