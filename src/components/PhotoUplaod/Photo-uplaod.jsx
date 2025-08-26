import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import toast from 'react-hot-toast';
// import useCartStore from '@/store/useCartStore';
// import useImageUploadStore from '@/store/useImageUploadStore';
import { motion, AnimatePresence } from "framer-motion";

import { FaCheckCircle } from "react-icons/fa";
import Header from '../Header';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NextButton from '../NextBtn/NextButton';
import { useBMIImagesForOrderProcessMutation, useGetBMIImagesForOrderProcessQuery } from '../../store/services/PhotoUploadApi/PhotoUploadApi';
const PhotoUpload = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    console.log(open, "open");
    const [searchParams] = useSearchParams();
    const orderId = localStorage.getItem("order_id")
    const [orderIdGetUrl, setOrderIdGetUrl] = useState(null);
    useEffect(() => {
        const param = searchParams.get("order_id");
        if (param) {
            const parsedId = parseInt(param, 10);
            if (!isNaN(parsedId)) {
                setOrderIdGetUrl(parsedId);
            }
        }
    }, [searchParams]);

    const { control, setValue, handleSubmit, watch } = useForm();
    // const orderId = 1232132;
    const frontPhoto = watch('frontPhoto');

    const [loading, setLoading] = useState(false);
    const [ImagesSend, setImagesSend] = useState(false);

    // const { setImageUploaded, imageUploaded } = useImageUploadStore();

    // ✅ RTK Query - Fetch Images Status
    const { data: imageStatusData, isSuccess: imageStatusFetched } =
        useGetBMIImagesForOrderProcessQuery(orderId, { skip: !orderId });

    useEffect(() => {
        if (imageStatusFetched && imageStatusData) {

            // setImageUploaded(imageStatusData?.data?.status);
            localStorage.getItem('image-uplaod', imageStatusData?.status)
            setImagesSend(imageStatusData?.status);
            console.log("Image Upload Status", imageStatusData);
        }
    }, [imageStatusFetched, imageStatusData, orderId]);

    // ✅ RTK Query - Upload Mutation
    const [uploadImages] = useBMIImagesForOrderProcessMutation();

    const handleUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            setValue(type, file);
        }
    };

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
        });

    const onSubmit = async (data) => {
        try {
            if (!data.frontPhoto) {
                toast.error("Please upload Front images.");
                return;
            }
            setLoading(true);

            const frontBase64 = await toBase64(data.frontPhoto);

            const payload = {
                front: frontBase64,
                order_id: orderIdGetUrl ? orderIdGetUrl : orderId,
            };

            const res = await uploadImages(payload).unwrap();
            console.log(res, "response come..................................")
            if (res?.status === true) {
                setOpen(true);
            }

        } catch (error) {
            console.log(error, "Upload Error");

            if (error?.data?.message === "Unauthenticated.") {
                toast.error("Failed to upload images. Please Login again.");
                navigate("/login");
            }

            if (error?.data?.errors?.Order === "Order not found") {
                toast.error(error?.data?.errors?.Order);
            }

        } finally {
            setLoading(false);
        }
    };

    const renderUploadBox = (label, photo, type, placeholderUrl, suggestion) => {
        const handleDrop = (e) => {
            e.preventDefault();
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                setValue(type, e.dataTransfer.files[0]); // reuse your existing setValue
            }
        };

        const handleDragOver = (e) => {
            e.preventDefault();
        };

        return (

            <>

                <div className="flex flex-col items-center w-full sm:w-1/3 px-3">
                    <label className="w-full cursor-pointer">
                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            className="border-2 border-dashed border-purple-400 rounded-2xl p-2R 
                   hover:border-purple-600 hover:shadow-md transition-all duration-300 ease-in-out
                   flex flex-col items-center justify-center text-center relative min-h-[140px] bg-white"
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleUpload(e, type)}
                                className="hidden"
                            />

                            {/* ✅ No photo → Show upload UI */}
                            {!photo && (
                                <div className="flex flex-col items-center justify-center">
                                    <FiUpload className="text-purple-600 w-8 h-8 mb-3" />
                                    <p className="text-gray-700 text-sm niba-semibold-font">
                                        Drag files to upload <br />
                                        <span className="text-gray-400 text-xs">or click to browse</span>
                                    </p>
                                </div>
                            )}

                            {/* ✅ With photo → Show preview */}
                            {photo && (
                                <div className="flex flex-col items-center">
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt={`${label} preview`}
                                        className="w-28 h-40 object-contain rounded-lg mb-3"
                                    />
                                    <AiOutlineCheckCircle className="w-6 h-6 text-green-500 absolute top-3 right-3" />
                                </div>
                            )}

                            {/* Label */}
                            {/* <p className="mt-2 text-gray-800 font-medium">{label}</p> */}
                        </div>
                    </label>

                    {/* Suggestion / Helper text */}
                    <p className="text-xs text-gray-500 mt-2 text-center italic">{suggestion}</p>

                    {/* {photo && (
                    <p className="text-green-600 mt-1 text-sm italic">
                        {label} uploaded successfully
                    </p>
                )} */}
                </div>
            </>
        );
    };

    return (
        <>
            <Header />

            <div className="my-14">
                <AnimatePresence>
                    {open && (
                        <motion.div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[9999]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8 max-w-md w-full border border-white/30"
                            >
                                {/* Animated Check Icon */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 250, damping: 15 }}
                                    className="flex justify-center mb-4"
                                >
                                    <FaCheckCircle className="text-violet-700" color='text-violet-700' size={80} />
                                </motion.div>

                                {/* Title */}
                                <h2 className="text-2xl font-bold text-center text-violet-700">
                                    You’re All Set!
                                </h2>

                                {/* Message */}
                                <p className="text-md text-black text-center mt-3 mb-6 reg-font">
                                    Your photos have been uploaded and are now under review by our
                                    prescribers. We’ll approve your order once the review is complete
                                    and notify you straight away.
                                </p>

                                {/* Button */}
                                <NextButton
                                    className="bg-violet-700"
                                    label="Return to Dashboard"
                                    onClick={() => navigate("/dashboard")}
                                // className="w-full"
                                // disabled={loading || !frontPhoto || !sidePhoto}
                                // loading={loading}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="max-w-3xl mx-auto my-auto px-6 py-10 bg-white shadow-2xl rounded-3xl border border-gray-100"
                >
                    <div className="mb-8 max-w-2xl mx-auto text-left">
                        {/* Heading */}
                        <h1 className="bold-font mb-2 border-b pb-3 text-xl">
                            Please upload a <span className='bold-font text-black' >full body</span> picture of yourself
                        </h1>



                        {/* Description */}
                        {/* <p className="text-gray-700 mb-4">
                        Please upload a <span className="niba-bold-font">full body</span> picture of yourself.
                    </p> */}

                        {/* Bullet Points */}
                        <ul className="list-disc pl-6 text-gray-800 text-sm space-y-2 reg-font pt-2">
                            <li>We will only ask for this once.</li>
                            <li>We realise it's inconvenient, but this is a regulatory requirement designed for your safety and to prevent inappropriate use.</li>

                        </ul>
                    </div>


                    {/* Example Images */}
                    <div className="flex justify-center gap-4 mb-8">
                        <div className="flex flex-col items-center bg-white shadow-sm rounded-md mx-3 border-1">
                            <img src="../images/full-body-ok.png" alt="correct" className="w-28 h-40 object-cover rounded-lg" />
                            {/* <span className="text-green-500 font-bold my-1"><FaCheck size={18} /></span> */}
                        </div>
                        <div className="flex flex-col items-center bg-white shadow-sm rounded-md mx-3 border-1">
                            <img src="../images/face-x.png" alt="incorrect" className="w-28 h-40 object-cover rounded-lg" />
                            {/* <span className="text-red-500 font-bold my-1"><RxCross2 size={18} /></span> */}
                        </div>
                        <div className="flex flex-col items-center bg-white shadow-sm rounded-md mx-3 border-1">
                            <img src="../images/half-body-x.png" alt="incorrect" className="w-28 h-40 object-cover rounded-lg" />
                            {/* <span className="text-red-500 font-bold my-1"><RxCross2 size={18} /></span> */}
                        </div>
                    </div>




                    <div className="flex flex-wrap sm:flex-nowrap justify-center gap-6 mb-8">
                        <Controller
                            name="frontPhoto"
                            control={control}
                            defaultValue={null}
                            render={() =>
                                renderUploadBox(
                                    'Front Photo',
                                    frontPhoto,
                                    'frontPhoto',
                                    '/images/front_image.png',)
                            }
                        />

                        {/* <Controller
                        name="sidePhoto"
                        control={control}
                        defaultValue={null}
                        render={() =>
                            renderUploadBox(
                                'Side Photo',
                                sidePhoto,
                                'sidePhoto',
                                '/images/side_image.png',
                                'Stand sideways with good posture and full body visible.'
                            )
                        }
                    /> */}

                    </div>

                    <div className="flex flex-col items-center text-center">
                        <button
                            type="submit"
                            // onClick={handleAction}
                            disabled={loading || !frontPhoto}
                            className={`px-6 py-3 rounded-full text-white bold-font text-sm transition-all duration-150 ease-in-out
      flex justify-center items-center cursor-pointer
      ${loading || !frontPhoto
                                    ? "bg-gray-300 !cursor-not-allowed"
                                    : " border-[#47317c] bg-violet-700 hover:bg-[#3a2766]"}`}
                        >
                            {loading ? 'Uploading...' : 'Upload'}
                        </button>

                        {/* {(!frontPhoto) && (
                        <p className="text-xs text-gray-400 mt-2">
                            Please upload both images to enable this button
                        </p>
                    )} */}
                    </div>

                </form>
            </div >
        </>
    );
};

export default PhotoUpload;
