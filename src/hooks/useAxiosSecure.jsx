// useAxiosSecure.js
import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();

    useEffect(() => {
        const interceptor = axiosSecure.interceptors.request.use(
            async (config) => {
                if (user && user.getIdToken) {
                    try {
                        const token = await user.getIdToken(); // 🔐 Firebase token
                        config.headers.Authorization = `Bearer ${token}`;
                    } catch (err) {
                        console.error("Failed to get Firebase token", err);
                    }
                } else if (user?.accessToken) {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                } else {
                    console.warn("No access token found.");
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
        return () => {
            axiosSecure.interceptors.request.eject(interceptor);
        };
    }, [user]);


    return axiosSecure;
};

export default useAxiosSecure;