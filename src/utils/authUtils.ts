import axios from "axios";


export const getUserRole = async () :Promise<string> => {
    const token = localStorage.getItem('token');

    if(!token) return '';

    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("🟢 User role:", res.data.user.roles);

        return res.data.user.roles || '';
    } catch (error) {
        console.error("Error fetching user role:", error);
        return '';
    };
}

export const isAdminUser = async () :Promise<boolean> => {
    const roles = await getUserRole();
    return roles.includes('admin');
}
