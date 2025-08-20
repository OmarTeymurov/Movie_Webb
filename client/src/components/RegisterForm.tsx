// client/src/components/RegisterForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

export const RegisterForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, { name, email, password });
            console.log('Registration successful:', data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            // Login səhifəsinə və ya ana səhifəyə yönləndir
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Qeydiyyat</h2>
            <input type="text" placeholder="Adınız" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Şifrə" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Qeydiyyatdan keç</button>
        </form>
    );
};