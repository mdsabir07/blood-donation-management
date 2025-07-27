import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useUserRole from '../../../hooks/useUserRole';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../Shared/Loading/Loading';
import { Link, useNavigate } from 'react-router';

const AdminDonationRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { role, isRoleLoading } = useUserRole();
    const { loading: authLoading } = useAuth();
    const navigate = useNavigate();

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
            text: `Mark this request as ${newStatus}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!',
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.patch(`/donation-requests/${id}`, { status: newStatus });
                Swal.fire('Updated!', 'Status updated successfully.', 'success');
                fetchRequests();
            } catch (err) {
                console.error('Update error:', err);
                Swal.fire('Error', 'Failed to update status.', 'error');
            }
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Delete request?',
            text: 'This will permanently remove the request.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.delete(`/donation-requests/${id}`);
                Swal.fire('Deleted!', 'Request has been removed.', 'success');
                fetchRequests();
            } catch (err) {
                Swal.fire('Error', 'Failed to delete request.', 'error');
            }
        }
    };

    if (authLoading || isRoleLoading) return <Loading />;
    if (role !== 'admin') {
        return <p className="text-error text-center py-10">Access Denied. Admins only.</p>;
    }

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-base-content">All Blood Donation Requests 🩸</h2>

            {requests.length === 0 ? (
                <p className="text-base-content/70">No donation requests found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full border border-base-300">
                        <thead className="bg-base-200 text-base-content">
                            <tr>
                                <th>Recipient</th>
                                <th>Location</th>
                                <th>Date & Time</th>
                                <th>Blood</th>
                                <th>Status</th>
                                <th>Donor Info</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req._id}>
                                    <td>{req.recipientName}</td>
                                    <td>{req.recipientDistrict}, {req.recipientUpazila}</td>
                                    <td>{req.donationDate} <br /> {req.donationTime}</td>
                                    <td>{req.bloodGroup}</td>
                                    <td className="capitalize">{req.status}</td>
                                    <td>
                                        {req.status === 'inprogress' && req.donor ? (
                                            <>
                                                <p>{req.donor.name}</p>
                                                <p className="text-xs text-gray-500">{req.donor.email}</p>
                                            </>
                                        ) : 'N/A'}
                                    </td>
                                    <td className="space-y-1">
                                        <button
                                            onClick={() => navigate(`/dashboard/edit-request/${req._id}`)}
                                            className="btn btn-sm btn-outline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(req._id)}
                                            className="btn btn-sm btn-error btn-outline"
                                        >
                                            Delete
                                        </button>
                                        <Link to={`/dashboard/request/${req._id}`} className="btn btn-sm btn-outline">
                                            View
                                        </Link>

                                        {/* Status-based actions */}
                                        {req.status === 'pending' && (
                                            <div className="flex flex-col gap-1 mt-2">
                                                <button
                                                    onClick={() => handleStatusChange(req._id, 'approved')}
                                                    className="btn btn-xs btn-success"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(req._id, 'canceled')}
                                                    className="btn btn-xs btn-warning"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}

                                        {req.status === 'inprogress' && (
                                            <div className="flex flex-col gap-1 mt-2">
                                                <button
                                                    onClick={() => handleStatusChange(req._id, 'done')}
                                                    className="btn btn-xs btn-success"
                                                >
                                                    Mark as Done
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(req._id, 'canceled')}
                                                    className="btn btn-xs btn-warning"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
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

export default AdminDonationRequests;