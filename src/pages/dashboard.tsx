import {useRouter} from "next/router";
import '../styles/LoginForm.css';

const Dashboard = () => {
    const router = useRouter();
    return(
        <div>
            <h1> Ha ingresado correctamente a su panel de control</h1>
            <div style={{position: 'absolute', top: 30, right:10}}>
                <button type="button" onClick={() => router.push('/')}>
                    Cerrar sesión
                </button>
            </div>
        </div>
    )
}
export default Dashboard;