import React from 'react';
import { FaArrowLeft } from "react-icons/fa";

const PrevButton = ({ label, onClick }) => {
    return (
        <div className="flex justify-center my-6 me-2">
            <button
                onClick={onClick}
                type="button" // Set type to "button" for navigation
                className="relative flex items-center justify-center w-full md:w-auto px-6 py-3 rounded-md text-sm font-bold tracking-widest shadow-md transition-all duration-300
                    bg-[#4565BF] text-white hover:bg-[#3651A1] focus:ring-2 focus:ring-[#3651A1] focus:ring-offset-2 focus:outline-none active:bg-[#30498D] hover:scale-105 hover:shadow-lg"
            >
                <span className="flex items-center">
                    <FaArrowLeft className="mr-2" /> {/* Left Arrow Icon */}
                    {label} {/* Button Label */}
                </span>
            </button>
        </div>
    );
};

export default PrevButton;
