import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Shared/Loading/Loading";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const from = location.pathname;
    if (loading) return <Loading />;
    if (!user) {
        return <Navigate state={{ from }} to="/login"></Navigate>;
    }
    return children;
};

export default PrivateRoute;