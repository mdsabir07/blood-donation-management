

// import VolunteerDashboardHome from './VolunteerDashboardHome';
// import AdminDashboardHome from './AdminDashboardHome';
import useAuth from '../../../hooks/useAuth';
import useUserRole from '../../../hooks/useUserRole';
import DonorDashboardHome from './DonorDashboardHome/DonorDashboardHome';

const DashboardHome = () => {
    const { user, loading } = useAuth();
    const { role, isLoading: roleLoading } = useUserRole();

    if (loading || roleLoading) return <div className="text-center py-20">Loading...</div>;

    if (role === 'donor') return <DonorDashboardHome />;
    // if (role === 'volunteer') return <VolunteerDashboardHome />;
    // if (role === 'admin') return <AdminDashboardHome />;

    return <p className="text-red-500">No valid role found.</p>;
};

export default DashboardHome;
