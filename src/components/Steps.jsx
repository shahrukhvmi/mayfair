import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Stepone from "./formsteps/Stepone";
import Steptwo from "./formsteps/Steptwo";
import Stepthree from "./formsteps/Stepthree";
import Stepfour from "./formsteps/Stepfour";
import Stepfive from "./formsteps/Stepfive";
import Stepsix from "./formsteps/Stepsix";
import Stepseven from "./formsteps/Stepseven";
import Stepeight from "./formsteps/Stepeight";
import Stepper from "./Stepper";
import Footer from "./Footer";
import  ApplicationLogo  from "../config/ApplicationLogo";
const Steps = () => {
  const [hideSidebar, setHideSidebar] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const paymentLoading = useSelector((state) => state.paymentLoader.loading);

  const productId = searchParams.get("product_id");

  useEffect(() => {
    if (!productId) {
      // Redirect to home or product list if product_id is missing
      navigate("/dashboard/", { replace: true });
    }
  }, [productId, navigate]);

  const currentStep = useSelector((state) => state.step?.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Stepone setHideSidebar={setHideSidebar} />;
      case 2:
        return <Steptwo setHideSidebar={setHideSidebar} />;
      case 3:
        return <Stepthree setHideSidebar={setHideSidebar} />;
      case 4:
        return <Stepfour setHideSidebar={setHideSidebar} />;
      case 5:
        return <Stepfive setHideSidebar={setHideSidebar} />;
      case 6:
        return <Stepsix setHideSidebar={setHideSidebar} />;
      case 7:
        return <Stepseven setHideSidebar={setHideSidebar} />;
      case 8:
        return <Stepeight setHideSidebar={setHideSidebar} />;
      default:
        return <Stepone setHideSidebar={setHideSidebar} />;
    }
  };

  // Optional: loading fallback while checking
  if (!productId) {
    return null; // or show loader/spinner
  }

  return (
    <>
      <div className={`py-7 bg-[#dacfff] ${paymentLoading ? "h-[100vh]" : ""}`}>
        <div className="consultation-form mx-auto w-full lg:mx-5 lg:w-auto xl:mx-6 xl:w-auto 2xl:mx-auto 2xl:w-[1366px] flex flex-col lg:flex-row font-inter overflow-hidden">
          {/* Left Sidebar */}
          <div
            className={`left lg:w-[35%] bg-[#160647] mx-3 md:mx-6 lg:mx-0 px-5 py-5 lg:px-6 xl:px-10 lg:py-6 xl:py-10 rounded-tl-xl rounded-tr-xl lg:rounded-tr-none lg:rounded-bl-xl shadow-lg ${hideSidebar ? "hidden" : ""
              }`}
          >
            <div className="brightness-0 invert w-32 lg:w-40">
              {/* <img src="/logo.svg" className="w-36 sm:w-36" alt="Logo" /> */}
              <ApplicationLogo className="w-36 sm:w-36" />
            </div>
            <div className="text-wrapper text-white">
              <h1 className="font-bold text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl pt-6 leading-tight lg:pe-10">
                Consultation <br className="hidden lg:block xl:hidden" />
                <span className="font-light">Form</span>
              </h1>
              <h2 className="text-xl text-gray-300 font-semibold pt-6 pb-3">Please tell us about your general health</h2>
              <p className="text-sm text-gray-400 block mb-4 w-full xl:w-[95%]">
                If you are a new patient, please complete the following questions to help us better understand and treat your condition. Our Clinical
                Staff will then review your responses and confirm the approval of your treatment. If we can't prescribe you a treatment, no payment is
                taken.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div
            className={`right relative bg-white mx-3 md:mx-6 lg:mx-0 ${hideSidebar ? "w-auto lg:w-full rounded-xl" : "lg:w-[65%] lg:rounded-tr-xl rounded-bl-xl lg:rounded-bl-none rounded-br-xl"
              }`}
          >
            <div className="flex flex-col justify-between h-full">
              <div className={`step-handler-wrapper p-5 xl:p-10 ${hideSidebar ? "" : "overflow-y-auto lg:h-[calc(100vh-250px)]"}`}>
                {renderStep()}
              </div>
              <Stepper />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Steps;
