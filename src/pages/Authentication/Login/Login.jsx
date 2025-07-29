import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import LottieSignIn from '../../../assets/Lotties/SignIn.json';
import Lottie from 'lottie-react';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const onSubmit = data => {
        console.log(data);
        signIn(data.email, data.password)
            .then(res => {
                console.log(res.user);
                Swal.fire({
                    icon: "success",
                    title: "Login successful!",
                    timer: 1500
                });
                navigate(from);
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: `${error}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    }

    return (
        <div className="max-w-7xl mx-auto flex justify-center items-center flex-col md:flex-row gap-5 px-3 sm:px-12 my-12">
            <div className="w-full p-4 sm:p-8 space-y-3 rounded-xl border border-gray-300">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    <button type='submit' className="block w-full p-3 text-center rounded-sm bg-primary cursor-pointer">Login</button>
                </form>
                <p className="text-xs text-center sm:px-6">Don't have an account?
                    <Link to="/register" className="underline text-primary"> Register</Link>
                </p>
            </div>
            <div className="w-full">
                <Lottie style={{ width: 'full' }} animationData={LottieSignIn} loop={true} />
            </div>
        </div>
    );
};

export default Login;