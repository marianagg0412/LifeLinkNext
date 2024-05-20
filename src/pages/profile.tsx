import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { tw } from 'twind';
import '../styles/ProfileForm.css';


interface User {
    name: string;
    lastname: string;
    password: string
    email: string;
    phone: string;
    donor: boolean;
    recipient: boolean;
  }


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
    const [loading, setLoading] = useState(true); // Add loading state
    const [temp, setTemp] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.get('http://localhost:3000/auth/profile', config);
                setUser(response.data.user);
                setUpdatedName(response.data.user.name);
                setUpdatedLastName(response.data.user.lastname);
                setUpdatedEmail(response.data.user.email);
                setTemp(response.data.user.phone);
                setUpdatedPhone(response.data.user.phone);
                setIsDonor(response.data.user.donor);
                setIsRecipient(response.data.user.recipient);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching profile data:', error);
                alert('Error fetching profile data');
                alert(error);
                router.push('/login');
            }
        };

        fetchProfile();
    }, [router]);

    const handleEdit = () => {
        setEditMode(true);
        setUpdatedPhone(''); // Reset phone number when entering edit mode
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
    
            // Create an object with the updated fields
            const updatedFields: Partial<User> = {};
            if (updatedName) updatedFields.name = updatedName;
            if (updatedLastName) updatedFields.lastname = updatedLastName;
            if (updatedEmail) updatedFields.email = updatedEmail;
            if (updatedPhone.length > 3) updatedFields.phone = updatedPhone;
            if (updatedPassword) updatedFields.password = updatedPassword;
            updatedFields.donor = isDonor;
            updatedFields.recipient = isRecipient;
    
            const response = await axios.patch('http://localhost:3000/auth/edit-profile', updatedFields, config);
            setUser(response.data.user);
            setEditMode(false);
            alert('El perfil se actualizó correctamente');
            router.push('/dashboard');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert(error);
        }
    };
    

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while fetching data
    }

    if (!user) {
        return <div>Error loading user data</div>; // Show error if user data is not available
    }

    return (
        <div className={tw(`min-h-screen flex items-center justify-center bg-gray-100`)}>
          <div className={tw(`max-w-md w-full bg-white shadow-md rounded-lg p-8`)}>
            <h1 className={tw(`text-3xl font-bold text-center mb-6`)}>Perfil de Usuario</h1>
            {editMode ? (
              <>
                <div className={tw(`mb-4`)}>
                  <label htmlFor="email" className={tw(`block text-gray-700 mb-2`)}>Email</label>
                  <input
                    type="email"
                    value={updatedEmail}
                    onChange={(e) => setUpdatedEmail(e.target.value)}
                    className={tw(`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`)}
                  />
                </div>
                <div className={tw(`mb-4`)}>
                  <label htmlFor="password" className={tw(`block text-gray-700 mb-2`)}>Contraseña</label>
                  <input
                    type="password"
                    placeholder="New Password"
                    value={updatedPassword}
                    onChange={(e) => setUpdatedPassword(e.target.value)}
                    className={tw(`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`)}
                  />
                </div>
                <div className={tw(`mb-4`)}>
                    <label htmlFor="phone" className={tw(`block text-gray-700 mb-2`)}>Teléfono</label>
                        <PhoneInput
                            className={tw(`w-full p-3 flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-blue-500`)}
                            defaultCountry="CO"
                            value={updatedPhone}
                            onChange={setUpdatedPhone}
                        />
                </div>
                <div className={tw(`mb-4`)}>
                  <label className={tw(`block text-gray-700 mb-2`)}>
                    <input
                      type="checkbox"
                      checked={isDonor}
                      onChange={(e) => setIsDonor(e.target.checked)}
                      className={tw(`mr-2`)}
                    />
                    Soy donante de órganos
                  </label>
                  <label className={tw(`block text-gray-700 mb-2`)}>
                    <input
                      type="checkbox"
                      checked={isRecipient}
                      onChange={(e) => setIsRecipient(e.target.checked)}
                      className={tw(`mr-2`)}
                    />
                    Soy receptor de órganos
                  </label>
                </div>
                <button
                  className={tw(`w-full bg-[#FF5A5A] text-white p-3 rounded-lg font-semibold hover:bg-[#FF3A3A] transition duration-200`)}
                  onClick={handleUpdate}
                >
                  Guardar cambios
                </button>
                <button
                  className={tw(`w-full bg-gray-500 text-white p-3 rounded-lg font-semibold mt-4 hover:bg-gray-600 transition duration-200`)}
                  onClick={() => setEditMode(false)}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <p className={tw(`text-lg mb-2`)}><strong>Name:</strong> {user.name} {user.lastname}</p>
                <p className={tw(`text-lg mb-2`)}><strong>Email:</strong> {user.email}</p>
                <p className={tw(`text-lg mb-4`)}><strong>Teléfono:</strong> {user.phone}</p>
                <button
                  className={tw(`w-full bg-[#FF5A5A] text-white p-3 rounded-lg font-semibold hover:bg-[#FF3A3A] transition duration-200`)}
                  onClick={handleEdit}
                >
                  Edita tu perfil
                </button>
                <button
                  className={tw(`w-full bg-gray-500 text-white p-3 rounded-lg font-semibold mt-4 hover:bg-gray-600 transition duration-200`)}
                  onClick={() => router.push('/dashboard')}
                >
                  Regresar al dashboard
                </button>
              </>
            )}
          </div>
        </div>
      );
    };

export default UserProfile;
