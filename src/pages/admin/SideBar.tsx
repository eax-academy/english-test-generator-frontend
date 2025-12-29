import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

function Sidebar() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        const confirmed = window.confirm("Are you sure you want to logout?");

        if (confirmed) {
            navigate("/home");
            setTimeout(() => {
                logout();
            }, 50);
        }
    };


    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-black text-white p-6 border-r border-neutral-800">
            <h2 className="text-xl font-bold text-red-600 mb-8 tracking-wide">
                ADMIN PAGE
            </h2>

            <nav className="flex flex-col gap-4">
                <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                        `text-lg font-medium tracking-wide transition
             ${isActive ? "text-red-600" : "text-gray-400 hover:text-white"}`
                    }
                    end
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/quizzes"
                    className={({ isActive }) =>
                        `text-lg font-medium tracking-wide transition
             ${isActive ? "text-red-600" : "text-gray-400 hover:text-white"}`
                    }
                >
                    Quizzes
                </NavLink>

                <NavLink
                    to="/admin/results"
                    className={({ isActive }) =>
                        `text-lg font-medium tracking-wide transition
             ${isActive ? "text-red-600" : "text-gray-400 hover:text-white"}`
                    }
                >
                    Results
                </NavLink>

                <NavLink
                    to="/admin/users"
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
    );
}

export default Sidebar;
