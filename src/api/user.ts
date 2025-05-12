import axios from "axios";
import { User } from "next-auth";
import { toast } from "sonner";

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

const API_BASE = 'http://localhost:3000';

export const fetchProfile = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/auth/profile`, getAuthHeaders());
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    toast.error('Error en la adquisición de datos del perfil');
    throw error;
  }
};

export const handleUpdate = async (updatedFields: Partial<User>) => {
  try {
    await axios.patch(`${API_BASE}/auth/edit-profile`, updatedFields, getAuthHeaders());
    toast.success('El perfil se actualizó correctamente');
    await fetchProfile();
  } catch (error) {
    console.error('Error updating profile:', error);
    toast.error('Error al actualizar el perfil');
    throw error;
  }
};