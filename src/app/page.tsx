import Link from 'next/link';
import './styles.css';
export default function HomePage() {
    return (
        <div className='container'>
            <div className='card'>
                <div className='headers'>
                    <h1>Bienvenido a LifeLink</h1>
                    <Link href="/login">
                        <button type="button">Login</button>
                    </Link>
                    <Link href="/register">
                        <button type="button">Register</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
