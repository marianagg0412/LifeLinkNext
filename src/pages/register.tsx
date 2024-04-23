import React, { useState } from 'react';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(email, password);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="px-4 py-2 border rounded-md" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="px-4 py-2 border rounded-md" />
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Register</button>
        </form>
    );
};

export default Register;
