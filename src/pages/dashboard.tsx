import router from 'next/router';
import { useState } from 'react';
import '../styles/DashboardForm.css';

const Dashboard = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleBtnClick = () => {
        toggleDropdown();
    };

    return (
        <div>
            <h1> Próximamente la página principal...</h1>
            <div style={{position: 'absolute', top: 30, right: 10}}>
                <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt="Menu" onClick={toggleDropdown} style={{cursor: 'pointer', height:50}} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div className="dropdown" style={{display: showDropdown? 'block' : 'none'}}>
                    <button type="button" onClick={() => router.push('/')}>Cerrar sesión</button>
                    <button type="button" onClick={() => router.push('/profile')}>Abrir perfil</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
