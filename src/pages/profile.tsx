import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
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
        <div className='container'>
            <div className='card'>
                <h1 className='headers'>User Profile</h1>
                {editMode ? (
                    <>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" placeholder="New Password" value={updatedPassword} onChange={(e) => setUpdatedPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Teléfono</label>
                            <PhoneInput
                                className='phoneInput'
                                defaultCountry="CO"
                                value={updatedPhone}
                                onChange={setUpdatedPhone}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <input type="checkbox" checked={isDonor} onChange={(e) => setIsDonor(e.target.checked)} />
                                Soy donante de órganos
                            </label>
                            <label>
                                <input type="checkbox" checked={isRecipient} onChange={(e) => setIsRecipient(e.target.checked)} />
                                Soy receptor de órganos
                            </label>
                        </div>
                        <button className='btn1' onClick={handleUpdate}>Guardar cambios</button>
                        <button className='btn2' onClick={() => setEditMode(false)}>Cancelar</button>
                    </>
                ) : (
                    <>
                        <p className='profileData'><strong>Name:</strong> {user.name} {user.lastname}</p>
                        <p className='profileData'><strong>Email:</strong> {user.email}</p>
                        <p className='profileData'><strong>Teléfono:</strong> {user.phone}</p>
                        <button className='btn1' onClick={handleEdit}>Edita tu perfil</button>
                        <button className='btn2' onClick={() => router.push('/dashboard')}>Regresar a la página principal</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default UserProfile;
