'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import Header from '../components/atomic-design/organisms/Header';
import UserProfileCard from '../components/atomic-design/molecules/UserProfileCard';
import MedicalInfoCard from '../components/atomic-design/molecules/MedicalInfoCard';
import MedicalRecordCard from '../components/atomic-design/molecules/MedicalRecordCard';
import { User } from '@/interfaces/user';
import { fetchUserOrders } from '@/api/orders';
import '../styles/ProfileForm.css';
import 'react-international-phone/style.css';
import { fetchProfile, handleUpdate } from '@/api/user';
import { fetchUserAllergies, fetchUserMedicalConditions, fetchUserMedicalVisits, fetchUserMedications } from '@/api/medical';
import { Allergy } from '@/interfaces/allergies';
import { MedicalCondition } from '@/interfaces/medical-conditions';
import { Medication } from '@/interfaces/medications';
import MedicalVisitsCalendar from '../components/atomic-design/molecules/Calendar';
import { MedicalVisit } from '@/interfaces/medical-visits';

const UserProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [medicalConditions, setMedicalConditions] = useState<MedicalCondition[]>([]);
  const [medicalVisits, setMedicalVisits] = useState<MedicalVisit[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }
        const profileData = await fetchProfile();
        setUser(profileData.user);
        setLoading(false);
        fetchUserOrders();

        const allergiesData = await fetchUserAllergies(profileData.user.id);
        setAllergies(allergiesData);
        const medicalConditionsData = await fetchUserMedicalConditions(profileData.user.id);
        setMedicalConditions(medicalConditionsData);
        const medicationsData = await fetchUserMedications(profileData.user.id);
        setMedications(medicationsData);

        const medicalVisitsData = await fetchUserMedicalVisits(profileData.user.id);
        setMedicalVisits(medicalVisitsData);

      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          router.push('/login');
        } else {
          toast('Error cargando datos del perfil');
        }
        setLoading(false);
      }
    };
    fetchAll();
  }, [router]);

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
          onEdit={() => setEditMode(true)}
          onCancel={() => setEditMode(false)}
          onUpdate={handleUpdate}
          onNavigate={router.push}
        />
        <div className="flex flex-col gap-6">
          <MedicalInfoCard
            user={user}
            medicalConditions={medicalConditions}
            allergies={allergies}
            medications={medications}
            onUpdate={handleUpdate}
          />
          <MedicalVisitsCalendar visits={medicalVisits} />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
