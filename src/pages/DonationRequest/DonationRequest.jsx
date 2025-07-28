import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import Loading from '../Shared/Loading/Loading';
import { Link } from 'react-router';

const DonationRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.get('/donation-requests/public?status=pending')
            .then(res => {
                setRequests(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch donation requests', err);
                setLoading(false);
            });
    }, [axiosInstance]);

    if (loading) return <Loading />;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-5xl font-bold mb-8 text-center">🩸Blood Donation Requests</h2>

            {requests.length === 0 ? (
                <p className="text-center">No pending requests at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requests.map(req => (
                        <div key={req._id} className="card bg-base-100 shadow-md p-4">
                            <h3 className="text-xl font-semibold">{req.recipientName}</h3>
                            
                            <p>
                                <strong>Location:</strong>{' '}
                                {req.fullAddress ||
                                    `${req.hospitalName || ''}, ${req.recipientUpazila || ''}, ${req.recipientDistrict || ''}`}
                            </p>

                            <p><strong>Blood Group:</strong> {req.bloodGroup}</p>

                            <p><strong>Date:</strong> {req.donationDate || 'N/A'}</p>
                            <p><strong>Time:</strong> {req.donationTime || 'N/A'}</p>

                            <Link to={`/donation-requests/${req._id}`} className="btn btn-sm btn-primary mt-3">
                                View
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DonationRequests;