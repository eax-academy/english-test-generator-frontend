import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import type { UserData } from './types/types';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import ResetPasswordForm from './components/auth/ResetPasswordForm';
import QuizPage from './pages/QuizPage';
import QuizGenerator from './components/QuizGenerator';
import ResultsPage from './pages/ResultsPage';

function App() {
    const [user, setUser] = useState<UserData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for token in localStorage on load
        const token = localStorage.getItem('token');
        if (token) {
            // here you might want to fetch user data if you had an endpoint for it
            // for now, we just rely on the user logging in again or persisting user state
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    return (
        <div className="app-container">
            <Navbar user={user} handleLogout={handleLogout} />

            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard user={user} />} />

                <Route path="/login" element={
                    <div className="auth-container">
                        <LoginForm setUser={setUser} />
                    </div>
                } />

                <Route path="/register" element={
                    <div className="auth-container">
                        <RegisterForm />
                    </div>
                } />
                <Route path="/results/:quizId" element={<ResultsPage />} />
                <Route path='/quiz/:quizId' element={<QuizPage />} />
                <Route path='/generate' element={<QuizGenerator />} />

                <Route path="/forgot-password" element={
                    <div className="auth-container">
                        <ForgotPasswordForm />
                    </div>
                } />

                <Route path="/reset-password/:token?" element={
                    <div className="auth-container">
                        <ResetPasswordForm />
                    </div>
                } />

                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

export default App;
