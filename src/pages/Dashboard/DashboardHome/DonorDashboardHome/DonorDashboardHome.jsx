
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Link, useNavigate } from 'react-router';

const DonorDashboardHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // Fetch recent 3 donation requests created by donor
    const { data: requests = [], refetch } = useQuery({
        queryKey: ['myRecentDonations', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations?email=${user.email}&limit=3`);
            return res.data;
        },
    });

    const handleStatusChange = async (id, status) => {
        try {
            await axiosSecure.patch(`/donations/${id}/status`, { status });
            refetch();
        } catch (err) {
            Swal.fire('Error', 'Failed to update status', 'error');
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete your donation request.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/donations/${id}`);
                refetch();
                Swal.fire('Deleted!', 'Your request has been removed.', 'success');
            } catch (err) {
                Swal.fire('Error', 'Failed to delete request.', 'error');
            }
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">Welcome, {user?.displayName || 'Donor'} 👋</h2>

            {requests.length > 0 && (
                <div className="overflow-x-auto">
                    <h3 className="text-lg font-semibold my-4">Your Recent Donation Requests</h3>
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
                                        <button onClick={() => navigate(`/dashboard/edit-request/${req._id}`)} className="btn btn-sm btn-outline">Edit</button>
                                        <button onClick={() => handleDelete(req._id)} className="btn btn-sm btn-outline btn-error">Delete</button>
                                        <Link to={`/dashboard/request/${req._id}`} className="btn btn-sm btn-outline">View</Link>

                                        {req.status === 'inprogress' && (
                                            <div className="flex flex-col gap-1 mt-2">
                                                <button onClick={() => handleStatusChange(req._id, 'done')} className="btn btn-xs btn-success">Mark as Done</button>
                                                <button onClick={() => handleStatusChange(req._id, 'canceled')} className="btn btn-xs btn-warning">Cancel</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {requests.length > 0 && (
                <div className="text-center mt-4">
                    <Link to="/dashboard/my-requests" className="btn btn-primary btn-sm">
                        View My All Requests
                    </Link>
                </div>
            )}
        </div>
    );
};

export default DonorDashboardHome;