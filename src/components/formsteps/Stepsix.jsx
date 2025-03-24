import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../../store/slice/stepper";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PrevButton from "../PrevBtn/PrevButton";
import NextButton from "../NextBtn/NextButton";
import dayjs from "dayjs";

const Stepsix = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can change to "auto" for instant scrolling
    });
  }, []);



  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.step.currentStep);
  const [steps, setStepsData] = useState({
    step1: null,
    step2: null,
    step3: null,
    step4: null,
    step5: null,
  });
  const [prev, setPrevData] = useState(null);
  // Load all steps data and previous step API data
  useEffect(() => {
    const loadStepsData = () => {
      const stepKeys = ["step1", "step2", "step3", "step4", "step5"];
      const data = {};

      stepKeys.forEach((step) => {
        const storedData = localStorage.getItem(step);
        data[step] = storedData ? JSON.parse(storedData) : null;
      });

      setStepsData(data); // Update state with loaded steps data
    };

    const stepPrevApiData = localStorage.getItem("stepPrevApiData");
    const parsedData = stepPrevApiData ? JSON.parse(stepPrevApiData) : null;

    setPrevData(parsedData?.last_consultation_data || null);

    loadStepsData(); // Load steps data into state
  }, []);

  return (
    <section className="bg-[#edfef6]">
      <div className="mx-auto w-full max-w-[900px] px-4  overflow-auto md:py-28 pb-40 md:pt-10 pt-10">
        <div className="flex justify-center">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-2xl md:text-4xl re-font tracking-[-2px]">
              Consultation Form Summary
            </h1>
          </div>
        </div>

        <div className="min-h-screen  md:p-6">
          <div className="max-w-4xl mx-auto  overflow-hidden">
            <div className="md:p-6">
              {/* General Information */}
              <div className="mb-8">
                <h2 className="text-lg reg-font mb-4">General Information:</h2>

                <div className="flex justify-between my-3">
                  <p>
                    <span className="light-font text-[#3E3E3E] text-sm">
                      Patient Name
                    </span>
                  </p>
                  <p className="reg-font text-[#1C1C29] text-sm">
                    {steps?.step1?.firstName || prev?.patientInfo?.firstName

                    } <span></span>
                    {steps?.step1?.lastName || prev?.patientInfo?.lastName}
                  </p>
                </div>

                <div className="flex justify-between my-3">
                  <p>
                    <span className="light-font text-[#3E3E3E] text-sm">
                      Patient’s Postcode*
                    </span>
                  </p>
                  <p className="reg-font text-[#1C1C29] text-sm uppercase">
                    {steps?.step1?.address?.postalcode || prev?.patientInfo?.address?.postalcode}
                  </p>
                </div>
                <div className="flex justify-between my-3">
                  <p>
                    <span className="light-font text-[#3E3E3E] text-sm">
                      Are you male or female?*
                    </span>
                  </p>
                  <p className=" text-[#1C1C29] py-1 rounded reg-font capitalize">
                    {steps?.step1?.gender || prev?.patientInfo?.gender}
                  </p>
                </div>

                <div className="flex justify-between my-3">
                  <p>
                    <span className="light-font text-[#3E3E3E] text-sm">
                      What is your date of birth?*
                    </span>
                  </p>

                  <p className="reg-font text-[#1C1C29] text-sm capitalize">
                    {steps?.step1?.dob ? dayjs(steps.step1.dob).format("DD-MM-YYYY") : ""
                      ||
                      prev?.patientInfo?.dob ? dayjs(prev?.patientInfo?.dob).format("DD-MM-YYYY") : ""}
                  </p>
                </div>
              </div>

              {/* BMI Card */}
              <div className="bg-[#212E53] text-white p-6 rounded-lg mb-8">
                <h2 className="light-font font-normal text-xl  mb-4 text-center">
                  Your Current BMI
                </h2>
                <hr className="my-6" />
                <div className="flex justify-between mb-2">
                  <p className="light-font text-sm">What is your height?*</p>
                  <p className="light-reg text-sm">


                    {steps?.step2?.unit === "imperial" || prev?.patientInfo?.bmi?.unit === "imperial" ? (
                      <>
                        <p>  {steps.step2?.ft || prev?.patientInfo?.bmi?.ft} ft  {steps.step2?.inch || prev?.patientInfo?.bmi?.inch} inch   </p>
                      </>) : (
                      <>
                        <p>  {steps.step2?.cm || prev?.patientInfo?.bmi?.cm} cm   </p>

                      </>)}
                  </p>



                </div>
                <div className="flex justify-between mb-4">
                  <p className="light-font text-sm">What is your weight?*</p>
                  <p className="reg-font text-sm">
                    {steps?.step2?.unit === "imperial" || prev?.patientInfo?.bmi?.unit === "imperial" ? (
                      <>
                        {steps.step2?.stones || prev?.patientInfo?.bmi?.stones} st  {steps.step2?.pound || prev?.patientInfo?.bmi?.pound} lb
                      </>) : (
                      <>
                        {steps.step2?.kg || prev?.patientInfo?.bmi?.kg} kg
                      </>)}

                  </p>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h2 className="text-2xl font-med mb-4">Medical Information:</h2>
                <div className="overflow-x-auto w-full">

                  <table className="w-full border-collapse bg-white rounded-md p-5">
                    <thead>
                      <tr className=" border-gray-300  bg-white font-semibold rounded-t-lg">
                        <th className="p-4 w-1/3 border-b border-r border-gray-300 text-left">Question</th>
                        <th className="p-4 w-1/6 border-b border-r border-gray-300 text-center">Answer</th>
                        <th className="p-4 w-1/3 border-b border-gray-300 text-left">Response</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(steps?.step3 || prev?.medicalInfo)?.map((item, index) => (
                        <tr key={index} className="border-b border-gray-300 rounded-md">
                          {/* Question Column */}
                          <td className="p-4 w-1/3 align-top border-r border-gray-300 rounded-md">
                            <div className="mt-2">
                              {item.question ? (
                                /ul|li/.test(item.question) ? (
                                  <div
                                    className="text-sm text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                      __html: item.question.replace(
                                        /<ul>/g,
                                        '<ul class="list-disc ml-5 space-y-2">'
                                      ),
                                    }}
                                  ></div>
                                ) : (
                                  <div className="text-sm text-gray-700">{item.question}</div>
                                )
                              ) : (
                                <span className="text-sm text-gray-500">N/A</span>
                              )}
                            </div>
                          </td>

             
                          <td className="p-4 w-1/6 align-center border-r border-gray-300 rounded-md capitalize text-center text-gray-700">
                            {item?.answer || <span className="text-gray-500">N/A</span>}
                          </td>

                         
                
                          <td className="p-4 w-full sm:w-1/3 border-gray-300 rounded-md">
                            <div className="mt-2 text-sm text-gray-700 break-words w-full whitespace-pre-wrap">
                              {item.subfield_response ? (
                                item.subfield_response
                              ) : (
                                <span className="text-gray-700">N/A</span>
                              )}
                            </div>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>

            {/* Navigation */}
            <div className="mt-10 justify-between mb-10 p-5 hidden sm:flex">
              <PrevButton label={"Back"} onClick={() => dispatch(prevStep())} />
              <NextButton label={"Next"} onClick={() => dispatch(nextStep())} />
            </div>


            <div className="fixed bottom-2 w-[95%] mx-auto left-0 right-0 z-50 block sm:hidden">
              <div className="relative flex justify-between items-center bg-white/30 backdrop-blur-lg rounded-lg py-3 px-6 shadow-lg border border-white/40">

                {/* Content Layer (to prevent blur on buttons) */}
                <div className="relative flex w-full justify-between items-center">
                  {/* Back Button */}
                  <button
                    onClick={() => dispatch(prevStep())}
                    className="flex flex-col items-center justify-center text-white rounded-md bg-[#4565BF] p-3"
                  >
                    <span className="text-md font-semibold px-6">Back</span>
                  </button>

                  {/* Proceed Button */}
                  <button
                    type="submit"
                    onClick={() => dispatch(nextStep())}
                    className="p-3 flex flex-col items-center justify-center text-white rounded-md bg-[#4565BF]"
                  >
                    <span className="text-md font-semibold px-6">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default Stepsix;
