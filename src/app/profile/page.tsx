'use client';

import { useState, useEffect, use, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import '../styles/ProfileForm.css';
import Header from '../components/atomic-design/organisms/Header';
import { User } from '@/interfaces/user';
import { User as UserIcon, Mail, Phone, Edit2, CheckCircle, XCircle, UserCheck, UserPlus } from 'lucide-react';
import UserProfileCard from '../components/atomic-design/molecules/UserProfileCard';
import MedicalInfoCard from '../components/atomic-design/molecules/MedicalInfoCard';
import MedicalRecordCard from '../components/atomic-design/molecules/MedicalRecordCard';
import { toast } from 'sonner';

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


    const fetchProfile = useCallback(async () => {
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
        toast('Error en la adquisición de datos del perfil');
        router.push('/login');
      }
    }, [router])

    useEffect(() => {
      fetchProfile();
    }, [fetchProfile]);

  const handleUpdate = async (updatedFields: Partial<User>) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.patch('http://localhost:3000/auth/edit-profile', updatedFields, config);
      
      await fetchProfile(); // Refresh the profile data after update
      setEditMode(false);
      toast('El perfil se actualizó correctamente');
      router.push('/user-dashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast("Error al actualizar el perfil");
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
      <div className="min-h-screen flex flex-col md:flex-row items-start justify-center bg-gradient-to-br from-[#FFBABA] via-pink-50 to-blue-50 py-10 gap-6">
        <UserProfileCard
          user={user}
          editMode={editMode}
          onEdit={() => {
            setEditMode(true);
            setUpdatedPhone('');
          }}
          onCancel={() => setEditMode(false)}
          onUpdate={(fields) => handleUpdate(fields)}
          onNavigate={(path) => router.push(path)}
        />
        <div className="flex flex-col gap-6">
          <MedicalInfoCard
            user={user}
            onUpdate={(fields) => handleUpdate(fields)}
          />

          <MedicalRecordCard />

        </div>
      </div>
    </>
  );
};

export default UserProfile;