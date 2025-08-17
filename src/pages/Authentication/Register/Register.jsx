import { useForm } from 'react-hook-form';
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from 'react-router';
import LottieRegister from '../../../assets/Lotties/register.json';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import useDistricts from '../../../hooks/useDistricts';
import Swal from 'sweetalert2';
import { useState } from 'react';

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, loading, setLoading } = useAuth();
    const axios = useAxios();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const { data: districtsData = [], isLoading } = useDistricts();
    const [upazilas, setUpazilas] = useState([]);
    const [avatarUrl, setAvatarUrl] = useState('');

    const handleDistrictChange = (e) => {
        const selectedDistrict = e.target.value;
        const found = districtsData.find(d => d.district === selectedDistrict);
        setUpazilas(found?.upazilas || []);
    };

    const handleImageUpload = async (e) => {
        const imageFile = e.target.files[0];
        if (!imageFile) return;

        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`, formData);
            const imageUrl = res.data.data.display_url;
            setAvatarUrl(imageUrl);
        } catch (error) {
            console.error('Image upload failed', error);
            Swal.fire('Error', 'Image upload failed', 'error');
        }
    };

    const onSubmit = async (data) => {
        if (!avatarUrl) {
            return Swal.fire('Error', 'Please upload an avatar image.', 'error');
        }

        setLoading(true);

        try {
            // 1. Firebase Auth create
            const userCredential = await createUser(data.email, data.password);
            const user = userCredential.user;

            // 2. MongoDB user creation
            const userInfo = {
                name: data.name,
                email: data.email,
                avatar: avatarUrl,
                bloodGroup: data.bloodGroup,
                district: data.district,
                upazila: data.upazila,
                status: 'active',
                role: 'donor'
            };
            await axios.post('/users', userInfo);

            // 3. Firebase profile update
            const userProfile = {
                displayName: data.name,
                photoURL: avatarUrl
            };
            await updateUserProfile(userProfile);
            console.log('Profile name and pic updated');

            Swal.fire({
                icon: "success",
                title: "Registration successful!",
                showConfirmButton: false,
                timer: 1500
            });

            navigate(from);
        } catch (error) {
            // ⛔️ Handle 409 - email exists in MongoDB
            if (error.response?.status === 409) {
                Swal.fire("Email already in use!", "Try logging in instead.", "warning");
            } else {
                console.error(error);
                Swal.fire('Error', error.message || 'Registration failed', 'error');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-7xl mx-auto flex justify-center items-center flex-col md:flex-row gap-5 px-4 my-12 sm:my-20">
            <div className="w-full p-3 sm:p-8 space-y-3 rounded-xl border border-gray-300">
                <h1 className="text-2xl font-bold text-center">Create an account</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Name */}
                    <div className="space-y-1 text-sm">
                        <label className="block">Your Name</label>
                        <input type="text" {...register("name", { required: true })}
                            className="w-full px-4 py-3 rounded-md border" />
                        {errors.name && <p className='text-red-500'>Name is required</p>}
                    </div>

                    {/* Avatar Upload */}
                    <div className="space-y-1 text-sm">
                        <label className="block">Avatar Image</label>
                        <input type="file" accept="image/*" onChange={handleImageUpload}
                            className="w-full px-4 py-3 rounded-md border" />
                        {avatarUrl && (
                            <img src={avatarUrl} alt="Avatar preview"
                                className="w-24 h-24 mt-2 object-cover rounded-lg border" />
                        )}
                    </div>

                    {/* District */}
                    <div className="space-y-1 text-sm">
                        <label>District</label>
                        <select
                            {...register('district', { required: true })}
                            onChange={handleDistrictChange}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select district</option>
                            {districtsData.map(d => (
                                <option key={d.id} value={d.district}>
                                    {d.district}
                                </option>
                            ))}
                        </select>
                        {errors.district && <p className="text-red-500">District is required</p>}
                    </div>


                    {/* Upazila */}
                    <div className="space-y-1 text-sm">
                        <label>Upazila</label>
                        <select {...register('upazila', { required: true })}
                            className="select select-bordered w-full">
                            <option value="">Select upazila</option>
                            {upazilas.map(u => (
                                <option key={u} value={u}>{u}</option>
                            ))}
                        </select>
                        {errors.upazila && <p className="text-red-500">Upazila is required</p>}
                    </div>

                    {/* Blood Group */}
                    <div className="space-y-1 text-sm">
                        <label>Blood Group</label>
                        <select {...register("bloodGroup", { required: true })}
                            className="w-full px-4 py-3 rounded-md select select-bordered">
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
                        {errors.bloodGroup && <p className="text-red-500">Blood group is required</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1 text-sm">
                        <label>Email</label>
                        <input type="email" {...register("email", { required: true })}
                            className="w-full px-4 py-3 rounded-md border" />
                        {errors.email && <p className="text-red-500">Email is required</p>}
                    </div>

                    {/* Password */}
                    <div className="space-y-1 text-sm">
                        <label>Password</label>
                        <input type="password" {...register("password", {
                            required: true,
                            minLength: 6
                        })}
                            className="w-full px-4 py-3 rounded-md border" />
                        {errors.password && errors.password.type === "required" && (
                            <p className='text-red-500'>Password is required</p>
                        )}
                        {errors.password && errors.password.type === "minLength" && (
                            <p className='text-red-500'>Minimum length is 6</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1 text-sm">
                        <label>Confirm Password</label>
                        <input type="password" {...register("confirmPassword", {
                            required: true,
                            validate: (value) => value === watch("password") || "Passwords do not match"
                        })}
                            className="w-full px-4 py-3 rounded-md border" />
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message || "Confirm Password is required"}</p>}
                    </div>

                    <button type="submit" className="block w-full p-3 rounded-sm bg-primary text-white cursor-pointer">Register</button>
                </form>

                <p className="text-xs text-center mt-4">
                    Already have an account? <Link to="/login" className="underline text-primary">Login</Link>
                </p>
            </div>

            <div className="w-full">
                <Lottie style={{ width: 'full' }} animationData={LottieRegister} loop={true} />
            </div>
        </div>
    );
};

export default Register;