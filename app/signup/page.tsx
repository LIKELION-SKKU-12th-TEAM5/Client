'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            setSuccess('Signup successful! You can now log in.');
            // Redirect to login page after successful signup
            setTimeout(() => router.push('/login'), 500); // Redirect after 2 seconds
        } else {
            setError(data.error || 'Signup failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">email</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <button type="submit">Sign Up</button>
        </form>
    );
}
