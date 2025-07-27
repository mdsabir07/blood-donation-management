import useUserRole from '../../../hooks/useUserRole';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../Shared/Loading/Loading';
import AdminDonationRequests from '../AdminDashboardHome/AdminDonationRequests';
import VolunteerDonationRequests from '../VolunteerDashboardHome/VolunteerDonationRequests';

const AllDonationRequests = () => {
    const { role, isRoleLoading } = useUserRole();
    const { loading: authLoading } = useAuth();

    if (authLoading || isRoleLoading) return <Loading />;

    if (role === 'admin') return <AdminDonationRequests />;
    if (role === 'volunteer') return <VolunteerDonationRequests />;

    return <p className="text-error text-center py-10">Access denied.</p>;
};

export default AllDonationRequests;