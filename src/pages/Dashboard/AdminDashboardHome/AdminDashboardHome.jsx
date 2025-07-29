import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useUserRole from '../../../hooks/useUserRole';
import { FaUsers, FaHandHoldingUsd, FaTint } from 'react-icons/fa';
import Loading from '../../Shared/Loading/Loading';
import { Link } from 'react-router';
import DonationRequestCharts from '../DashComponents/DonationRequestCharts/DonationRequestCharts';

const AdminDashboardHome = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { role, isRoleLoading } = useUserRole();

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalFunding: 0,
        totalRequests: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axiosSecure.get('/admin/dashboard-stats');
                setStats(res.data);
            } catch (err) {
                console.error('Failed to load admin stats', err);
            }
        };

        if (role === 'admin') fetchStats();
    }, [axiosSecure, role]);

    if (authLoading || isRoleLoading) return <Loading />;

    if (role !== 'admin') {
        return <p className="text-red-500 text-center py-10">Access denied. Admins only.</p>;
    }

    return (
        <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <h2 className="text-2xl font-bold">Welcome, {user?.displayName || 'Admin'} 👋</h2>

            {/* Give Fund Button */}
            <div className="mt-4">
                <Link to="/dashboard/funding" className="btn btn-primary">
                    💳 Give Fund
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Total Donors */}
                <div className="bg-base-200 p-6 rounded shadow flex items-center gap-4">
                    <FaUsers className="text-3xl text-primary" />
                    <div>
                        <h3 className="text-xl font-bold">{stats.totalUsers}</h3>
                        <p className="text-gray-600">Total Donors</p>
                    </div>
                </div>

                {/* Total Funding */}
                <div className="bg-base-200 p-6 rounded shadow flex items-center gap-4">
                    <FaHandHoldingUsd className="text-3xl text-green-600" />
                    <div>
                        <h3 className="text-xl font-bold">${stats.totalFunding.toFixed(2)}</h3>
                        <p className="text-gray-600">Total Funding</p>
                    </div>
                </div>

                {/* Total Requests */}
                <div className="bg-base-200 p-6 rounded shadow flex items-center gap-4">
                    <FaTint className="text-3xl text-red-500" />
                    <div>
                        <h3 className="text-xl font-bold">{stats.totalRequests}</h3>
                        <p className="text-gray-600">Donation Requests</p>
                    </div>
                </div>
            </div>
            {/* charts */}
            <DonationRequestCharts />
        </div>
    );
};

export default AdminDashboardHome;