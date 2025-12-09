import { useState } from 'react';
import { loginUser } from '../../services/api';
import type { UserData } from '../../types';

interface LoginFormProps {
    setView: (view: any) => void;
    setUser: (user: UserData) => void;
}

const LoginForm = ({ setView, setUser }: LoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await loginUser({ email, password });
            localStorage.setItem('token', response.data.token);
            // Check if name is top-level OR inside a user object
            const userName = response.data.name || response.data.user?.name || 'User';
            setUser({ name: userName, email });
            setView('dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-card">
            <h2>Welcome Back</h2>
            {error && <div className="auth-message">{error}</div>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                    <span
                        style={{ color: 'var(--primary)', cursor: 'pointer', fontSize: '0.9rem' }}
                        onClick={() => setView('forgot-password')}
                    >
                        Forgot Password?
                    </span>
                </div>
                <button type="submit" className="auth-submit-btn">
                    Login
                </button>
            </form>
            <p className="auth-switch">
                Don't have an account?{' '}
                <span onClick={() => setView('register')}>
                    Sign up
                </span>
            </p>
        </div>
    );
};

export default LoginForm;
