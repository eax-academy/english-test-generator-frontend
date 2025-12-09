import { useState, useEffect } from 'react';
import './App.css';
import type { UserData } from './types';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import ResetPasswordForm from './components/auth/ResetPasswordForm';

function App() {
    const [view, setView] = useState<'landing' | 'login' | 'register' | 'forgot-password' | 'reset-password' | 'dashboard'>('landing');
    const [user, setUser] = useState<UserData | null>(null);
    const [resetToken, setResetToken] = useState('');

    useEffect(() => {
        // Check for token in localStorage on load
        const token = localStorage.getItem('token');
        if (token) {
            // here you might want to fetch user data if you had an endpoint for it
            // for now, we just rely on the user logging in again or persisting user state
        }
    }, []);

    useEffect(() => {
        // Check for reset password URL pattern
        // Assuming URL: /reset-password/:token
        const path = window.location.pathname;
        if (path.startsWith('/reset-password/')) {
            const token = path.split('/')[2];
            if (token) {
                setResetToken(token);
                setView('reset-password');
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setView('landing');
    };

    return (
        <div className="app-container">
            <Navbar view={view} setView={setView} user={user} handleLogout={handleLogout} />

            {/* Content Switcher */}
            {view === 'landing' && <LandingPage setView={setView} />}

            {view === 'dashboard' && <Dashboard user={user} />}

            {(view === 'login' || view === 'register' || view === 'forgot-password' || view === 'reset-password') && (
                <div className="auth-container">
                    {view === 'login' && <LoginForm setView={setView} setUser={setUser} />}
                    {view === 'register' && <RegisterForm setView={setView} />}
                    {view === 'forgot-password' && <ForgotPasswordForm setView={setView} />}
                    {view === 'reset-password' && <ResetPasswordForm setView={setView} resetToken={resetToken} />}
                </div>
            )}
        </div>
    );
}

export default App;
