// client/src/components/LoginForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, { email, password });
            console.log('Login successful:', data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            // Ana səhifəyə yönləndir
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Daxil ol</button>
        </form>
    );
};