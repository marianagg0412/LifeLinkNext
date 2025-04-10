
import Logo from '@/components/atomic-design/molecules/atoms/Logo';
import Modal from '@/components/Modal';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { PhoneInput } from 'react-international-phone';
import { tw } from 'twind'

const Register2 = () => {
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
    console.log('Terms accepted');
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
      alert("Por favor, ingrese solo números para CC o CE.");
      // Optionally, reset the input to the last valid value
      setDocnum(docnum); // Assuming docnum is the state holding the current input value
    }
  };
  const allowedOptions = ["CC", "CE", "PA"];

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
  return (
    <>
    <section className={tw(`bg-gray-50 dark:bg-gray-900`)}>
      <div className={tw(`flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0`)}>
          <Logo/>
          <div className={tw(`w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700`)}>
              <div className={tw(`p-6 space-y-4 md:space-y-6 sm:p-8`)}>
                  <h1 className={tw(`text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white`)}>
                      Crear una cuenta
                  </h1>
                  <form 
                    className={tw(`space-y-4 md:space-y-6`)} 
                    action="#"
                    onSubmit={(event) => {
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
                      <div>
                          <label htmlFor="name" className={tw(`block mb-2 text-sm font-medium text-gray-900 dark:text-white`)}>Nombre</label>
                          <input 
                            type="text" 
                            name="name"
                            value={name} 
                            placeholder="Ingrese su nombre"
                            onChange={(event) => setName(event.target.value)}
                            className={tw(`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`)}  
                          />
                      </div>
                      <div>
                          <label 
                            htmlFor="lastname" className={tw(`block mb-2 text-sm font-medium text-gray-900 dark:text-white`)}>Apellido</label>
                          <input 
                            type="text" 
                            name="lastname"
                            value={lastname} 
                            placeholder="••••••••" 
                            onChange={(event) => setLastname(event.target.value)}
                            className={tw(`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`)} 
                          />
                      </div>
                      <div>
                          <label htmlFor="docnum" className={tw(`block mb-2 text-sm font-medium text-gray-900 dark:text-white`)}>Número de documento</label>
                          <div className={tw(`flex flex-col items-start space-y-2`)}>
                            <select
                              name="docType"
                              value={docnum_type}
                              onChange={(e) => {
                                setdocnum_type(e.target.value);
                                if (!allowedOptions.includes(e.target.value)) {
                                  alert('Por favor, seleccione una opción válida.');
                                }
                              }}
                              className={tw(`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`)}
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
                              className={tw(`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`)}
                              disabled={docnum_type === ""}
                            />
                          </div>
                      </div>
                      <div>
                          <label 
                            htmlFor="phone" className={tw(`block mb-2 text-sm font-medium text-gray-900 dark:text-white`)}>Telefono</label>
                          <PhoneInput 
                            defaultCountry="co"
                            value={phone}
                            onChange={setPhone}
                            className={tw(`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`)} 
                          />
                      </div>
                      <div>
                          <label htmlFor="bloodType" className={tw(`block mb-2 text-sm font-medium text-gray-900 dark:text-white`)}>Tipo de sangre</label>
                          <input 
                            type="text" 
                            name="bloodType"
                            value={bloodType} 
                            placeholder="Ingrese su tipo de sangre"
                            onChange={(event) => setBloodType(event.target.value)}
                            className={tw(`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`)}  
                          />
                      </div>
                      <div>
                          <label htmlFor="email" className={tw(`block mb-2 text-sm font-medium text-gray-900 dark:text-white`)}>Email</label>
                          <input 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="hey@mail.com"
                            onChange={(event) => setEmail(event.target.value)}
                            className={tw(`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`)}  
                          />
                      </div>
                      <div>
                          <label htmlFor="password" className={tw(`block mb-2 text-sm font-medium text-gray-900 dark:text-white`)}>Contraseña</label>
                          <input 
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Introduce tu contraseña"
                            onChange={(event) => setPassword(event.target.value)}
                            className={tw(`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`)}  
                          />
                      </div>
                      <div className={tw(`flex items-start`)}>
                          <div className={tw(`flex items-center h-5`)}>
                            <input id="terms" aria-describedby="terms" type="checkbox" className={tw(`w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800`)} onClick={onAcceptTerms}/>
                            {/* <Modal isOpen={isModalOpen} onClose={closeModal} onAcceptTerms={onAcceptTerms} /> */}
                          </div>
                          <div className={tw(`ml-3 text-sm`)}>
                            <label htmlFor="terms" className={tw(`font-light text-gray-500 dark:text-gray-300`)}>Acepto los <a className={tw(`font-medium text-primary-600 hover:underline dark:text-primary-500`)} ref={openModal}>términos y condiciones</a></label>
                          </div>
                      </div>
                      <button 
                        type="submit" 
                        className={tw(`w-full text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`)}
                        onClick={()=> router.push('/user-dashboard')}
                      >
                            Crear mi cuenta
                    </button>
                      <p className={tw(`text-sm font-light text-gray-500 dark:text-gray-400`)}>
                          ¿Ya tienes una cuenta? <a href="#" className={tw(`font-medium text-primary-600 hover:underline dark:text-primary-500`)}>Iniciar Sesión</a>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
    </>
    
  )
}

export default Register2



