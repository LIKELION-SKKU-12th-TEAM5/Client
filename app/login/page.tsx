'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import "./style.css";


export default function Login( {} ) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            setTimeout(() => router.push('/'), 500);
        } else {
            setError(data.error || 'Login failed');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div id = "login">
                <h2>Login</h2>

        <form onSubmit={handleSubmit}>

            <div className="input-group">
                <div className = "icon">
                <FontAwesomeIcon icon={faUser} />
                </div>

                <input className = "input"
                    placeholder = "Email"
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="input-group">
                <div className = "icon">
                <FontAwesomeIcon icon={faLock} />
                </div>
                <input className = "input"
                    placeholder = "Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <div className="error">{error}</div>}
            <button  id = "button" type="submit">Login</button>
        </form>
        </div>
        </div>
        </div>
    );
}