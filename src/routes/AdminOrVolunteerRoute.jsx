import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Loading from "../pages/Shared/Loading/Loading";


const AdminOrVolunteerRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, isRoleLoading } = useUserRole();
  const location = useLocation();

  if (authLoading || isRoleLoading) return <Loading />;

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  if (role === 'admin' || role === 'volunteer') {
    return children;
  }

  return <p className="text-center text-error py-10">Access Denied</p>;
};

export default AdminOrVolunteerRoute;