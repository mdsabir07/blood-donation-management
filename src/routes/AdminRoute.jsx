import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Loading from "../pages/Shared/Loading/Loading";

const AdminRoute = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const { role, isRoleLoading } = useUserRole();
    const location = useLocation();

    if (authLoading || isRoleLoading) {
        return <Loading />;
    }

    if (user && role === 'admin') {
        return children;
    }

    // Redirect to forbidden or home if not admin
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
};

export default AdminRoute;