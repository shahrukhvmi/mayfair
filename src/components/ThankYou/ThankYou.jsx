import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link, useNavigate } from "react-router-dom";
import { HiBadgeCheck } from "react-icons/hi";
import { RiErrorWarningLine } from "react-icons/ri";
import { useGetBMIImagesForOrderProcessQuery } from "../../store/services/PhotoUploadApi/PhotoUploadApi";

const ThankYou = () => {
  // Refs for GSAP animations
  const checkmarkRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const backgroundRef = useRef(null);

  const Navigate = useNavigate();

  const handleGoBack = () => {
    Navigate("/dashboard/");
    localStorage.removeItem("step2");
    localStorage.removeItem("cart");
    localStorage.removeItem("addonCart");
    localStorage.removeItem("progress");
    localStorage.removeItem("currentStep");
    localStorage.removeItem("discountCode");
    localStorage.removeItem("isCouponApplied");
    localStorage.removeItem("discountType");
    localStorage.removeItem("discountAmount");
    localStorage.removeItem("previous_id");
  };
  const orderId = localStorage.getItem("order_id")

  const reorder = localStorage.getItem('reorder')

  console.log(reorder, "reorder")
  const [ImagesSend, setImagesSend] = useState(false);

  // const { setImageUploaded, imageUploaded } = useImageUploadStore();

  // ✅ RTK Query - Fetch Images Status
  const { data: imageStatusData, isSuccess: imageStatusFetched } =
    useGetBMIImagesForOrderProcessQuery(orderId, { skip: !orderId });

  useEffect(() => {
    if (imageStatusFetched) {
      // setImageUploaded(imageStatusData?.data?.status);
      localStorage.setItem('image-uplaod', imageStatusData?.status)
      setImagesSend(imageStatusData?.status);
      console.log("Image Upload Status", imageStatusData);
    }
  }, [imageStatusFetched, imageStatusData]);



  console.log(ImagesSend, "ImagesSend")
  const handleGoUpload = () => {
    Navigate("/photo-upload");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#dacfff] px-6  py-12  mx-auto">
      <div className="bg-white  rounded-lg shadow-lg p-8 text-center w-full sm:w-3/5">
        <div className="text-center">
          <div role="status" className="mb-8">
            <HiBadgeCheck className="inline w-16 h-16 text-gray-200 fill-purple-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-800  mb-8">Thank you for your order</h2>







            <div className="text-left text-gray-600  mb-5 ">



              <blockquote
                style={{
                  margin: 0,
                  padding: '10px',
                  backgroundColor: '#F9F9F9',
                  borderLeft: '3px solid #ccc',
                  borderRight: '3px solid #ccc',
                  borderRadius: 15,
                  padding: 20,
                }}>
                <h2 className="font-semibold underline text-black mb-2">
                  Photo Upload Request:
                </h2>{" "}
                <p className="reg-font text-gray-700 my-3">To complete your order, please upload a clear, recent full-body photo as part of our prescription approval process. This helps our prescribers verify your BMI and ensure the safe and appropriate supply of your treatment.
                 

                </p>

                 <p className="reg-font text-gray-700 my-3">Once your photo has been reviewed and approved, your order will be processed and dispensed by our pharmacy.</p> 
                <p className="reg-font text-gray-700 my-3 ">  Your privacy is important to us — all photos are stored securely, encrypted, and handled in strict confidence in line with data protection regulations.</p>
              </blockquote>

              <div className="my-6 flex justify-center">
                <button className="bg-[#f8d86e] border-[#FFF3CD] rounded-md py-3 text-black flex bold-font cursor-pointer w-full justify-start sm:justify-center p-3 text-left" onClick={handleGoUpload}>
                  <span>
                    <RiErrorWarningLine className="text-black me-2" size={20} />
                  </span>
                  Action Required: Please upload your full-body image to complete your order

                </button>
              </div>
              {/* <p>
                We have received your medical consultation form which is now being reviewed by our prescribers. You may be contacted by a member of
                our medical team for more information prior to your medication being dispensed. Details of your order have been emailed to you and is
                also available to view on the ‘my orders’ section of your account.
              </p> */}
              <p className="mt-2">
                <span className="font-semibold underline text-black">Delivery:</span> All orders, once approved, are shipped by courier from Monday to
                Thursday by next-day tracked delivery. Please note that if your order is not approved by Thursday afternoon it will not be dispatched
                until the following Monday. This is due to cold-chain requirements.
              </p>
              <p className="mt-2">
                <span className="font-semibold underline text-black">Changes or cancellation:</span> If there are any changes you would like to make
                to your order or to cancel it, please contact us immediately by email on{" "}
                <a href="mailto:contact@mayfairweightlossclinic.co.uk." className="text-violet-700 font-semibold">
                  contact@mayfairweightlossclinic.co.uk.
                </a>{" "}
                Please note that as once your medication has been dispensed you will not be able to cancel or return your order. This is due to
                legislation around prescription only medication.
              </p>

              {ImagesSend &&


                <button
                  onClick={handleGoBack}
                  className="bg-violet-700 hover:bg-violet-600 text-white px-2 sm:px-8 py-2 rounded-md font-medium transition-all duration-150 ease-in w-full mt-6"
                >
                  Continue to View Order Details
                </button>
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ThankYou;
