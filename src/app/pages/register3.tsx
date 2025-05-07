import { useState} from 'react';
import { useRouter} from 'next/navigation';
import axios from 'axios';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Modal from '@/app/components/Modal';
import CustomButton from '@/app/components/CustomButton';
import '../styles/LoginForm.css';
import MyButton from "@/app/components/RefreshButton";
import { toast } from 'sonner';

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
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onAcceptTerms = () => {
    setTermsAccepted(true);
    closeModal();
  };

  const handleInputChange = (event: { target: { value: any; }; }) => {
    const value = event.target.value;
    // Allow for an empty string or a string that starts with a digit
    // Test the cleaned value against the updated regex
    if (/^[0-9]*$/.test(value)) {
      setDocnum(value);
    } else {
      toast("Por favor, ingrese solo números para CC o CE.");
      // Optionally, reset the input to the last valid value
      setDocnum(docnum); // Assuming docnum is the state holding the current input value
    }
  };
  const allowedOptions = ["CC", "CE", "PA"];

  const handleRegistration = async (event: { email: string; password: string; name: string; lastname: string; docnum_type: string; docnum: string; phone: string; bloodType: string; }) => {
    //event.preventDefault(); // Prevent form submission
    if (!termsAccepted) {
      toast('Por favor, acepta los términos y condiciones antes de registrarte.');
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
      toast('El usuario se creó exitosamente');
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast(error.response.data.message);
      } else {
        toast('Se produjo un error inesperado al registrar el usuario');
      }
    }
  };

  
  return (
    <div className={(`min-h-screen flex items-center justify-center bg-gray-100`)}>
      <div className={(`max-w-md w-full bg-white shadow-md rounded-lg p-8`)}>
        <h1 className={(`text-3xl font-bold text-center mb-6`)}>Registro de usuario</h1>
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
          };
          handleRegistration(userData);
        }}>
          <div className={(`mb-4`)}>
            <label htmlFor="name" className={(`block text-gray-700 mb-2`)}>Nombre</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Ingrese su nombre"
              onChange={(event) => setName(event.target.value)}
              className={(`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`)}
            />
          </div>
          <div className={(`mb-4`)}>
            <label htmlFor="lastname" className={(`block text-gray-700 mb-2`)}>Apellido</label>
            <input
              type="text"
              name="lastname"
              value={lastname}
              placeholder="Ingrese su apellido"
              onChange={(event) => setLastname(event.target.value)}
              className={(`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`)}
            />
          </div>
          <div className={(`mb-4`)}>
            <label htmlFor="docnum" className={(`block text-gray-700 mb-2`)}>Número de documento</label>
            <div className={(`flex flex-col items-start space-y-2`)}>
              <select
                name="docType"
                value={docnum_type}
                onChange={(e) => {
                  setdocnum_type(e.target.value);
                  if (!allowedOptions.includes(e.target.value)) {
                    toast('Por favor, seleccione una opción válida.');
                  }
                }}
                className={(`p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`)}
              >
                <option value="">Seleccione el tipo de documento</option>
                <option value="CC">CC</option>
                <option value="CE">CE</option>
                <option value="PA">Pasaporte</option>
              </select>
              <input
                type="text"
                name="docnum"
                placeholder="Ingrese su número de documento"
                onChange={handleInputChange}
                className={(`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`)}
                disabled={docnum_type === ""}
              />
            </div>
          </div>
          <div className={(`mb-4`)}>
            <label htmlFor="phone" className={(`block text-gray-700 mb-2`)}>Teléfono</label>
            <PhoneInput
              defaultCountry="co"
              value={phone}
              onChange={setPhone}
              className={(`w-full p-3 flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-blue-500`)}
            />
          </div>
          <div className={(`mb-4`)}>
            <label htmlFor="bloodType" className={(`block text-gray-700 mb-2`)}>Tipo de sangre</label>
            <input
              type="text"
              name="bloodType"
              value={bloodType}
              placeholder="Ingrese su tipo de sangre"
              onChange={(event) => setBloodType(event.target.value)}
              className={(`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`)}
            />
          </div>
          <div className={(`mb-4`)}>
            <label htmlFor="email" className={(`block text-gray-700 mb-2`)}>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="hey@mail.com"
              onChange={(event) => setEmail(event.target.value)}
              className={(`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`)}
            />
          </div>
          <div className={(`mb-6`)}>
            <label htmlFor="password" className={(`block text-gray-700 mb-2`)}>Contraseña</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Introduce tu contraseña"
              onChange={(event) => setPassword(event.target.value)}
              className={(`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`)}
            />
          </div>
          <button className={(`w-full bg-[#FF5A5A] text-white p-3 rounded-lg font-semibold hover:bg-[#FF3A3A] transition duration-200`)}>Regístrate</button>
        </form>
        <div>
      <CustomButton
        className={(`w-full bg-gray-500 text-white p-3 rounded-lg font-semibold mt-4 hover:bg-gray-600 transition duration-200`)}
        onClick={openModal}
        onAcceptTerms={onAcceptTerms}
      >
        Abrir los Términos y Condiciones
      </CustomButton>
      <Modal isOpen={isModalOpen} onClose={closeModal} onAcceptTerms={onAcceptTerms} />
    </div>
        <MyButton/>
      </div>
    </div>
  );
}

export default Register
