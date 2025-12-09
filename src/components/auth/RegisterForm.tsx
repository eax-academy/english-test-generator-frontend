import { useState } from 'react';
import { registerUser } from '../../services/api';

interface RegisterFormProps {
    setView: (view: any) => void;
}

const RegisterForm = ({ setView }: RegisterFormProps) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await registerUser({ name, surname, email, password });
            setView('login');
            // Normally you'd pass a success message to the login view, but for now we can just redirect
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-card">
            <h2>Create Account</h2>
            {error && <div className="auth-message">{error}</div>}
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Surname</label>
                    <input
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
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
                <button type="submit" className="auth-submit-btn">
                    Sign Up
                </button>
            </form>
            <p className="auth-switch">
                Already have an account?{' '}
                <span onClick={() => setView('login')}>
                    Login
                </span>
            </p>
        </div>
    );
};

export default RegisterForm;
