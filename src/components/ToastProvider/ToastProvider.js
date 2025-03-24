// src/components/ToastProvider.js
import { Toaster } from "react-hot-toast";

const ToastProvider = ({ value }) => {
    return (
        <Toaster position={value} reverseOrder={false} />
    );
};

export default ToastProvider;
