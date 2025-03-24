import React from 'react';
import { FaArrowRight } from "react-icons/fa";

const NextButton = ({ disabled, label, loading, onClick }) => {
    return (
        <div className="flex justify-center my-6 ms-2">
            <button
                disabled={disabled || loading}
                type="submit"
                onClick={onClick}
                className={`relative flex items-center justify-center w-full md:w-auto px-6 py-3 rounded-md text-sm font-bold tracking-widest shadow-md transition-all duration-300
                    ${disabled || loading
                        ? "disabled:opacity-50 disabled:hover:bg-[#4565BF] disabled:cursor-not-allowed bg-[#4565BF] text-white"
                        : "bg-[#4565BF] text-white hover:bg-[#3651A1] focus:ring-2 focus:ring-[#3651A1] focus:ring-offset-2 focus:outline-none active:bg-[#30498D] hover:scale-105 hover:shadow-lg"
                    }`}
            >
                {loading ? (
                    // Loading Spinner with Label
                    <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span></span> {/* Added text */}
                    </div>
                ) : (
                    // Label with Icon
                    <span className="flex items-center text-sm whitespace-nowrap">
                        {label} <FaArrowRight className="ml-2" />
                    </span>
                )}
            </button>
        </div>
    );
};

export default NextButton;
