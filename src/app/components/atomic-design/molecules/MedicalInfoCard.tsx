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
        <div className="bg-gradient-to-br from-pink-50 to-blue-50 shadow-xl rounded-3xl p-8 w-full max-w-sm border border-pink-200 animate-fade-in transition-transform hover:scale-105">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
                🩺 Información médica
            </h2>
    
            {editMode ? (
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {[ 
                        { label: 'Tipo de sangre', value: bloodType, setter: setBloodType, placeholder: 'Ej. A+' },
                        { label: 'Condiciones médicas', value: medicalConditions, setter: setMedicalConditions, placeholder: 'Ej. Diabetes' },
                        { label: 'Alergias', value: allergies, setter: setAllergies, placeholder: 'Ej. Polen' },
                        { label: 'Medicamentos', value: medications, setter: setMedications, placeholder: 'Ej. Insulina' }
                    ].map(({ label, value, setter, placeholder }) => (
                        <div key={label}>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => setter(e.target.value)}
                                placeholder={placeholder}
                                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                            />
                        </div>
                    ))}
    
                    <div className="flex gap-3 mt-6">
                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-pink-500 to-pink-400 text-white py-2 px-4 rounded-lg font-semibold shadow hover:from-pink-600 hover:to-pink-500 transition flex items-center justify-center gap-2"
                        >
                            <CheckCircle size={20} /> Guardar
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold shadow hover:bg-gray-300 transition flex items-center justify-center gap-2"
                        >
                            <XCircle size={20} /> Cancelar
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-3 text-gray-700">
                    <p>
                        <span className="font-semibold">🩸 Tipo de sangre:</span>{' '}
                        {bloodType || <span className="italic text-gray-400">No especificado</span>}
                    </p>
                    <p>
                        <span className="font-semibold">⚕️ Condiciones médicas:</span>{' '}
                        {medicalConditions || <span className="italic text-gray-400">No especificado</span>}
                    </p>
                    <p>
                        <span className="font-semibold">🌿 Alergias:</span>{' '}
                        {allergies || <span className="italic text-gray-400">No especificado</span>}
                    </p>
                    <p>
                        <span className="font-semibold">💊 Medicamentos:</span>{' '}
                        {medications || <span className="italic text-gray-400">No especificado</span>}
                    </p>
    
                    <button
                        onClick={() => setEditMode(true)}
                        className="mt-6 w-full bg-gradient-to-r from-pink-500 to-pink-400 text-white py-2 px-4 rounded-lg font-semibold shadow hover:from-pink-600 hover:to-pink-500 transition flex items-center justify-center gap-2"
                    >
                        <Edit2 size={20} /> Editar
                    </button>
                </div>
            )}
        </div>
    );
};

export default MedicalInfoCard;