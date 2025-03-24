import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { nextStep, prevStep } from "../../store/slice/stepper";
import {
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
  FaChevronDown,
} from "react-icons/fa";
import { MenuItem, Select, TextField } from "@mui/material";
import { BiSearchAlt } from "react-icons/bi";
import toast from "react-hot-toast";
import { usePostStepsMutation } from "../../store/services/Steps/Steps";
import PrevButton from "../PrevBtn/PrevButton";
import NextButton from "../NextBtn/NextButton";
import { setStep5 } from "../../store/slice/stepSlice";

const Stepfive = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can change to "auto" for instant scrolling
    });
  }, []);

  const currentStep = useSelector((state) => state.step.currentStep);
  const [postSteps, { error: isError, isLoading }] =
    usePostStepsMutation();
  const [lastConsultation, setLastConsultation] = useState(null);
  const [prevStepFiveData, setprevStepFiveData] = useState(null);
  const dispatch = useDispatch();


  useEffect(() => {
    const stepPrevAPiData = localStorage.getItem("stepPrevApiData");
    const stepFivePrev = localStorage.getItem("step5");
    if (lastConsultation !== null || prevStepFiveData !== undefined) {
      const dataParse = JSON.parse(stepPrevAPiData);
      const stepfiveParse = JSON.parse(stepFivePrev);
      setLastConsultation(dataParse?.last_consultation_data?.gpdetails);
      setprevStepFiveData(stepfiveParse);
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  // Watch form values
  const gpDetails = watch("gpDetails");
  const gepTreatMent = watch("gepTreatMent");
  const postalCode = watch("postalCode");
  const searchClicked = watch("searchClicked", false);
  const addressOptions = watch("addressOptions", []);
  const selectedAddress = watch("selectedAddress", null);

  const getPid = localStorage.getItem("pid");
  const onSubmit = async (data, e) => {
    const gpDetails = {
      gpConsent: data.gpDetails,
      consentDetail: data.gpDetails === "yes" ? data.gepTreatMent : "",
      email:
        data.gpDetails === "yes" && data.gepTreatMent === "yes"
          ? data.email
          : "",
      gpName:
        data.gpDetails === "yes" && data.gepTreatMent === "yes"
          ? data.gpName
          : "",
      zipcode:
        data.gpDetails === "yes" && data.gepTreatMent === "yes"
          ? data.postalCode
          : "",
      addressLine1:
        data.gpDetails === "yes" && data.gepTreatMent === "yes"
          ? data.addressLine1
          : "",
      addressLine2:
        data.gpDetails === "yes" && data.gepTreatMent === "yes"
          ? data.addressLine2
          : "",
      state:
        data.gpDetails === "yes" && data.gepTreatMent === "yes"
          ? data.state
          : "",
      city:
        data.gpDetails === "yes" && data.gepTreatMent === "yes"
          ? data.city
          : "",
    };
    try {
      const response = await postSteps({
        gpdetails: gpDetails,
        pid: getPid,
      }).unwrap();
      if (response.status === true) {
        dispatch(nextStep());
        dispatch(setStep5(response?.lastConsultation?.fields?.gpdetails));
      }
      // e.preventDefault();

    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = (index) => {
    const selected = addressOptions[index];
    setValue("selectedAddress", selected);
    setValue("addressLine1", selected.Address1 || "");
    setValue("addressLine2", selected.Address2 || "");
    setValue("city", selected.City || "");
    setValue("state", selected.County || "");
    setValue("postalCode", postalCode || "");
  };

  const handleAddress = async () => {
    try {
      const response = await fetch(
        `https://api.nhs.uk/service-search/search-postcode-or-place?api-version=1&search=${postalCode}`,
        {
          method: "POST",
          headers: {
            "subscription-key": "7a46f2abc01b47b58e586ec1cda38c68",
          },
          body: JSON.stringify({
            filter:
              "(OrganisationTypeID eq 'GPB') or (OrganisationTypeID eq 'GPP')",
            top: 25,
            skip: 0,
            count: true,
          }),
        }
      );
      const data = await response.json();
      if (data.errorName) {
        toast.error("No address found for the given postal code.");
      }

      if (data && data.value) {
        setValue("addressOptions", data.value);
      } else {
        setValue("addressOptions", []);
        // toast.error("No address found for the given postal code.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setValue("addressOptions", []);
      toast.error("Error fetching address.");
    }
  };

  useEffect(() => {
    if (searchClicked) {
      handleAddress();
      setValue("searchClicked", false); // Reset searchClicked state
    }
  }, [searchClicked, postalCode]);


  useEffect(() => {
    if (lastConsultation || prevStepFiveData) {
      setValue(
        "gpDetails",
        prevStepFiveData?.gpConsent || "" || lastConsultation?.gpConsent
      );
      setValue(
        "gepTreatMent",
        prevStepFiveData?.consentDetail || "" || lastConsultation?.consentDetail
      );
      setValue(
        "email",
        prevStepFiveData?.email || "" || lastConsultation?.email
      );
      setValue(
        "gpName",
        prevStepFiveData?.gpName || "" || lastConsultation?.gpName
      );
      setValue(
        "postalCode",
        prevStepFiveData?.zipcode || "" || lastConsultation?.zipcode
      );
      setValue(
        "addressLine1",
        prevStepFiveData?.addressLine1 || "" || lastConsultation?.addressLine1
      );
      setValue(
        "addressLine2",
        prevStepFiveData?.addressLine2 || "" || lastConsultation?.addressLine2
      );
      setValue(
        "state",
        prevStepFiveData?.state || "" || lastConsultation?.state
      );
      setValue("city", prevStepFiveData?.city || "" || lastConsultation?.city);
    }

    trigger("gpDetails")
  }, [lastConsultation, setValue, prevStepFiveData, trigger]);

  return (
    <div className="mx-auto w-full max-w-[636px] px-4 my-7 overflow-auto p-0 sm:py-6 mb-14 sm:mb-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step Indicator */}
        <div className="flex justify-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xl bg-[#4565BF] rounded-full text-white flex items-center justify-center w-11 h-11">
              0{currentStep}
            </span>
            <h1 className="text-2xl md:text-4xl tracking-[-2px]">GP Details</h1>
          </div>
        </div>

        {/* Question: Inform GP */}
        <div>
          <h1 className="text-gray-500 text-base">
            Would you like us to inform your GP about this consultation and any
            prescribed treatments?
          </h1>
          <div className="flex mt-4 gap-2">
            <label
              htmlFor="yes"
              className={
                gpDetails === "yes"
                  ? "border-[#4DB581] text-[#4DB581] bg-green-50 border-[2px] rounded shadow-lg flex justify-center items-center w-1/2"
                  : "border-gray-300 border-[1px] text-gray-500 px-4 py-1.5 rounded w-1/2 text-center cursor-pointer"
              }
            >
              Yes{" "}
              {gpDetails === "yes" && <FaCheck className="ms-4" size={15} />}
              <input
                id="yes"
                type="radio"
                value="yes"
                {...register("gpDetails", {
                  // required: "Please select Yes or No.",
                  required: "",
                })}
                className="hidden"
              />
            </label>
            <label
              htmlFor="no"
              className={
                gpDetails === "no"
                  ? "border-[#4DB581] cursor-pointer text-[#4DB581] rounded bg-green-50 border-[2px] shadow-lg flex justify-center items-center w-1/2"
                  : "border-gray-300 border-[1px] text-gray-500 px-4 py-1.5 rounded w-1/2 text-center cursor-pointer"
              }
            >
              No {gpDetails === "no" && <FaCheck className="ms-4" size={15} />}
              <input
                id="no"
                type="radio"
                value="no"
                {...register("gpDetails", {
                  required: " ",
                  // required: "Please select Yes or No.",
                })}
                className="hidden"
              />
            </label>
          </div>
          {errors.gpDetails && (
            <p className="text-red-500 mt-2">{errors.gpDetails.message}</p>
          )}
        </div>

        {/* Conditional Rendering for Yes */}
        {gpDetails === "yes" && (
          <div>
            <p className="text-gray-500 mt-6 sm:mt-8 text-sm sm:text-base">
              Do you consent for us to inform your GP about the treatment we have provided?
            </p>

            {/* Options */}
            <div className="flex flex-col sm:flex-row gap-3 mt-3 sm:mt-4">
              <label
                htmlFor="gepTreatMentYes"
                className={`${gepTreatMent === "yes"
                    ? "cursor-pointer border-[#4DB581] px-4 py-2 text-sm sm:text-base text-[#4DB581] rounded bg-green-50 border-[2px] shadow-md flex justify-center items-center w-full sm:w-1/2"
                    : "border-gray-300 px-4 py-2 text-sm sm:text-base text-gray-500 rounded border-[1px] flex justify-center items-center w-full sm:w-1/2 cursor-pointer"
                  }`}
              >
                Yes - Please inform my GP{" "}
                {gepTreatMent === "yes" && <FaCheck className="ml-2" size={15} />}
                <input
                  id="gepTreatMentYes"
                  type="radio"
                  value="yes"
                  {...register("gepTreatMent", {
                    required: gpDetails === "yes" ? "Please select Yes or No." : true,
                  })}
                  className="hidden"
                />
              </label>

              <label
                htmlFor="gepTreatMentNo"
                className={`${gepTreatMent === "no"
                    ? "cursor-pointer border-[#4DB581] px-4 py-2 text-sm sm:text-base text-[#4DB581] rounded bg-green-50 border-[2px] shadow-md flex justify-center items-center w-full sm:w-1/2"
                    : "border-gray-300 px-4 py-2 text-sm sm:text-base text-gray-500 rounded border-[1px] flex justify-center items-center w-full sm:w-1/2 cursor-pointer"
                  }`}
              >
                No {gepTreatMent === "no" && <FaCheck className="ml-2" size={15} />}
                <input
                  id="gepTreatMentNo"
                  type="radio"
                  value="no"
                  {...register("gepTreatMent", {
                    required: gpDetails === "yes" ? "Please select Yes or No." : false,
                  })}
                  className="hidden"
                />
              </label>
            </div>

            {/* Error Message */}
            {errors.gepTreatMent && (
              <p className="text-red-500 mt-2 text-sm sm:text-base">{errors.gepTreatMent.message}</p>
            )}
          </div>
        )}


        {/* Conditional Rendering for No */}
        {gpDetails === "no" && (
          <div className="bg-[#FFF3CD] px-4 py-4 mt-6 text-gray-700 rounded shadow-md transform transition-all ease-in-out duration-500 hover:scale-105 hover:bg-[#FFEBB5]">
            <p className="text-sm md:text-base">
              You should inform your doctor of any medication you take. If you
              would like us to email you a letter to forward onto your doctor,
              please contact us.
            </p>
          </div>
        )}

        {/* Conditional Rendering for Additional Fields */}
        {gpDetails === "yes" && gepTreatMent === "yes" && (
          <div className="sm:mb-0  mb-40 mt-8">
            <div className="">
              <p className="">Please provide GP Email (optional)</p>
              <div className="flex items-center mt-4">
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  sx={{ width: "50%" }}
                  {...register("email", {
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email format.",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </div>
            </div>
            <div className="mt-4">
              <TextField
                id="standard-basic"
                label="GP Name"
                type="text"
                variant="standard"
                sx={{ width: "100%" }}
                {...register("gpName", {
                  required:
                    gpDetails === "yes" && gepTreatMent === "yes"
                      ? "GP Name is required."
                      : false,
                })}
                error={!!errors.gpName}
                helperText={errors.gpName?.message}
              />
            </div>
            <div className="mt-8">
              <p className="mb-2">
                Enter postal code to search GP address. If you can't find it
                enter manually.
              </p>
              <div className="flex items-center mt-8">
                <div className="flex items-center">
                  <TextField
                    id="standard-basic"
                    label="PostalCode"
                    type="text"
                    variant="standard"
                    error={!!errors.postalCode}
                    {...register("postalCode", {
                      required:
                        gpDetails === "yes" ? "PostalCode is required." : false,
                    })}
                    helperText={errors.postalCode?.message}
                  />
                  <button
                    type="button"
                    className="bg-[#4565BF] px-3 py-1.5 rounded text-white flex items-center ml-2"
                    onClick={() => {
                      setValue("addressOptions", []); // Clear previous address options
                      setValue("searchClicked", true);
                    }}
                  >
                    <span>Search</span>
                    <span className="ml-1.5 text-lg">
                      <BiSearchAlt />
                    </span>
                  </button>
                </div>

                {addressOptions.length > 0 && (
                  <div className="ml-1.5 w-1/2">
                    <Select
                      variant="standard"
                      IconComponent={FaChevronDown}
                      fullWidth
                      {...register("addressSelect", {
                        required: "Please select an address",
                      })} // Validation for Select
                      onChange={(e) => handleSelect(e.target.value)}
                      defaultValue=""
                    >
                      {addressOptions.map((address, index) => (
                        <MenuItem key={index} value={index}>
                          {`${address.OrganisationName}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex w-full gap-2 justify-between">
              <div className="w-1/2">
                <TextField
                  id="standard-basic"
                  label="Addressline 1"
                  type="text"
                  variant="standard"
                  className="w-full"
                  {...register("addressLine1")}
                />
              </div>
              <div className="w-1/2">
                <TextField
                  id="standard-basic"
                  label="Addressline 2"
                  variant="standard"
                  className="w-full"
                  {...register("addressLine2")}
                />
              </div>
            </div>
            <div className="mt-8 flex w-full gap-2 justify-between">
              <div className="w-1/2">
                <TextField
                  id="standard-basic"
                  type="text"
                  label="County"
                  variant="standard"
                  className="w-full"
                  {...register("state")}
                />
              </div>
              <div className="w-1/2">
                <TextField
                  id="standard-basic"
                  type="text"
                  label="City"
                  variant="standard"
                  className="w-full"
                  {...register("city")}
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 sm:flex justify-between mb-10 hidden ">
          <PrevButton label={"Back"} onClick={() => dispatch(prevStep())} />
          <NextButton label={"Next"} disabled={!isValid || isLoading} loading={isLoading} />
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
                disabled={!isValid || isLoading}
                className={`p-3 flex flex-col items-center justify-center ${!isValid || isLoading
                  ? "disabled:opacity-50 disabled:hover:bg-[#4565BF] disabled:cursor-not-allowed bg-[#4565BF] text-white rounded-md"
                  : "text-white rounded-md bg-[#4565BF]"
                  }`}
              >
                <span className="text-md font-semibold px-6">Next</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Stepfive;
