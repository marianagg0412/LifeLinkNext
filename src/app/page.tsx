import Link from 'next/link';
import './styles.css';
export default function HomePage() {
    return (
        <div className='container'>
            <div className='card'>
                <div className='headers'>
                    <h1>Bienvenido a LifeLink</h1>
                    <Link href="/login2">
                        <button className='btn1'>Login</button>
                    </Link>
                    <Link href="/register">
                        <button className='btn1'>Register</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
