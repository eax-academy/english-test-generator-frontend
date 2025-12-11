import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/api';
import type { UserData } from '../../types/types';

interface LoginFormProps {
    setUser: (user: UserData) => void;
}

const LoginForm = ({ setUser }: LoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await loginUser({ email, password });
            localStorage.setItem('token', response.data.token);
            // Check if name is top-level OR inside a user object
            const userName = response.data.name || response.data.user?.name || 'User';
            setUser({ name: userName, email });
            navigate('/dashboard');
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
                    <Link
                        to="/forgot-password"
                        style={{ color: 'var(--primary)', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'none' }}
                    >
                        Forgot Password?
                    </Link>
                </div>
                <button type="submit" className="auth-submit-btn">
                    Login
                </button>
            </form>
            <p className="auth-switch">
                Don't have an account?{' '}
                <Link to="/register" style={{ cursor: 'pointer', color: 'var(--primary)', textDecoration: 'none' }}>
                    Sign up
                </Link>
            </p>
        </div>
    );
};

export default LoginForm;
