export interface User {
    id: string;
    name: string;
    lastname: string;
    password: string
    email: string;
    phone: string;
    donor: boolean;
    recipient: boolean;
    bloodType: string;
}