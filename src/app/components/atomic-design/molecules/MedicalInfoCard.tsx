import { Allergy } from "@/interfaces/allergies";
import { MedicalCondition } from "@/interfaces/medical-conditions";
import { Medication } from "@/interfaces/medications";
import { User } from "@/interfaces/user";
import { CheckCircle, Edit2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
    user: User;
    medicalConditions: MedicalCondition[];
    allergies: Allergy[];
    medications: Medication[];
    onUpdate: (fields: Partial<User>) => Promise<void>;
}

const MedicalInfoCard = ({ user, medicalConditions, allergies, medications, onUpdate }: Props) => {
    const [editMode, setEditMode] = useState(false);
    const [bloodType, setBloodType] = useState(user.bloodType || '');
    const [medicalConditionList, setMedicalConditionList] = useState<MedicalCondition[]>(medicalConditions);
    const [allergyList, setAllergyList] = useState<Allergy[]>(allergies);
    const [medicationList, setMedicationList] = useState<Medication[]>(medications);

    useEffect(() => {
        setBloodType(user.bloodType || '');
        setMedicalConditionList(medicalConditions);
        setAllergyList(allergies);
        setMedicationList(medications);
    }, [user, medicalConditions, allergies, medications]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onUpdate({
            bloodType,
        });
        setEditMode(false);
    };

    const handleMedicalConditionChange = (index: number, field: keyof MedicalCondition, value: string) => {
        const updatedConditions = [...medicalConditionList];
        updatedConditions[index] = { ...updatedConditions[index], [field]: value };
        setMedicalConditionList(updatedConditions);
    };

    const handleAllergyChange = (index: number, field: keyof Allergy, value: string) => {
        const updatedAllergies = [...allergyList];
        updatedAllergies[index] = { ...updatedAllergies[index], [field]: value };
        setAllergyList(updatedAllergies);
    };

    const handleMedicationChange = (index: number, field: keyof Medication, value: string) => {
        const updatedMedications = [...medicationList];
        updatedMedications[index] = { ...updatedMedications[index], [field]: value };
        setMedicationList(updatedMedications);
    };

    return (
        <div className="max-w-lg w-full bg-white/90 shadow-2xl rounded-3xl p-10 border border-pink-100 relative animate-fade-in transition-transform hover:scale-105">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
                🩺 Información médica
            </h2>

            {editMode ? (
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo de sangre</label>
                        <input
                            type="text"
                            value={bloodType}
                            onChange={(e) => setBloodType(e.target.value)}
                            placeholder="Ej. A+"
                            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                        />
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Condiciones médicas</h3>
                        {medicalConditionList.map((condition, index) => (
                            <div key={condition.id} className="space-y-2">
                                <input
                                    type="text"
                                    value={condition.name}
                                    onChange={(e) => handleMedicalConditionChange(index, 'name', e.target.value)}
                                    placeholder="Ej. Diabetes"
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                                />
                            </div>
                        ))}
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Alergias</h3>
                        {allergyList.map((allergy, index) => (
                            <div key={allergy.id} className="space-y-2">
                                <input
                                    type="text"
                                    value={allergy.name}
                                    onChange={(e) => handleAllergyChange(index, 'name', e.target.value)}
                                    placeholder="Ej. Polen"
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                                />
                            </div>
                        ))}
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Medicamentos</h3>
                        {medicationList.map((medication, index) => (
                            <div key={medication.id} className="space-y-2">
                                <input
                                    type="text"
                                    value={medication.name}
                                    onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                                    placeholder="Ej. Insulina"
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                                />
                            </div>
                        ))}
                    </div>

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

                    <div>
                        <span className="font-semibold">⚕️ Condiciones médicas:</span>
                        {medicalConditionList.length > 0 ? (
                            medicalConditionList.map((condition) => (
                                <p key={condition.id}>{condition.name}</p>
                            ))
                        ) : (
                            <span className="italic text-gray-400">No especificado</span>
                        )}
                    </div>

                    <div>
                        <span className="font-semibold">🌿 Alergias:</span>
                        {allergyList.length > 0 ? (
                            allergyList.map((allergy) => (
                                <p key={allergy.id}>{allergy.name}</p>
                            ))
                        ) : (
                            <span className="italic text-gray-400">No especificado</span>
                        )}
                    </div>

                    <div>
                        <span className="font-semibold">💊 Medicamentos:</span>
                        {medicationList.length > 0 ? (
                            medicationList.map((medication) => (
                                <p key={medication.id}>{medication.name}</p>
                            ))
                        ) : (
                            <span className="italic text-gray-400">No especificado</span>
                        )}
                    </div>

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
