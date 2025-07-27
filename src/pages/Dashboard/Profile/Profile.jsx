import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaEdit, FaSave } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useDistricts from "../../../hooks/useDistricts";
import Loading from "../../Shared/Loading/Loading";

const Profile = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset, setValue } = useForm();
    const { data: districtsData = [] } = useDistricts();
    const [upazilas, setUpazilas] = useState([]);

    const [avatarUrl, setAvatarUrl] = useState("");
    const [profile, setProfile] = useState(null);

    // 🔃 Load user profile
    useEffect(() => {
        if (!user?.email) return;

        axiosSecure
            .get(`/users/profile?email=${user.email}`)
            .then(res => {
                setProfile(res.data);
                setAvatarUrl(res.data.avatar);
                reset(res.data);
            })
            .catch(() => Swal.fire("Error", "Failed to load profile", "error"));
    }, [user, axiosSecure, reset]);

    // 🔁 District change
    const handleDistrictChange = (e) => {
        const selectedDistrict = e.target.value;
        setValue('district', selectedDistrict); // optional, updates form state

        const found = districtsData.find(d => d.district === selectedDistrict);
        setUpazilas(found?.upazilas || []); // ✅ note the "s" in upazilas
    };

    // ✅ Submit
    const onSubmit = async (data) => {
        try {
            await axiosSecure.put(`/users/profile?email=${user.email}`, {
                ...data,
                avatar: avatarUrl
            });
            setIsEditing(false);
            Swal.fire("Success", "Profile updated successfully!", "success");
        } catch {
            Swal.fire("Error", "Update failed", "error");
        }
    };

    if (!profile) return <Loading />;

    return (
        <div className="max-w-7xl mx-auto flex justify-center items-center flex-col md:flex-row gap-5 px-2 sm:px-12 my-12">
            <div className="w-full p-4 sm:p-8 space-y-3 rounded-xl border border-gray-300">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">My Profile</h1>
                    <button
                        onClick={() => {
                            if (isEditing) handleSubmit(onSubmit)();
                            else setIsEditing(true);
                        }}
                        className="btn btn-sm btn-primary"
                    >
                        {isEditing ? (
                            <>
                                <FaSave className="mr-1" /> Save
                            </>
                        ) : (
                            <>
                                <FaEdit className="mr-1" /> Edit
                            </>
                        )}
                    </button>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* Name */}
                    <div className="space-y-1 text-sm">
                        <label>Your Name</label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className="w-full px-4 py-3 rounded-md border"
                            disabled={!isEditing}
                        />
                    </div>

                    {/* Avatar Image */}
                    <div className="space-y-1 text-sm">
                        <label>Avatar Image</label>
                        <input
                            type="text"
                            {...register("avatar")}
                            className="w-full px-4 py-3 rounded-md border"
                            placeholder="ImageBB url"
                            disabled={!isEditing}
                        />
                    </div>

                    {/* District */}
                    <div className="space-y-1 text-sm">
                        <label>District</label>
                        <select
                            {...register("district", { required: true })}
                            onChange={handleDistrictChange}
                            className="select select-bordered w-full"
                            disabled={!isEditing}
                        >
                            <option value="">Select district</option>
                            {districtsData.map(d => (
                                <option key={d.id} value={d.district}>
                                    {d.district}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Upazila */}
                    <div className="space-y-1 text-sm">
                        <label>Upazila</label>
                        <select
                            {...register("upazila", { required: true })}
                            className="select select-bordered w-full"
                            disabled={!isEditing}
                        >
                            <option value="">Select upazila</option>
                            {upazilas.map(uz => (
                                <option key={uz} value={uz}>
                                    {uz}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Blood Group */}
                    <div className="space-y-1 text-sm">
                        <label>Blood Group</label>
                        <select
                            {...register("bloodGroup", { required: true })}
                            className="w-full px-4 py-3 rounded-md border"
                            disabled={!isEditing}
                        >
                            <option value="">Select blood group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>

                    {/* Email (read-only) */}
                    <div className="space-y-1 text-sm">
                        <label>Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded-md border bg-gray-100 dark:bg-gray-800"
                            value={profile.email}
                            disabled
                        />
                    </div>
                </form>
            </div>

            <div className="w-full flex justify-center">
                <img
                    src={avatarUrl}
                    alt="User avatar"
                    title={profile.name}
                    className="rounded-xl border shadow"
                />
            </div>
        </div>
    );
};

export default Profile;
