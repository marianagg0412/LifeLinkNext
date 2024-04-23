// Correctly import useRouter from 'next/navigation'
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const router = useRouter();

    const handleLogin = () => {
        router.push('/login');
    };

    const handleRegister = () => {
        router.push('/register');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Our Application</h1>
            <button onClick={handleLogin} style={{ margin: '20px', padding: '10px 20px' }}>Login</button>
            <button onClick={handleRegister} style={{ margin: '20px', padding: '10px 20px' }}>Register</button>
        </div>
    );
}
