import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (confirmed) {
            await logout();
            navigate("/home");
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className=" lg:hidden fixed top-4 left-4 z-50 text-white bg-black p-2 rounded"
            >
                ☰
            </button>

            <div
                className={`
                    fixed inset-0 bg-black/30 backdrop-blur-sm
                    z-40 md:hidden
                    transition-opacity duration-500
                    ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
                onClick={() => setIsOpen(false)}
            />

            <aside
                className={`
                    fixed top-0 left-0 h-screen w-50 bg-black text-white p-6 
                    border-r border-neutral-800 z-50
                    transform transition-transform duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >
                <h2 className="text-xl font-bold text-red-600 mb-8 tracking-wide">
                    ADMIN PAGE
                </h2>

                <nav className="flex flex-col gap-4 h-full">
                    <NavLink
                        to="/admin"
                        end
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                            `text-lg font-medium tracking-wide transition
                            ${isActive ? "text-red-600" : "text-gray-400 hover:text-white"}`
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/admin/quizzes"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                            `text-lg font-medium tracking-wide transition
                            ${isActive ? "text-red-600" : "text-gray-400 hover:text-white"}`
                        }
                    >
                        Quizzes
                    </NavLink>

                    <NavLink
                        to="/admin/results"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                            `text-lg font-medium tracking-wide transition
                            ${isActive ? "text-red-600" : "text-gray-400 hover:text-white"}`
                        }
                    >
                        Results
                    </NavLink>

                    <NavLink
                        to="/admin/users"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                            `text-lg font-medium tracking-wide transition
                            ${isActive ? "text-red-600" : "text-gray-400 hover:text-white"}`
                        }
                    >
                        Users
                    </NavLink>

                    <button
                        onClick={handleLogout}
                        className="text-gray-400 hover:text-red-600 text-lg font-medium tracking-wide transition fixed bottom-0 mb-8 hover:cursor-pointer"
                    >
                        Logout
                    </button>
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;

