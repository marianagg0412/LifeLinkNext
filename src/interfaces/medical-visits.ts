export interface MedicalVisit {
  id: string;
  visitDate: string;
  reason?: string;
  diagnosis?: string;
  treatment?: string;
  notes?: string;
  userId: string;
}