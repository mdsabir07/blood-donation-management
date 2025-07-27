import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useUserRole from '../../../hooks/useUserRole';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../Shared/Loading/Loading';

const AllDonationRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { role, isRoleLoading } = useUserRole();
    const { loading: authLoading } = useAuth();

    const [requests, setRequests] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 10;

    const fetchRequests = async () => {
        try {
            const res = await axiosSecure.get(`/admin/donations?page=${page}&limit=${limit}`);
            setRequests(res.data.donations || []);
            setTotal(res.data.total || 0);
        } catch (err) {
            console.error('Error fetching donation requests:', err);
        }
    };

    useEffect(() => {
        if (role === 'admin') fetchRequests();
    }, [role, page]);

    const handleStatusChange = async (id, newStatus) => {
        const confirm = await Swal.fire({
            title: `Are you sure?`,
            text: `This will mark the request as ${newStatus}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!',
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.patch(`/donation-requests/${id}`, { status: newStatus });
                Swal.fire('Updated!', 'Donation request status has been updated.', 'success');
                fetchRequests();
            } catch (err) {
                console.error('Error updating donation status:', err);
                Swal.fire('Error', 'Failed to update status.', 'error');
            }
        }
    };

    if (authLoading || isRoleLoading) return <Loading />;
    if (role !== 'admin') return <p className="text-red-500 text-center py-10">Access Denied. Admins only.</p>;

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Blood Donation Requests 🩸</h2>

            {requests.length === 0 ? (
                <p className="text-gray-500">No donation requests found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Requester</th>
                                <th>Blood Group</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req._id}>
                                    <td>{req.requesterName}</td>
                                    <td className="font-bold text-red-500">{req.bloodGroup}</td>
                                    <td>{req.recipientDistrict}, {req.recipientUpazila}</td>
                                    <td>{req.donationDate} {req.donationTime}</td>
                                    <td className="capitalize">{req.status}</td>
                                    <td>
                                        <div className="flex gap-2">
                                            {req.status !== 'approved' && (
                                                <button
                                                    onClick={() => handleStatusChange(req._id, 'approved')}
                                                    className="btn btn-xs btn-success"
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            {req.status !== 'canceled' && (
                                                <button
                                                    onClick={() => handleStatusChange(req._id, 'canceled')}
                                                    className="btn btn-xs btn-error"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    {Array.from({ length: totalPages }, (_, idx) => (
                        <button
                            key={idx + 1}
                            onClick={() => setPage(idx + 1)}
                            className={`btn btn-sm ${page === idx + 1 ? 'btn-primary' : 'btn-outline'}`}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllDonationRequests;