import { BookOpen, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import type { UserData } from '../types/types';

interface NavbarProps {
    user: UserData | null;
    handleLogout: () => void;
}

const Navbar = ({ user, handleLogout }: NavbarProps) => {
    const navigate = useNavigate();

    const onLogout = () => {
        handleLogout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="nav-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="logo-icon">
                    <BookOpen size={24} color="white" />
                </div>
                <span className="logo-text">English Test Platform</span>
            </Link>
            <div className="nav-actions">
                {user ? (
                    <div className="user-menu">
                        <span className="user-name">{user.name}</span>
                        <button className="logout-btn" onClick={onLogout}>
                            <LogOut size={18} />
                        </button>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="login-btn">Login</Link>
                        <Link to="/register" className="get-started-btn">Get Started</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
