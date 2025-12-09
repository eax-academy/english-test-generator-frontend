import { BookOpen, LogOut } from 'lucide-react';
import type { UserData } from '../types';

interface NavbarProps {
    view: string;
    setView: (view: 'landing' | 'login' | 'register') => void; // specific types or just string
    user: UserData | null;
    handleLogout: () => void;
}

const Navbar = ({ view, setView, user, handleLogout }: NavbarProps) => {
    return (
        <nav className="navbar">
            <div className="nav-logo" onClick={() => setView('landing')}>
                <div className="logo-icon">
                    <BookOpen size={24} color="white" />
                </div>
                <span className="logo-text">English Test Platform</span>
            </div>
            <div className="nav-actions">
                {view === 'dashboard' ? (
                    <div className="user-menu">
                        <span className="user-name">{user?.name}</span>
                        <button className="logout-btn" onClick={handleLogout}>
                            <LogOut size={18} />
                        </button>
                    </div>
                ) : (
                    <>
                        <button className="login-btn" onClick={() => setView('login')}>Login</button>
                        <button className="get-started-btn" onClick={() => setView('register')}>Get Started</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
