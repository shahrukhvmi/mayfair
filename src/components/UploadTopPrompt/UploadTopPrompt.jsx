import React from 'react';
import { FiUpload } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const UploadTopPrompt = () => {

    return (
        <div className="fixed  bottom-12 left-2/2  sm:relative sm:bottom-0 sm:left-0 bg-amber-500 text-white px-5 py-2 rounded-xl shadow-lg w-[90%] sm:w-auto animate-slide-down z-50">
            <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="bg-white/20 p-2 rounded-full">
                    <FiUpload className="text-lg" />
                </div>

                {/* Message */}
                <div className="text-sm niba-reg-font">
                    Please upload your photos to complete your order{' '}
                    <Link

                        to="/photo-upload"
                        className="font-medium underline underline-offset-4 hover:text-white/80 transition mx-2"
                    >
                        Click here to upload
                    </Link>
                </div>


            </div>
        </div>
    );
};

export default UploadTopPrompt;
