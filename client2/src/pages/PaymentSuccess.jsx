import React from 'react';

const PaymentSuccess = () => {
            return (
                        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500  ">
                                    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
                                                {/* Checkmark SVG */}
                                                <div className="w-24 h-24 flex items-center justify-center bg-green-500 rounded-full mb-4">
                                                            <svg
                                                                        className="w-12 h-12 text-white animate-bounce"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        viewBox="0 0 24 24"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                        <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    d="M5 13l4 4L19 7"
                                                                        ></path>
                                                            </svg>
                                                </div>

                                                {/* Success Message */}
                                                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                                            Payment Successful!
                                                </h1>
                                                <p className="text-gray-600 mb-6">
                                                            Thank you for your purchase. Your order is being processed.
                                                </p>

                                                {/* Continue Shopping Button */}
                                                <button
                                                            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
                                                            onClick={() => window.location.href = '/'}
                                                >
                                                            Continue Shopping
                                                </button>
                                    </div>

                                    {/* Confetti Animation */}
                                    {/* <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                                                <div className="confetti"></div>
                                                <div className="confetti"></div>
                                                <div className="confetti"></div>
                                                <div className="confetti"></div>
                                                <div className="confetti"></div>
                                                <div className="confetti"></div>
                                    </div> */}
                        </div>
            );
};

export default PaymentSuccess;
