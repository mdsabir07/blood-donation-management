import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2'; // Assuming you use SweetAlert for user feedback
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../Shared/Loading/Loading';

const CheckoutForm = ({ amount, onClose, onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("CheckoutForm: handleSubmit triggered.");
        console.log("Stripe instance:", !!stripe); // Check if stripe object is available
        console.log("Elements instance:", !!elements); // Check if elements object is available

        if (!stripe || !elements) {
            setMessage("Stripe.js has not loaded correctly. Please try again.");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setMessage(null);

        // Confirm the PaymentIntent on the client side
        console.log("Attempting to confirm payment...");
        // The result of confirmPayment contains either an error or the paymentIntent
        const { error: confirmPaymentError, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + '/dashboard/funding',
            },
            redirect: 'if_required' // Prevent automatic redirect for direct handling of status
        });

        if (confirmPaymentError) {
            // An error occurred during payment confirmation (e.g., invalid card details, network error)
            console.error("CheckoutForm: Error during confirmPayment:", confirmPaymentError);
            setMessage(confirmPaymentError.message);
            setIsLoading(false);
            return;
        }

        // If confirmPaymentError is null, then paymentIntent should be available from the result
        console.log("CheckoutForm: confirmPayment completed. Retrieved PaymentIntent status:", paymentIntent.status);

        if (paymentIntent.status === 'succeeded') {
            console.log("CheckoutForm: Payment succeeded, recording fund in backend...");
            // Payment was successful, now record the fund in your backend
            try {
                await axiosSecure.post('/funds', {
                    amount: amount / 100, // Convert cents back to dollars for your backend
                    donorEmail: user?.email,
                    donorName: user?.displayName || user?.email
                });
                Swal.fire('Success!', 'Fund donated successfully!', 'success');
                onPaymentSuccess();
                onClose();
            } catch (recordError) {
                console.error("CheckoutForm: Error recording fund in backend:", recordError);
                setMessage("Payment succeeded, but failed to record fund. Please contact support.");
            }
        } else {
            console.log("CheckoutForm: Payment did not succeed. Status:", paymentIntent.status);
            setMessage(`Payment status: ${paymentIntent.status}. Please try again or contact support.`);
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="p-4">
            <h3 className="text-xl font-semibold mb-4 text-center">Donate ${amount / 100}</h3>
            <PaymentElement id="payment-element" />
            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="btn btn-primary w-full mt-6"
            >
                <span id="button-text">
                    {isLoading ? <Loading /> : "Pay now"}
                </span>
            </button>
            {message && <div id="payment-message" className="text-error mt-4 text-center">{message}</div>}
        </form>
    );
};

export default CheckoutForm;