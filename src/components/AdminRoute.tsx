import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AdminRoute = () => {
    const { user, isAuthenticated } = useAuth();

    // If not authenticated or not admin, redirect to admin login
    if (!isAuthenticated || !user ) {
        return <Navigate to="/admin/login" replace />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/home" replace />;
    }

    // If authorized, render child routes
    return <Outlet />;
};

export default AdminRoute;
