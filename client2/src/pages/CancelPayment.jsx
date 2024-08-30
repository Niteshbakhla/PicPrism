// src/CancelPaymentPage.js
import React from 'react';

const CancelPaymentPage = () => {
            return (
                        <div className="flex items-center justify-center min-h-screen bg-gray-100">
                                    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                                                <svg className="w-16 h-16 mx-auto text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v6m-3-3h6M19.07 4.93a10 10 0 11-14.14 0 10 10 0 0114.14 0z" />
                                                </svg>
                                                <h1 className="text-2xl font-semibold text-center text-gray-800 mt-4">Payment Canceled</h1>
                                                <p className="text-center text-gray-600 mt-2">
                                                            Your payment has been canceled. If you have any questions or need further assistance, please contact our support team.
                                                </p>
                                                <div className="mt-6">
                                                            <button className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300">
                                                                        Go to Home
                                                            </button>
                                                </div>
                                    </div>
                        </div>
            );
};

export default CancelPaymentPage;
