import { User } from "@/interfaces/user";
import { CheckCircle, Edit2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
    user: User;
    onUpdate: (fields: Partial<User>) => Promise<void>;
}

const MedicalInfoCard = ({ user, onUpdate }: Props) => {
    const [editMode, setEditMode] = useState(false);
    const [bloodType, setBloodType] = useState(user.bloodType || '');
    const [medicalConditions, setMedicalConditions] = useState(user.medicalConditions || '');
    const [allergies, setAllergies] = useState(user.allergies || '');
    const [medications, setMedications] = useState(user.medications || '');

    useEffect(() => {
        setBloodType(user.bloodType || '');
        setMedicalConditions(user.medicalConditions || '');
        setAllergies(user.allergies || '');
        setMedications(user.medications || '');
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onUpdate({
            bloodType,
            medicalConditions,
            allergies,
            medications
        });
        setEditMode(false);
    };

    return (
        <div className="bg-white/90 shadow-2xl rounded-3xl p-8 w-full max-w-sm border border-pink-100 animate-fade-in">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-4">Informacion medica</h2>
            {editMode ? (
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold">Tipo de sangre</label>
                        <input 
                            type="text" 
                            value={bloodType}
                            onChange={(e) => setBloodType(e.target.value)}
                            className="w-full p-2 rounded border focus:outline-none "
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold">Condiciones medicas</label>
                        <input 
                            type="text" 
                            value={medicalConditions}
                            onChange={(e) => setMedicalConditions(e.target.value)}
                            className="w-full p-2 rounded border focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold">Alergias</label>
                        <input 
                            type="text" 
                            value={allergies}
                            onChange={(e) => setAllergies(e.target.value)}
                            className="w-full p-2 rounded border focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold">Medicacion</label>
                        <input 
                            type="text" 
                            value={medications}
                            onChange={(e) => setMedications(e.target.value)}
                            className="w-full p-2 rounded border focus:outline-none"
                        />
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded flex items-center gap-2">
                            <CheckCircle size={20} /> Guardar
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            className="bg-gray-300 text-gray-700 py-2 px-4 rounded flex items-center gap-2"
                        >
                            <XCircle size={20} /> Cancelar
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-2 text-gray-600">
                    <p><strong>Tipo de sangre:</strong> {bloodType || 'N/A'}</p>
                    <p><strong>Condiciones médicas:</strong> {medicalConditions || 'N/A'}</p>
                    <p><strong>Alergias:</strong> {allergies || 'N/A'}</p>
                    <p><strong>Medicamentos:</strong> {medications || 'N/A'}</p>
                    <button
                        onClick={() => setEditMode(true)}
                        className="mt-4 bg-pink-500 text-white py-2 px-4 rounded flex items-center gap-2"
                    >
                        <Edit2 size={20} /> Editar
                    </button>
                </div>
            )}
        </div>
    );
};

export default MedicalInfoCard;