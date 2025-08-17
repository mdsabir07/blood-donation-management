import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useDistricts from '../../../hooks/useDistricts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const CreateDonationRequest = () => {
    const { user } = useAuth();
    const { data: districts = [] } = useDistricts();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [upazilas, setUpazilas] = useState([]);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const handleDistrictChange = (e) => {
        const selectedDistrict = e.target.value;
        const found = districts.find(d => d.district === selectedDistrict);
        setUpazilas(found?.upazilas || []);
    };

    const onSubmit = async (data) => {
        const donationData = {
            requesterName: user.displayName,
            requesterEmail: user.email,
            recipientName: data.recipientName,
            recipientDistrict: data.recipientDistrict,
            recipientUpazila: data.recipientUpazila,
            hospitalName: data.hospitalName,
            fullAddress: data.fullAddress,
            bloodGroup: data.bloodGroup,
            donationDate: data.donationDate,
            donationTime: data.donationTime,
            requestMessage: data.requestMessage,
            status: 'pending',
            createdAt: new Date(),
        };

        try {
            await axiosSecure.post('/donation-requests', donationData);
            Swal.fire('Success', 'Donation request created successfully', 'success');
            navigate('/dashboard'); // or another page
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to create donation request', 'error');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-3 md:p-6 bg-base-100 shadow rounded">
            <h2 className="text-2xl font-bold mb-6">Create Donation Request</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Requester Name & Email (Read-only) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" readOnly value={user?.displayName || ''} className="input input-bordered w-full" />
                    <input type="email" readOnly value={user?.email || ''} className="input input-bordered w-full" />
                </div>

                {/* Recipient Name */}
                <input
                    {...register('recipientName', { required: true })}
                    placeholder="Recipient Name"
                    className="input input-bordered w-full"
                />
                {errors.recipientName && <p className="text-red-500">Recipient name is required</p>}

                {/* District & Upazila */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                        {...register('recipientDistrict', { required: true })}
                        onChange={handleDistrictChange}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select District</option>
                        {districts.map(d => (
                            <option key={d.id} value={d.district}>{d.district}</option>
                        ))}
                    </select>

                    <select
                        {...register('recipientUpazila', { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Upazila</option>
                        {upazilas.map((u, idx) => (
                            <option key={idx} value={u}>{u}</option>
                        ))}
                    </select>
                </div>

                {/* Hospital Name */}
                <input
                    {...register('hospitalName', { required: true })}
                    placeholder="Hospital Name"
                    className="input input-bordered w-full"
                />
                {errors.hospitalName && <p className="text-red-500">Hospital name is required</p>}

                {/* Full Address */}
                <input
                    {...register('fullAddress', { required: true })}
                    placeholder="Full Address"
                    className="input input-bordered w-full"
                />
                {errors.fullAddress && <p className="text-red-500">Address is required</p>}

                {/* Blood Group */}
                <select
                    {...register('bloodGroup', { required: true })}
                    className="select select-bordered w-full"
                >
                    <option value="">Select Blood Group</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                    ))}
                </select>
                {errors.bloodGroup && <p className="text-red-500">Blood group is required</p>}

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="date"
                        {...register('donationDate', { required: true })}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="time"
                        {...register('donationTime', { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>
                {(errors.donationDate || errors.donationTime) && (
                    <p className="text-red-500">Donation date and time are required</p>
                )}

                {/* Message */}
                <textarea
                    {...register('requestMessage', { required: true })}
                    placeholder="Why do you need blood?"
                    className="textarea textarea-bordered w-full"
                    rows="4"
                />
                {errors.requestMessage && <p className="text-red-500">Message is required</p>}

                <button type="submit" className="btn btn-primary w-full mt-4">
                    Request
                </button>
            </form>
        </div>
    );
};

export default CreateDonationRequest;