import { useForm } from 'react-hook-form';
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from 'react-router';
import LottieRegister from '../../../assets/Lotties/register.json'

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const onSubmit = data => {
        console.log(data)
    }
    return (
        <div className="max-w-7xl mx-auto flex justify-center items-center flex-col md:flex-row gap-5 px-12 my-12">
            <div className="w-full p-8 space-y-3 rounded-xl border border-gray-300">
                <h1 className="text-2xl font-bold text-center">Create an account</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name field */}
                    <div className="space-y-1 text-sm">
                        <label htmlFor="name" className="block ">Your Name</label>
                        <input
                            type="text" {...register("name", { required: true })}
                            aria-invalid={errors.name ? "true" : "false"}
                            placeholder="Your Name"
                            className="w-full px-4 py-3 rounded-md border border-gray-300" />
                        {errors.name?.type === "required" && (
                            <p role="alert" className='text-red-500'>Name is required</p>
                        )}
                    </div>
                    {/* Image field */}
                    {/* <div className="space-y-1 text-sm">
                    <label htmlFor="image" className="block ">Your profile image</label>
                    <input
                        type="file"
                        onChange={handleImageUpload}
                        placeholder="Your profile image"
                        className="w-full px-4 py-3 rounded-md border border-gray-300" />

                    {profilePic && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-600">Preview:</p>
                            <img
                                src={profilePic}
                                alt="Profile Preview"
                                className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                            />
                        </div>
                    )}
                </div> */}

                    {/* Blood group */}
                    <div className="space-y-1 text-sm">
                        <label htmlFor="bloodGroup" className="block ">Blood group</label>
                        <select
                            {...register("bloodGroup", { required: true })}
                            aria-invalid={errors.email ? "true" : "false"}
                            className="w-full px-4 py-3 rounded-md border border-gray-300"
                        >
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                        {errors.email?.type === "required" && (
                            <p role="alert" className='text-red-500'>Blood group is required</p>
                        )}
                    </div>

                    {/* Email field */}
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block ">Email</label>
                        <input
                            type="email" {...register("email", { required: true })}
                            aria-invalid={errors.email ? "true" : "false"}
                            placeholder="Email"
                            className="w-full px-4 py-3 rounded-md border border-gray-300" />
                        {errors.email?.type === "required" && (
                            <p role="alert" className='text-red-500'>Email is required</p>
                        )}
                    </div>
                    {/* Password field */}
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: true, minLength: 6 })}
                            aria-invalid={errors.password ? "true" : "false"}
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-md border border-gray-300" />
                        {errors.password?.type === "required" && (
                            <p role='alert' className='text-red-500'>Password required</p>
                        )}
                        {errors.password?.type === "minLength" && (
                            <p role='alert' className='text-red-500'>Minimum characters is 6 or longer</p>
                        )}
                    </div>
                    {/* Confirm Password field */}
                    <div className="space-y-1 text-sm mt-4">
                        <label htmlFor="confirmPassword" className="block">Confirm Password</label>
                        <input
                            type="password"
                            {...register("confirmPassword", {
                                required: true,
                                validate: (value) => value === watch("password") || "Passwords do not match"
                            })}
                            aria-invalid={errors.confirmPassword ? "true" : "false"}
                            placeholder="Confirm Password"
                            className="w-full px-4 py-3 rounded-md border border-gray-300"
                        />
                        {errors.confirmPassword?.type === "required" && (
                            <p role='alert' className='text-red-500'>Confirm Password is required</p>
                        )}
                        {errors.confirmPassword?.type === "validate" && (
                            <p role='alert' className='text-red-500'>{errors.confirmPassword.message}</p>
                        )}
                    </div>
                    <button type='submit' className="block w-full p-3 text-center rounded-sm bg-primary cursor-pointer">Register</button>
                </form>
                <p className="text-xs text-center sm:px-6">Already have an account?
                    <Link to="/login" className="underline text-primary"> Login</Link>
                </p>
            </div>
            <div className="w-full">
                <Lottie style={{ width: 'full' }} animationData={LottieRegister} loop={true} />
            </div>
        </div>
    );
};

export default Register;