'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import '../styles/ProfileForm.css';
import Header from '../components/atomic-design/organisms/Header';
import { User } from '@/interfaces/user';
import { User as UserIcon, Mail, Phone, Edit2, CheckCircle, XCircle, UserCheck, UserPlus } from 'lucide-react';

const UserProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedLastName, setUpdatedLastName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');
  const [isDonor, setIsDonor] = useState(false);
  const [isRecipient, setIsRecipient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [temp, setTemp] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get('http://localhost:3000/auth/profile', config);
        setUser(response.data.user);
        setUpdatedName(response.data.user.name);
        setUpdatedLastName(response.data.user.lastname);
        setUpdatedEmail(response.data.user.email);
        setTemp(response.data.user.phone);
        setUpdatedPhone(response.data.user.phone);
        setIsDonor(response.data.user.donor);
        setIsRecipient(response.data.user.recipient);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        alert('Error fetching profile data');
        router.push('/login');
      }
    };
    fetchProfile();
  }, [router]);

  const handleEdit = () => {
    setEditMode(true);
    setUpdatedPhone('');
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const updatedFields: Partial<User> = {};
      if (updatedName) updatedFields.name = updatedName;
      if (updatedLastName) updatedFields.lastname = updatedLastName;
      if (updatedEmail) updatedFields.email = updatedEmail;
      if (updatedPhone.length > 3) updatedFields.phone = updatedPhone;
      if (updatedPassword) updatedFields.password = updatedPassword;
      updatedFields.donor = isDonor;
      updatedFields.recipient = isRecipient;

      const response = await axios.patch('http://localhost:3000/auth/edit-profile', updatedFields, config);
      setUser(response.data.user);
      setEditMode(false);
      alert('El perfil se actualizó correctamente');
      router.push('/user-dashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFBABA] via-pink-50 to-blue-50 animate-pulse">
        <span className="text-2xl font-bold text-gray-700">Cargando perfil...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFBABA] via-pink-50 to-blue-50">
        <span className="text-2xl font-bold text-red-600">Error cargando datos de usuario</span>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFBABA] via-pink-50 to-blue-50 py-10">
        <div className="max-w-lg w-full bg-white/90 shadow-2xl rounded-3xl p-10 border border-pink-100 relative animate-fade-in">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gradient-to-tr from-[#FF5A5A] to-pink-400 rounded-full p-2 shadow-lg mb-2">
              <UserIcon className="text-white" size={56} />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-1 tracking-tight">Perfil de Usuario</h1>
            <span className="text-pink-500 font-medium text-lg">{user.email}</span>
          </div>
          {editMode ? (
            <form
              className="space-y-5"
              onSubmit={e => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <div>
                <label className="block text-gray-700 mb-1 font-semibold">Nombre</label>
                <div className="flex items-center bg-gray-50 rounded-lg px-3">
                  <UserPlus className="text-pink-400 mr-2" size={20} />
                  <input
                    type="text"
                    value={updatedName}
                    onChange={e => setUpdatedName(e.target.value)}
                    className="w-full bg-transparent p-2 focus:outline-none"
                    placeholder="Nombre"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-semibold">Apellido</label>
                <div className="flex items-center bg-gray-50 rounded-lg px-3">
                  <UserCheck className="text-pink-400 mr-2" size={20} />
                  <input
                    type="text"
                    value={updatedLastName}
                    onChange={e => setUpdatedLastName(e.target.value)}
                    className="w-full bg-transparent p-2 focus:outline-none"
                    placeholder="Apellido"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-semibold">Email</label>
                <div className="flex items-center bg-gray-50 rounded-lg px-3">
                  <Mail className="text-pink-400 mr-2" size={20} />
                  <input
                    type="email"
                    value={updatedEmail}
                    onChange={e => setUpdatedEmail(e.target.value)}
                    className="w-full bg-transparent p-2 focus:outline-none"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-semibold">Contraseña</label>
                <div className="flex items-center bg-gray-50 rounded-lg px-3">
                  <Edit2 className="text-pink-400 mr-2" size={20} />
                  <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={updatedPassword}
                    onChange={e => setUpdatedPassword(e.target.value)}
                    className="w-full bg-transparent p-2 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-semibold">Teléfono</label>
                <div className="flex items-center bg-gray-50 rounded-lg px-3">
                  <Phone className="text-pink-400 mr-2" size={20} />
                  <PhoneInput
                    className="w-full flex justify-center items-center bg-transparent"
                    defaultCountry="CO"
                    value={updatedPhone}
                    onChange={setUpdatedPhone}
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center text-gray-700 font-semibold">
                  <input
                    type="checkbox"
                    checked={isDonor}
                    onChange={e => setIsDonor(e.target.checked)}
                    className="mr-2 accent-pink-500"
                  />
                  Donante de órganos
                </label>
                <label className="flex items-center text-gray-700 font-semibold">
                  <input
                    type="checkbox"
                    checked={isRecipient}
                    onChange={e => setIsRecipient(e.target.checked)}
                    className="mr-2 accent-blue-400"
                  />
                  Receptor de órganos
                </label>
              </div>
              <div className="flex flex-col gap-3 mt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FF5A5A] to-pink-400 text-white p-3 rounded-lg font-bold shadow-lg hover:from-pink-400 hover:to-[#FF5A5A] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} /> Guardar cambios
                </button>
                <button
                  type="button"
                  className="w-full bg-gray-200 text-gray-700 p-3 rounded-lg font-bold shadow hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                  onClick={() => setEditMode(false)}
                >
                  <XCircle size={20} /> Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <UserIcon className="text-pink-400" size={24} />
                  {user.name} {user.lastname}
                </span>
                <span className="text-gray-600 flex items-center gap-2">
                  <Mail className="text-pink-400" size={18} />
                  {user.email}
                </span>
                <span className="text-gray-600 flex items-center gap-2">
                  <Phone className="text-pink-400" size={18} />
                  {user.phone}
                </span>
                <div className="flex gap-3 mt-2">
                  {user.donor && (
                    <span className="inline-flex items-center px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-semibold">
                      Donante
                    </span>
                  )}
                  {user.recipient && (
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                      Receptor
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-8">
                <button
                  className="w-full bg-gradient-to-r from-[#FF5A5A] to-pink-400 text-white p-3 rounded-lg font-bold shadow-lg hover:from-pink-400 hover:to-[#FF5A5A] transition-all duration-200 flex items-center justify-center gap-2"
                  onClick={handleEdit}
                >
                  <Edit2 size={20} /> Edita tu perfil
                </button>
                <button
                  className="w-full bg-gray-200 text-gray-700 p-3 rounded-lg font-bold shadow hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                  onClick={() => router.push('/user-dashboard')}
                >
                  Visita el panel de usuario
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;