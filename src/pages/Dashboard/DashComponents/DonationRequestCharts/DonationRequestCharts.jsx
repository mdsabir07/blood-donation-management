import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line
} from 'recharts';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Loading from '../../../Shared/Loading/Loading';
const DonationRequestCharts = () => {
    const axiosSecure = useAxiosSecure();
    const [dailyRequests, setDailyRequests] = useState([]);
    const [weeklyRequests, setWeeklyRequests] = useState([]);
    const [monthlyRequests, setMonthlyRequests] = useState([]);
    const [chartLoading, setChartLoading] = useState(true);
    const [chartError, setChartError] = useState(null);

    useEffect(() => {
        const fetchDonationChartData = async () => {
            setChartLoading(true);
            setChartError(null);
            try {
                // Fetch daily data for the last 7 days
                const dailyRes = await axiosSecure.get('/admin/stats/daily-requests');
                setDailyRequests(dailyRes.data);

                // Fetch weekly data for the last 4 weeks
                const weeklyRes = await axiosSecure.get('/admin/stats/weekly-requests');
                setWeeklyRequests(weeklyRes.data);

                // Fetch monthly data for the last 6 months
                const monthlyRes = await axiosSecure.get('/admin/stats/monthly-requests');
                setMonthlyRequests(monthlyRes.data);

                setChartLoading(false);
            } catch (err) {
                console.error("Error fetching chart data:", err);
                setChartError("Failed to load chart data. Please ensure backend endpoints are working.");
                setChartLoading(false);
            }
        };

        fetchDonationChartData();
    }, [axiosSecure]); // Dependency on axiosSecure to re-fetch if it changes (unlikely)

    if (chartLoading) {
        return (
            <div className="flex justify-center items-center h-[300px]">
                <p className="text-lg">Loading charts <Loading /></p>
            </div>
        );
    }

    if (chartError) {
        return (
            <div className="text-center text-error-content bg-error p-4 rounded-lg mt-8">
                <p className="text-lg">{chartError}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Daily Donation Requests Chart */}
            <div className="bg-base-100 p-6 rounded-lg shadow-xl">
                <h2 className="text-2xl font-semibold text-center mb-6 text-secondary">Daily Requests (Last 7 Days)</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailyRequests} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip cursor={{ fill: 'rgba(0,0,0,0.1)' }} />
                        <Legend />
                        <Bar dataKey="requests" fill="#8884d8" name="Requests" radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Weekly Donation Requests Chart */}
            <div className="bg-base-100 p-6 rounded-lg shadow-xl">
                <h2 className="text-2xl font-semibold text-center mb-6 text-secondary">Weekly Requests (Last 4 Weeks)</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyRequests} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        <Line type="monotone" dataKey="requests" stroke="#82ca9d" activeDot={{ r: 8 }} strokeWidth={2} name="Requests" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Monthly Donation Requests Chart */}
            <div className="lg:col-span-2 bg-base-100 p-6 rounded-lg shadow-xl">
                <h2 className="text-2xl font-semibold text-center mb-6 text-secondary">Monthly Requests (Last 6 Months)</h2>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={monthlyRequests} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip cursor={{ fill: 'rgba(0,0,0,0.1)' }} />
                        <Legend />
                        <Bar dataKey="requests" fill="#ffc658" name="Requests" radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DonationRequestCharts;