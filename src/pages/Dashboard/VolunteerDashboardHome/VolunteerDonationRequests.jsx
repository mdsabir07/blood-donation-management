import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useUserRole from '../../../hooks/useUserRole';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../Shared/Loading/Loading';

const VolunteerDonationRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { role, isRoleLoading } = useUserRole();
    const { loading: authLoading } = useAuth();

    const [requests, setRequests] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        if (role === 'volunteer') {
            axiosSecure.get(`/admin/donations?page=${page}&limit=${limit}`)
                .then(res => {
                    setRequests(res.data.donations || []);
                })
                .catch(err => console.error(err));
        }
    }, [role, page]);

    const handleStatusChange = async (id, newStatus) => {
        const confirm = await Swal.fire({
            title: `Are you sure?`,
            text: `Mark this request as ${newStatus}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!',
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.patch(`/donation-requests/${id}`, { status: newStatus });
                Swal.fire('Updated!', 'Status updated successfully.', 'success');
                setRequests(prev => prev.map(r => r._id === id ? { ...r, status: newStatus } : r));
            } catch (err) {
                Swal.fire('Error', 'Failed to update status.', 'error');
            }
        }
    };

    if (authLoading || isRoleLoading) return <Loading />;
    if (role !== 'volunteer') {
        return <p className="text-error text-center py-10">Access Denied. Volunteers only.</p>;
    }

    return (
        <div className="p-2 sm:p-6">
            <h2 className="text-2xl font-bold mb-4 text-base-content">All Donation Requests 🩸</h2>
            {/* Render the table like in your admin version but without Edit/Delete/Approve */}
            {/* Only show status-changing buttons (e.g. Mark as Done, Cancel) */}
        </div>
    );
};

export default VolunteerDonationRequests;