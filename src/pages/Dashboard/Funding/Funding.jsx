import React, { useState, useEffect, useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import Swal from 'sweetalert2'; 
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useUserRole from '../../../hooks/useUserRole';
import Loading from '../../Shared/Loading/Loading';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { Navigate } from 'react-router';

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);
console.log("Stripe Promise loaded:", stripePromise); 

const Funding = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { role, isRoleLoading } = useUserRole();

    const [funds, setFunds] = useState([]);
    const [totalFunds, setTotalFunds] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 6; 
    const [loadingFunds, setLoadingFunds] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [clientSecret, setClientSecret] = useState('');
    const [fundAmount, setFundAmount] = useState(0); 

    // Function to fetch paginated fund transactions from the backend
    const fetchFunds = async () => {
        setLoadingFunds(true);
        setError(null);
        try {
            const res = await axiosSecure.get(`/funds?page=${currentPage}&limit=${limit}`);
            setFunds(res.data.funds || []);
            setTotalFunds(res.data.total || 0);
        } catch (err) {
            console.error('Error fetching funds:', err);
            setError('Failed to load funding data. Please ensure the backend /funds endpoint is working.');
        } finally {
            setLoadingFunds(false);
        }
    };

    // Effect hook to fetch funds when component mounts or dependencies change
    useEffect(() => {
        // Fetch funds only if user role is determined and authorized
        if (role && (role === 'admin' || role === 'volunteer' || role === 'donor')) {
            fetchFunds();
        }
    }, [axiosSecure, role, currentPage]); 


    // Handler for clicking the "Give Fund" button
    const handleGiveFundClick = () => {
        setIsModalOpen(true);
        setClientSecret('');
        setFundAmount(0);
    };

    // Handler for changes in the fund amount input field
    const handleAmountChange = (e) => {
        const value = parseFloat(e.target.value);
        setFundAmount(isNaN(value) ? 0 : value);
    };

    // Handler for proceeding to payment (initiating Stripe Payment Intent)
    const handleProceedToPayment = async () => {
        // Stripe requires a minimum amount, typically $0.50 (50 cents)
        if (fundAmount < 0.50) {
            Swal.fire('Error', 'Please enter an amount of at least $0.50 to fund.', 'error');
            return;
        }

        try {
            // Send amount in cents to backend for Payment Intent creation
            const res = await axiosSecure.post('/create-payment-intent', { amount: Math.round(fundAmount * 100) });
            console.log("Client Secret received from backend:", res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        } catch (err) {
            console.error("Error creating payment intent:", err);
            Swal.fire('Error', `Failed to initiate payment: ${err.response?.data?.error || err.message}. Please try again.`, 'error');
            setClientSecret('');
        }
    };

    // Callback function for when payment is successfully processed by CheckoutForm
    const handlePaymentSuccess = () => {
        fetchFunds();
    };

    // Handler for closing the fund donation modal
    const handleModalClose = () => {
        setIsModalOpen(false);
        setClientSecret(''); // Reset client secret for next time
        setFundAmount(0); // Reset amount for next time
    };

    // Define columns for the React Table to display funds
    const columns = useMemo(
        () => [
            {
                accessorFn: (row, index) => (currentPage - 1) * limit + index + 1,
                header: '#',
                cell: info => info.getValue(),
            },
            {
                accessorKey: 'donorName',
                header: 'Donor Name',
                cell: info => info.getValue() || info.row.original.donorEmail || 'N/A',
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
                // Format amount to 2 decimal places with a dollar sign
                cell: info => `$${(info.getValue() || 0).toFixed(2)}`,
            },
            {
                accessorKey: 'donatedAt',
                header: 'Date',
                cell: info => new Date(info.getValue()).toLocaleDateString(),
            },
        ],
        [currentPage, limit] 
    );

    // Initialize React Table instance
    const table = useReactTable({
        data: funds,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalFunds / limit);

    if (authLoading || isRoleLoading) return <Loading />;

    // Access control: Deny access if user role is not admin, volunteer, or donor
    if (role !== 'admin' && role !== 'volunteer' && role !== 'donor') {
        return <Navigate to="/forbidden"></Navigate>;
    }

    return (
        <div className="p-2 sm:p-6">
            <h2 className="text-3xl font-bold mb-6 text-base-content text-center">All Funds Received 💰</h2>

            {/* Give Fund Button to open the donation modal */}
            <div className="flex justify-center mb-6">
                <button onClick={handleGiveFundClick} className="btn btn-primary btn-lg rounded-sm px-10">
                    Give Fund
                </button>
            </div>

            {/* Conditional rendering for loading, error, no funds, or fund table */}
            {loadingFunds ? (
                <div className="flex justify-center items-center h-[200px]">
                    <p className="ml-2 text-lg">Loading funds <Loading /></p>
                </div>
            ) : error ? (
                <div className="text-center text-error-content bg-error p-4 rounded-lg mt-4">
                    <p className="text-lg">{error}</p>
                </div>
            ) : funds.length === 0 ? (
                <div className="text-center text-info-content bg-info p-4 rounded-lg mt-4">
                    <p className="text-lg">No funds recorded yet.</p>
                </div>
            ) : (
                <>
                    {/* Funds Table */}
                    <div className="overflow-x-auto bg-base-100 rounded-lg shadow-xl">
                        <table className="table w-full">
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id} className="bg-base-200 text-base-content">
                                        {headerGroup.headers.map(header => (
                                            <th key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column.columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map(row => (
                                    <tr key={row.id} className="hover">
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6 gap-2">
                            {Array.from({ length: totalPages }, (_, idx) => (
                                <button
                                    key={idx + 1}
                                    onClick={() => setCurrentPage(idx + 1)}
                                    className={`btn btn-sm ${currentPage === idx + 1 ? 'btn-primary' : 'btn-outline'}`}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Fund Donation Modal */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box relative">
                        <button onClick={handleModalClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>

                        {/* Debugging log to see clientSecret value before rendering Elements */}
                        {console.log("Modal rendering. current clientSecret:", clientSecret)}
                        {console.log("Is stripePromise available?", !!stripePromise)}

                        {!clientSecret ? (
                            // Amount input form - shown when clientSecret is not yet available
                            <div className="form-control">
                                <h3 className="font-bold text-2xl text-center mb-6">Donate to Our Organization</h3>
                                <label className="label">
                                    <span className="label-text">Amount (USD)</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0.50" 
                                    placeholder="Enter amount"
                                    className="input input-bordered w-full"
                                    value={fundAmount === 0 ? '' : fundAmount}
                                    onChange={handleAmountChange}
                                />
                                <button
                                    onClick={handleProceedToPayment}
                                    className="btn btn-primary mt-4"
                                    disabled={fundAmount < 0.50} 
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        ) : (
                            // Stripe Payment Element - rendered only when clientSecret is available
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <CheckoutForm
                                    amount={Math.round(fundAmount * 100)} 
                                    onClose={handleModalClose}
                                    onPaymentSuccess={handlePaymentSuccess}
                                />
                            </Elements>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Funding;