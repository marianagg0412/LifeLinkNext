import { User } from "@/interfaces/user";
import { CheckCircle, Edit2, Mail, Phone, UserCheck, UserIcon, UserPlus, XCircle } from "lucide-react";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";


interface Props {
    user: User;
    onUpdate: (fields: Partial<User>) => Promise<void>;
    onCancel: () => void;
    onEdit: () => void;
    editMode: boolean;
    onNavigate: (path: string) => void;
}

const UserProfileCard = ({ user, onUpdate, onCancel, onEdit, editMode, onNavigate }: Props) => {
    const [updatedName, setUpdatedName] = useState(user.name);
    const [updatedLastName, setUpdatedLastName] = useState(user.lastname);
    const [updatedEmail, setUpdatedEmail] = useState(user.email);
    const [updatedPhone, setUpdatedPhone] = useState(user.phone);
    const [updatedPassword, setUpdatedPassword] = useState('');
    const [isDonor, setIsDonor] = useState(user.donor);
    const [isRecipient, setIsRecipient] = useState(user.recipient);


    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const updateObj: Partial<User> = {
          name: updatedName,
          lastname: updatedLastName,
          email: updatedEmail,
          phone: updatedPhone,
          donor: isDonor,
          recipient: isRecipient
      };
      if (updatedPassword && updatedPassword.trim() !== "") {
          updateObj.password = updatedPassword;
      }
      onUpdate(updateObj);
  };

    return (
        <div className="max-w-lg w-full bg-white/90 shadow-2xl rounded-3xl p-10 border border-pink-100 relative animate-fade-in transition-transform hover:scale-105">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gradient-to-tr from-[#FF5A5A] to-pink-400 rounded-full p-2 shadow-lg mb-2">
              <UserIcon className="text-white" size={56} />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-1 tracking-tight">Perfil de Usuario</h1>
            <span className="text-pink-500 font-medium text-lg">{user.email}</span>
          </div>

          {editMode ? (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {[
                { label: 'Nombre', icon: <UserPlus />, value: updatedName, setter: setUpdatedName },
                { label: 'Apellido', icon: <UserCheck />, value: updatedLastName, setter: setUpdatedLastName },
                { label: 'Email', icon: <Mail />, value: updatedEmail, setter: setUpdatedEmail },
              ].map(({ label, icon, value, setter }) => (
                <div key={label}>
                  <label className="block text-gray-700 mb-1 font-semibold">{label}</label>
                  <div className="flex items-center bg-gray-50 rounded-lg px-3">
                    {icon && <span className="text-pink-400 mr-2">{icon}</span>}
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      className="w-full bg-transparent p-2 focus:outline-none"
                      placeholder={label}
                    />
                  </div>
                </div>
              ))}

              <div>
                <label className="block text-gray-700 mb-1 font-semibold">Contraseña</label>
                <div className="flex items-center bg-gray-50 rounded-lg px-3">
                  <Edit2 className="text-pink-400 mr-2" size={20} />
                  <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={updatedPassword}
                    onChange={(e) => setUpdatedPassword(e.target.value)}
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
                    onChange={(e) => setIsDonor(e.target.checked)}
                    className="mr-2 accent-pink-500"
                  />
                  Donante de órganos
                </label>
                <label className="flex items-center text-gray-700 font-semibold">
                  <input
                    type="checkbox"
                    checked={isRecipient}
                    onChange={(e) => setIsRecipient(e.target.checked)}
                    className="mr-2 accent-blue-400"
                  />
                  Receptor de órganos
                </label>
              </div>

              <div className="flex flex-col gap-3 mt-6">
                <button type="submit" className="btn-pink">
                  <CheckCircle size={20} /> Guardar cambios
                </button>
                <button type="button" onClick={onCancel} className="btn-gray">
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
                  onClick={onEdit}
                >
                  <Edit2 size={20} /> Edita tu perfil
                </button>
                <button
                  className="w-full bg-gray-200 text-gray-700 p-3 rounded-lg font-bold shadow hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                  onClick={() => onNavigate('/user-dashboard')}
                >
                  Visita el panel de usuario
                </button>
              </div>
            </div>
          )}
        </div>
    )
};

export default UserProfileCard;