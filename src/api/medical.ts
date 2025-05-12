import { Allergy } from "@/interfaces/allergies";
import { MedicalCondition } from "@/interfaces/medical-conditions";
import { MedicalVisit } from "@/interfaces/medical-visits";
import { Medication } from "@/interfaces/medications";
import axios from "axios";

const API_BASE = 'http://localhost:3000';

export const fetchUserMedications = async (userId: string): Promise<Medication[]> => {
  const token = localStorage.getItem('token');
  const { data } = await axios.get(`${API_BASE}/medication/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const fetchUserAllergies = async (userId: string): Promise<Allergy[]> => {
  const token = localStorage.getItem('token');
  const { data } = await axios.get(`${API_BASE}/allergy/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const fetchUserMedicalConditions = async (userId: string): Promise<MedicalCondition[]> => {
  const token = localStorage.getItem('token');
  const { data } = await axios.get(`${API_BASE}/medical-conditions/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const fetchUserMedicalVisits = async (userId: string): Promise<MedicalVisit[]> => {
  const token = localStorage.getItem('token');
  const { data } = await axios.get(`${API_BASE}/medical-visits/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};