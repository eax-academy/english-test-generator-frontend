import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../services/api';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await forgotPassword({ email });
            setError('Reset link sent to your email.');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to send reset link');
        }
    };

    return (
        <div className="auth-card">
            <h2>Reset Password</h2>
            {error && <div className={`auth-message ${error === 'Reset link sent to your email.' ? 'success' : ''}`}>{error}</div>}
            <form onSubmit={handleForgotPassword}>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="auth-submit-btn">
                    Send Reset Link
                </button>
                <p className="auth-switch">
                    <Link to="/login" style={{ cursor: 'pointer', color: 'var(--primary)', textDecoration: 'none' }}>
                        Back to Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
