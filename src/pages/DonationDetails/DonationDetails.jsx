import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import Loading from '../Shared/Loading/Loading';
import { useParams, useNavigate } from 'react-router';

const DonationDetails = () => {
    const axiosInstance = useAxios();
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get(`/donation-requests/${id}`)
            .then(res => {
                setRequest(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load request details', err);
                setLoading(false);
            });
    }, [id, axiosInstance]);

    if (loading) return <Loading />;
    if (!request) return <p className="text-center text-red-500 py-10">Request not found</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">🩸 Donation Request Details</h2>

            <div className="space-y-3 text-base-content">
                <p><strong>Recipient Name:</strong> {request.recipientName}</p>
                <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
                <p><strong>Hospital:</strong> {request.hospitalName || 'N/A'}</p>
                <p><strong>Full Address:</strong> {request.fullAddress}</p>
                <p><strong>Upazila:</strong> {request.recipientUpazila}</p>
                <p><strong>District:</strong> {request.recipientDistrict}</p>
                <p><strong>Date:</strong> {request.donationDate}</p>
                <p><strong>Time:</strong> {request.donationTime}</p>
                <p><strong>Requested By:</strong> {request.requesterName} ({request.requesterEmail})</p>
                <p><strong>Request Message:</strong> {request.requestMessage || 'N/A'}</p>
                <p><strong>Status:</strong> <span className="capitalize">{request.status}</span></p>
                <p><strong>Created At:</strong> {new Date(request.createdAt).toLocaleString()}</p>
            </div>

            <button
                onClick={() => navigate(-1)}
                className="mt-6 btn btn-outline"
            >
                Back
            </button>
        </div>
    );
};

export default DonationDetails;