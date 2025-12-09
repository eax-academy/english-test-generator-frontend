import { useState } from 'react';
import { resetPassword } from '../../services/api';

interface ResetPasswordFormProps {
    setView: (view: any) => void;
    resetToken: string;
}

const ResetPasswordForm = ({ setView, resetToken }: ResetPasswordFormProps) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await resetPassword({ token: resetToken, newPassword: password });
            alert('Password reset successful! Please login.');
            setView('login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to reset password');
        }
    };

    return (
        <div className="auth-card">
            <h2>Set New Password</h2>
            {error && <div className="auth-message">{error}</div>}
            <form onSubmit={handleResetPassword}>
                <div className="form-group">
                    <label>New Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="auth-submit-btn">
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordForm;
