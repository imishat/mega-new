/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiUrl } from '../config/constants';

const Success: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Extract invoice_id from the query parameters
        const queryParams = new URLSearchParams(location.search);
        const invoice_id = queryParams.get('invoice_id');

        if (invoice_id) {
            // Call the API to confirm the payment
            const confirmPayment = async () => {
                try {
                    const response = await fetch(`${apiUrl}/transection/verify-payment`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ invoice_id }),
                    });

                    const data = await response.json();

                    if (data.success) {
                        // Redirect to the homepage after a short delay
                        setTimeout(() => {
                            navigate('/');
                        }, 3000); // Redirect after 3 seconds
                    } else {
                        setError(data.message || 'Payment confirmation failed.');
                    }
                } catch (error:any) {
                    setError('An error occurred while confirming your payment.');
                } finally {
                    setLoading(false);
                }
            };

            confirmPayment();
        } else {
            setError('No invoice ID found in the URL.');
            setLoading(false);
        }
    }, [location]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                {loading ? (
                    <>
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
                        <h1 className="text-2xl font-bold text-gray-800">Processing Payment...</h1>
                        <p className="text-gray-600 mt-2">Please wait while we confirm your payment.</p>
                    </>
                ) : error ? (
                    <>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-red-500 mx-auto mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h1 className="text-2xl font-bold text-gray-800">Payment Failed</h1>
                        <p className="text-gray-600 mt-2">{error}</p>
                        <button
                            onClick={() => navigate('/')}
                            className="mt-6 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300"
                        >
                            Go to Homepage
                        </button>
                    </>
                ) : (
                    <>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-green-500 mx-auto mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <h1 className="text-2xl font-bold text-gray-800">Payment Successful!</h1>
                        <p className="text-gray-600 mt-2">Thank you for your payment. You will be redirected shortly.</p>
                        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                            <p className="text-sm text-gray-700">If you are not redirected, <button onClick={() => navigate('/')} className="text-purple-500 hover:underline">click here</button>.</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Success;