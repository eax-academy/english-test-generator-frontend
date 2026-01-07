import { createContext, useState, useEffect, useContext } from "react";
import type { User } from "../types/types";
import { apiLogout } from "../api/auth.api";

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // To prevent flash of wrong UI

    useEffect(() => {
        // Initialize auth state from localStorage on mount
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        // Check for invalid "undefined" string which might have been stored by bug
        if (storedUser && storedToken && storedToken !== "undefined") {
            try {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Failed to parse stored user", error);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        } else {
            // Invalid state, clear everything
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
        setLoading(false);
    }, []);

    const login = (userData: User, token: string) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        apiLogout();
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
