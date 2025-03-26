import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PaymentFailed = () => {
    const Navigate = useNavigate()

    const handleGoBack = () => {
        Navigate("/")
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center max-w-md w-full">
                <FaTimesCircle size={80} className="text-red-600 mx-auto mb-6" />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Ohh Sorry!

                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Your Payment has Failed!.


                </p>

                <div className="mt-6 flex gap-4 justify-center">
                    <button
                        onClick={handleGoBack}
                        className="bg-violet-700 text-white dark:text-gray-900 font-semibold py-2 px-6 rounded-lg transition-all duration-300"
                    >
                        Continue to Available Treatments
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailed;
