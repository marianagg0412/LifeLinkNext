export interface MedicalCondition {
    id: string;
    name: string;
    description: string;
    severity: 'Mild' | 'Moderate' | 'Severe';
    diagnosisDate: Date;
    treatments: string[];
    status: 'Active' | 'In Remission' | 'Resolved';
    medications: string[];
    complications: string[];
    healthcareProvider: string;
    followUpDate: Date;
    notes: string;
    userId: string;
}
