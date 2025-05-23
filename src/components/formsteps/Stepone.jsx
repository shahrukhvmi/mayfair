import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaCheck, FaSearch } from "react-icons/fa";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { nextStep } from "../../store/slice/stepper";
import { useDispatch, useSelector } from "react-redux";
import { setStep1 } from "../../store/slice/stepSlice";
import dayjs from "dayjs";
import { useFetchAddressesQuery } from "../../store/services/addressApi/addressApi";
import toast from "react-hot-toast";
import { usePostStepsMutation } from "../../store/services/Steps/Steps";
import NextButton from "../NextBtn/NextButton";
import { useLocation } from "react-router-dom";

const Stepone = ({ setHideSidebar }) => {
  setHideSidebar(false);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can change to "auto" for instant scrolling
    });
  }, []);

  const location = useLocation();

  // Parse the query string
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("product_id");

  useEffect(() => {
    console.log("Product ID from query:", productId);
    // you can now use productId to fetch data or set state
  }, [productId]);

  // changes done on live..??
  const dispatch = useDispatch();
  const stepPrevApiData = localStorage.getItem("stepPrevApiData");
  const stepPrev = localStorage.getItem("step1");
  const userData = localStorage.getItem("userData");
  const [lastConsultation, setLastConsultation] = useState(null);
  const [prevStep1, setPrevStep1] = useState(null);
  const [userInfo, setUseriIfo] = useState(null);
  const [btnZipCode, setbtnZipCode] = useState(false);

  useEffect(() => {
    if (stepPrevApiData !== null || stepPrev !== undefined || userData !== undefined) {
      const parsedData = JSON.parse(stepPrevApiData);

      const stepPrevParse = stepPrev !== undefined && stepPrev != "undefined" && stepPrev ? JSON.parse(stepPrev) : undefined;
      const userInfo = JSON.parse(userData);

      setLastConsultation(parsedData?.last_consultation_data?.patientInfo);
      setPrevStep1(stepPrevParse);
      setUseriIfo(userInfo?.profile?.user);
    }
  }, []);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // Validation mode
    // defaultValues: {
    //   firstName: prevStep1?.firstName || lastConsultation?.firstName || userInfo?.fname || "",
    //   lastName: prevStep1?.lastName || userInfo?.lname || lastConsultation?.lastName || "",
    //   phoneNumber: prevStep1?.phoneNo || userInfo?.phone || lastConsultation?.phoneNo || "",
    //   gender: prevStep1?.gender || userInfo?.gender || lastConsultation?.gender || "",
    //   dateOfBirth: prevStep1?.dob || userInfo?.dob || lastConsultation?.dob || null,
    //   breastFeeding: prevStep1?.pregnancy || lastConsultation?.pregnancy || "",
    //   streetAddress: prevStep1?.addressone || lastConsultation?.address?.addressone || "",
    //   postCode: prevStep1?.postalcode || lastConsultation?.address?.postalcode || "",
    //   state: prevStep1?.state || lastConsultation?.address?.state || "",
    //   city: prevStep1?.city || lastConsultation?.address?.city || "",
    //   ethnicity: prevStep1?.ethnicity || lastConsultation?.ethnicity || "",
    // },
  });

  // Watch the values of gender and breastFeeding
  const gender = watch("gender");
  const selectedEthnicity = watch("ethnicity");
  const breastFeeding = watch("breastFeeding");
  const [WarningMessage, setWarningMessage] = useState();
  const [zipCode, setZipCode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressOptions, setAddressOptions] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  useEffect(() => {
    if (lastConsultation || prevStep1 || userInfo) {
      setZipCode(prevStep1?.address?.postalcode || lastConsultation?.address?.postalcode || "");
      setValue("postCode", prevStep1?.address?.postalcode || lastConsultation?.address?.postalcode || "");
      setValue("firstName", prevStep1?.firstName || lastConsultation?.firstName || "" || userInfo?.fname);
      setValue("lastName", lastConsultation?.lastName || prevStep1?.lastName || "" || userInfo?.lname);
      setValue("phoneNumber", lastConsultation?.phoneNo || prevStep1?.phoneNo || "" || userInfo?.phone);
      setValue("gender", lastConsultation?.gender || prevStep1?.gender || "" || userInfo?.gender);
      setValue("dateOfBirth", lastConsultation?.dob || prevStep1?.dob || "" || userInfo?.dob);
      setValue("breastFeeding", lastConsultation?.pregnancy || prevStep1?.pregnancy || "");
      setValue("ethnicity", prevStep1?.ethnicity || "" || lastConsultation?.ethnicity);
      setValue("streetAddress", lastConsultation?.address?.addressone || prevStep1?.address?.addressone || "");
      setValue("streetAddress2", lastConsultation?.address?.addresstwo || prevStep1?.address?.addresstwo || "");
      setValue("city", lastConsultation?.address?.city || prevStep1?.address?.city || "");
      // setValue("country", lastConsultation.address?.country || "");

      const dob = getValues("dateOfBirth");
      if (!dob) {
        setDobError("Date of birth is required");
      } else {
        const age = today.diff(dob, "year");
        if (productId == 1) {
          if (age < 18) {
            setDobError("You must be at least 18 years old");
            setValue("dateOfBirth", dob); // ❗️clear the form value to make button disabled
          } else if (age > 75) {
            setDobError("Wegovy (Semaglutude) is not recommended for individuals above 75 years of age");
            setValue("dateOfBirth", dob); // ❗️clear the form value to make button disabled
          } else {
            setDobError("");
            setValue("dateOfBirth", dob);
          }
        } else if (productId == 4) {
          if (age < 18) {
            setDobError("You must be at least 18 years old");
            setValue("dateOfBirth", dob); // ❗️clear the form value to make button disabled
          } else if (age > 85) {
            setDobError("Mounjaro (Tirzepatide) is not recommended for individuals above 85 years of age");
            setValue("dateOfBirth", dob); // ❗️clear the form value to make button disabled
          } else {
            setDobError("");
            setValue("dateOfBirth", dob);
          }
        } else {
          setDobError("");
          setValue("dateOfBirth", dob);
        }
      }

      setValue("state", prevStep1?.address?.state || "" || lastConsultation?.address?.state);
      trigger([
        "firstName",
        "lastName",
        "phoneNumber",
        "gender",
        "dateOfBirth",
        "breastFeeding",
        "streetAddress",
        "postCode",
        "state",
        "city",
        "ethnicity",
      ]).then((isValid) => {
        if (!isValid) console.log("Errors:", errors);
      });
    }
  }, [lastConsultation, setValue, trigger, prevStep1]);

  // 👇👇**RTK Query - Fetch addresses**👇👇
  const { data, error, isLoading } = useFetchAddressesQuery(zipCode, {
    skip: !searchClicked || !zipCode,
  });

  const handleSearch = () => {
    if (zipCode.trim() !== "") {
      setSearchClicked(true);
    } else {
      toast.error(error?.message);
    }
    // if (error) {
    //   toast.error(error?.message || "Invalid Postal Code");
    // }
  };

  const handleSelect = (index, setValue) => {
    const selected = addressOptions[index];
    setSelectedAddress(selected);
    setValue("streetAddress", selected.line_1 || "");
    setValue("streetAddress2", selected.line_2 || "");
    setValue("city", selected.town_or_city || "");
    setValue("state", selected.county || "");
    setValue("postalCode", zipCode || "");
  };

  // **Effect to Update Dropdown Options**
  useEffect(() => {
    if (data?.addresses) {
      setAddressOptions(data.addresses);
    } else {
      setAddressOptions([]);
    }
  }, [data]);

  const reorder_concent = localStorage.getItem("reorder_concent") || null;
  const currentStep = useSelector((state) => state.step.currentStep);
  const [postSteps, { error: isError, isLoading: loader }] = usePostStepsMutation();

  const getPid = localStorage.getItem("pid");
  const stockPid = localStorage.getItem("p_id");

  const onSubmit = async (data) => {
    const patientInfo = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNo: data.phoneNumber,
      gender: data.gender,
      dob: data.dateOfBirth,
      pregnancy: data.breastFeeding,
      address: {
        postalcode: data.postCode,
        addressone: data.streetAddress,
        addresstwo: data.streetAddress2,
        city: data.city,
        state: data.state,
        // country: "country",
      },

      ethnicity: data.ethnicity,
      universal_note: "",
    };
    try {
      const response = await postSteps({
        patientInfo: patientInfo,
        pid: getPid || stockPid,
        reorder_concent: reorder_concent ? reorder_concent.toString() : null,
      }).unwrap();
      console.log(response, "response");
      if (response?.status === true) {
        dispatch(setStep1(response?.lastConsultation?.fields?.patientInfo));

        // toast.success(response?.message);
        dispatch(nextStep());
        localStorage.removeItem("previous_id");
      } else {
        console.log(isError, "isError");
        toast.error("Invalid login response");
      }
    } catch (err) {
      const errors = err?.data?.original?.errors;
      if (errors && typeof errors === "object") {
        Object.keys(errors).forEach((key) => {
          const errorMessage = errors[key];
          Array.isArray(errorMessage) ? errorMessage.forEach((msg) => toast.error(msg)) : toast.error(errorMessage);
        });
      } else {
        toast.error(product_error)
      }
    }
  };

  // Date Check?????????????????????????????????????????/

  const [dobError, setDobError] = useState("");

  const today = dayjs();

  const handleDateChange = (date) => {
    if (!date) {
      setDobError("Date of birth is required");
      setValue("dateOfBirth", null);
      return;
    }

    const age = today.diff(date, "year");

    console.log(age, "Aaaggeeeeee");

    if (productId == 1) {
      if (age < 18) {
        setDobError("You must be at least 18 years old");
        setValue("dateOfBirth", date); // ❗️clear the form value to make button disabled
      } else if (age > 75) {
        setDobError("Wegovy (Semaglutude) is not recommended for individuals above 75 years of age");
        setValue("dateOfBirth", date); // ❗️clear the form value to make button disabled
      } else {
        setDobError("");
        setValue("dateOfBirth", date);
      }
    } else if (productId == 4) {
      if (age < 18) {
        setDobError("You must be at least 18 years old");
        setValue("dateOfBirth", date); // ❗️clear the form value to make button disabled
      } else if (age > 85) {
        setDobError("Mounjaro (Tirzepatide) is not recommended for individuals above 85 years of age");
        setValue("dateOfBirth", date); // ❗️clear the form value to make button disabled
      } else {
        setDobError("");
        setValue("dateOfBirth", date);
      }
    } else {
      setDobError("");
      setValue("dateOfBirth", date);
    }
  };

  const textFieldStyles = {
    "& label": {
      color: "#6b7280", // Default label color
      fontSize: 16,
      top: "-2px",
      fontFamily: "Inter_28pt-Regular",
    },
    "& label.Mui-focused": {
      color: "#6c757d", // Label color when focused
    },
    "& .MuiInputBase-input": {
      color: "#111827", // Text color inside input
      borderBottom: "2px solid #f2f3f5",
      paddingTop: "10px",
      fontFamily: "Inter_28pt-Regular",
    },
    "& .MuiInputBase-input:focus": {
      color: "#111827", // Text color inside input
      borderBottom: "2px solid #f7a564",
    },
    "& .MuiInput-underline:before": {
      display: "none", // Default underline color
    },
    "& .MuiInput-underline:hover:before": {
      display: "none", // Default underline color
    },
    "& .MuiInput-underline:after": {
      display: "none", // Default underline color
    },
  };

  const selectStyles = {
    "& label": {
      color: "#6b7280", // Default label color
      fontSize: 20,
      top: "-2px",
    },
    "& label.Mui-focused": {
      color: "#6c757d", // Label color when focused
    },
    "& .MuiSelect-select": {
      color: "#111827", // Text color inside select
      borderBottom: "2px solid #f2f3f5", // Custom bottom border
    },
    "& .MuiSelect-select:focus": {
      color: "#111827",
      borderBottom: "2px solid #f7a564", // Focus bottom border
    },
    "& .MuiInput-underline:before": {
      display: "none", // Removes default underline
    },
    "& .MuiInput-underline:hover:before": {
      display: "none",
    },
    "& .MuiInput-underline:after": {
      display: "none",
    },
  };

  // Effect to enable/disable the button
  useEffect(() => {
    setbtnZipCode(!zipCode?.trim()); // Disable if empty
  }, [zipCode]);

  useEffect(() => {
    if (gender === "male") {
      setWarningMessage("");
    }
  }, [gender]);
  return (
    <div className="pb-20 sm:pb-0">
      <h1 className="text-2xl lg:text-3xl 2xl:text-4xl font-light">
        Step 1: <span className="font-bold">Patient Information</span>
      </h1>

      <p className="text-2xl text-gray-800 mb-3 pb-2 font pt-5 lg:pt-5">Personal Information</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:gap-6 gap-3 pe-0 md:pe-40">
        {/* First Name & Last Name */}
        <div className="flex gap-4">
          <TextField
            label="First Name"
            fullWidth
            sx={textFieldStyles}
            variant="standard"
            value={watch("firstName") || ""}
            {...register("firstName", { required: "First name is required" })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            InputLabelProps={{
              shrink: true,
              sx: {
                fontSize: "20px", // same size always
                transform: "translate(0, 1.5px) scale(1)", // prevent shrink scaling
              },
            }}
            InputProps={{
              sx: {
                fontSize: "16px", // input text size to match label
              },
            }}
          />
          <TextField
            label="Last Name"
            variant="standard"
            value={watch("lastName") || ""}
            fullWidth
            sx={textFieldStyles}
            {...register("lastName", { required: "Last name is required" })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            InputLabelProps={{
              shrink: true,
              sx: {
                fontSize: "20px", // same size always
                transform: "translate(0, 1.5px) scale(1)", // prevent shrink scaling
              },
            }}
            InputProps={{
              sx: {
                fontSize: "16px", // input text size to match label
              },
            }}
          />
        </div>
        <div className="mb-3 sm:mb-0">
          <p className="text-xs text-gray-500 font-medium">Please enter your first and last name exactly as it appears on your ID.</p>
        </div>

        {/* Phone Number */}

        <Controller
          name="phoneNumber"
          control={control}
          value={watch("phoneNumber") || ""}
          rules={{ required: "Phone number is required" }}
          render={({ field }) => (
            <div className="w-full sm:w-1/2">
              <label htmlFor="" className="font-medium text-md text-gray-700 mb-2 block">
                Phone Number
              </label>
              <PhoneInput
                country="gb"
                placeholder="Enter your number"
                inputStyle={{ width: "100%" }} // Always 100% of wrapper
                {...field}
              />
            </div>
          )}
        />
        {errors.phoneNumber && (
          <label htmlFor="" className="text-red-500 text-sm">
            {errors.phoneNumber.message}
          </label>
        )}

        {/* Gender Selection */}
        {/* <div className="sm:flex justify-between">
          <div className="">
            <p className="reg-font text-[#1C1C29]  my-2 text-md">
              What is your gender?*
            </p>
          </div>
          <div className="flex gap-4">
            <label
              className={`reg-font text-[#3E3E3E] px-10 py-2 border rounded-md cursor-pointer ${gender === "female"
                ? "flex items-center border-[#4DB581] cursor-pointer text-[#4DB581] rounded bg-green-50 border-[2px] shadow-lg"
                : "bg-white"
                }`}
            >
              <input
                type="radio"
                value="female"
                {...register("gender", {
                  required: "",
                })}
                className="hidden"
              />
              <span>Female</span>
              {gender === "female" && (
                <span>
                  <FaCheck className="ms-2" size={15} />
                </span>
              )}
            </label>

            <label
              className={`reg-font text-[#3E3E3E] px-10 py-2 border rounded-md cursor-pointer  ${gender === "male"
                ? "flex items-center border-[#4DB581] cursor-pointer text-[#4DB581] rounded bg-green-50 border-[2px] shadow-lg"
                : "bg-white"
                }`}
            >
              <input
                type="radio"
                value="male"
                {...register("gender", {
                  required: "",
                })}
                className="hidden"
              />
              <span>Male</span>
              {gender === "male" && (
                <span>
                  <FaCheck className="ms-2" size={15} />
                </span>
              )}
            </label>
          </div>

          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 gap-2 items-start">
          {/* Gender Selection */}
          <div className="my-4 sm:m-0">
            <p className="font-medium text-md text-gray-700 mb-2">What is your gender?*</p>
            <div className="flex gap-4">
              <label
                className={`flex items-center justify-between w-full px-6 py-3 rounded-md cursor-pointer transition-all duration-300 ${gender === "male"
                  ? "border-2 border-green-500 bg-green-50 text-green-600 shadow-md"
                  : "rounded-lg shadow-md cursor-pointer bg-white"
                  }`}
              >
                <input type="radio" value="male" {...register("gender", { required: "Gender is required" })} className="hidden" />
                <span>Male</span>
                <FaCheck className={`ml-2 transition-opacity duration-300 ${gender === "male" ? "opacity-100" : "opacity-0"}`} />
              </label>

              <label
                className={`flex items-center justify-between w-full px-6 py-3 rounded-md cursor-pointer transition-all duration-300 ${gender === "female"
                  ? "border-2 border-green-500 bg-green-50 text-green-600 shadow-md"
                  : "rounded-lg shadow-md cursor-pointer bg-white"
                  }`}
              >
                <input type="radio" value="female" {...register("gender", { required: "Gender is required" })} className="hidden" />
                <span>Female</span>
                <FaCheck className={`ml-2 transition-opacity duration-300 ${gender === "female" ? "opacity-100" : "opacity-0"}`} />
              </label>
            </div>
            {errors.gender && <p className="text-red-500 text-sm mt-2">{errors.gender.message}</p>}
          </div>
          {/* Conditional Breastfeeding Question */}

          {/* Date of Birth */}
          <div className="block sm:hidden">
            {gender === "female" && (
              <div className="mb-0 sm:mb-0">
                <p className="font-medium text-md text-gray-700 sm:mb-2">Are you breastfeeding or trying to get pregnant?*</p>
                <div className="flex gap-4">
                  <label
                    className={`reg-font text-[#3E3E3E] px-10 py-2 border rounded-md cursor-pointer ${breastFeeding === "Yes"
                      ? "flex items-center border-[#4DB581] cursor-pointer text-[#4DB581] rounded bg-green-50 border-[2px] shadow-lg"
                      : "bg-white"
                      }`}
                  >
                    <input
                      type="radio"
                      value="Yes"
                      sx={textFieldStyles}
                      {...register("breastFeeding", {
                        required: "This field is required",
                        validate: (value) => {
                          if (value === "Yes") {
                            setWarningMessage(
                              `This treatment is not suitable if you are pregnant, trying to get pregnant or breastfeeding. We recommend you speak to your GP in person.`
                            );
                          } else {
                            setWarningMessage("");
                          }
                        },
                      })}
                      className="hidden"
                    />
                    <span>Yes</span>{" "}
                    {breastFeeding === "Yes" && (
                      <span>
                        <FaCheck className="ms-2" size={15} />
                      </span>
                    )}
                  </label>

                  <label
                    className={`reg-font text-[#3E3E3E] px-10 py-2 border rounded-md cursor-pointer ${breastFeeding === "No"
                      ? "flex items-center border-[#4DB581] cursor-pointer text-[#4DB581] rounded bg-green-50 border-[2px] shadow-lg"
                      : "bg-white"
                      }`}
                  >
                    <input
                      type="radio"
                      value="No"
                      sx={textFieldStyles}
                      {...register("breastFeeding", {
                        required: "This field is required",
                      })}
                      className="hidden"
                    />
                    <span>No</span>

                    {breastFeeding === "No" && (
                      <span>
                        <FaCheck className="ms-2" size={15} />
                      </span>
                    )}
                  </label>
                </div>
                <p className="text-red-500 mt-4 text-sm">{WarningMessage?.length > 0 && WarningMessage}</p>
                {errors.breastFeeding && <p className="text-red-500 mt-2 text-sm">{errors.breastFeeding.message}</p>}
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-md text-gray-700 mb-2">What is your date of birth?*</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="dateOfBirth"
                control={control}
                rules={{ required: "Date of birth is required" }}
                render={({ field }) => (
                  <DatePicker
                    label=" "
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => {
                      handleDateChange(date);
                      field.onChange(date);
                    }}
                    maxDate={today}
                    sx={{ textFieldStyles, marginTop: "0px" }}
                    slotProps={{
                      textField: {
                        variant: "outlined",
                        fullWidth: true,
                        error: !!dobError || !!errors.dateOfBirth,
                        helperText: dobError || errors.dateOfBirth?.message,
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="hidden sm:block">
          {gender === "female" && (
            <div className="mb-2">
              <p className="font-medium text-md text-gray-700 sm:mb-2">Are you breastfeeding or trying to get pregnant?*</p>
              <div className="flex gap-4">
                <label
                  className={`reg-font text-[#3E3E3E] px-10 py-2 border rounded-md cursor-pointer ${breastFeeding === "Yes"
                    ? "flex items-center border-[#4DB581] cursor-pointer text-[#4DB581] rounded bg-green-50 border-[2px] shadow-lg"
                    : "bg-white"
                    }`}
                >
                  <input
                    type="radio"
                    value="Yes"
                    {...register("breastFeeding", {
                      required: "This field is required",

                      validate: (value) => {
                        if (value === "Yes") {
                          setWarningMessage(
                            `This treatment is not suitable if you are pregnant, trying to get pregnant or breastfeeding. We recommend you speak to your GP in person.`
                          );
                        } else {
                          setWarningMessage("");
                        }
                      },
                    })}
                    className="hidden"
                  />
                  <span>Yes</span>{" "}
                  {breastFeeding === "Yes" && (
                    <span>
                      <FaCheck className="ms-2" size={15} />
                    </span>
                  )}
                </label>

                <label
                  className={`reg-font text-[#3E3E3E] px-10 py-2 border rounded-md cursor-pointer ${breastFeeding === "No"
                    ? "flex items-center border-[#4DB581] cursor-pointer text-[#4DB581] rounded bg-green-50 border-[2px] shadow-lg"
                    : "bg-white"
                    }`}
                >
                  <input
                    type="radio"
                    value="No"
                    {...register("breastFeeding", {
                      required: "This field is required",
                    })}
                    className="hidden"
                  />
                  <span>No</span>

                  {breastFeeding === "No" && (
                    <span>
                      <FaCheck className="ms-2" size={15} />
                    </span>
                  )}
                </label>
              </div>
              <p className="text-red-500 mt-4 text-sm">{WarningMessage?.length > 0 && WarningMessage}</p>
              {errors.breastFeeding && <p className="text-red-500 mt-2 text-sm">{errors.breastFeeding.message}</p>}
            </div>
          )}
        </div>

        {/* Date of Birth */}
        {/* <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="dateOfBirth"
              control={control}
              rules={{ required: "Date of birth is required" }}
              render={({ field }) => (
                <DatePicker
                  label="What is your date of birth?"
                  value={field.value ? dayjs(field.value) : null} // Convert ISO string to dayjs object
                  onChange={(date) => handleDateChange(date)}
                  maxDate={today}
                  slotProps={{
                    textField: {
                      variant: "standard",
                      fullWidth: true,
                      error: !!dobError || !!errors.dateOfBirth,
                      helperText: dobError || errors.dateOfBirth?.message,
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </div> */}

        <div className=" mt-3">
          <h6 className="font-bold text-xl text-black">Residential Address </h6>
          <p class="text-sm italic text-green-600  pt-1 pb-4">(Require for age verification purpose)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-4 gap-0">
          <Controller
            name="postCode"
            control={control}
            rules={{ required: "Postal Code is required" }}
            render={({ field }) => (
              <TextField
                label="Postal Code"
                variant="standard"
                fullWidth
                value={field.value || watch("postCode") || ""}
                onChange={(e) => {
                  field.onChange(e); // important: inform react-hook-form
                  setZipCode(e.target.value); // your custom logic
                  setSearchClicked(false);
                  // handleSelect is for auto-select. Do not call it unless needed.
                }}
                error={!!errors.postCode || error}
                helperText={errors.postCode?.message}
                InputProps={{
                  endAdornment: (
                    <>
                      {zipCode && (
                        <div className="relative -top-2">
                          <button
                            type="button"
                            onClick={handleSearch}
                            disabled={btnZipCode}
                            className="flex items-center justify-center px-3 py-1 bg-blue-500 text-white font-semibold text-xs rounded-md hover:bg-blue-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out"
                          >
                            <span className="mr-2 text-sm">{isLoading ? "SEARCH..." : "SEARCH"}</span>
                            <FaSearch className={`text-white ${isLoading ? "animate-spin" : ""}`} />
                          </button>
                        </div>
                      )}
                    </>
                  ),
                }}
              />
            )}
          />


          <div className="mt-3 sm:mt-0">
            {!error && searchClicked && addressOptions.length > 0 && (
              <div className="">
                <FormControl fullWidth variant="standard" error={!!errors.addressSelect} sx={selectStyles}>
                  <InputLabel>Select Autofill</InputLabel>
                  <Select
                    {...register("addressSelect", {
                      required: "Please select an address",
                    })}
                    onChange={(e) => handleSelect(e.target.value, setValue)}
                    defaultValue=""
                  >
                    {addressOptions.map((address, index) => (
                      <MenuItem key={index} value={index}>
                        {`${address.line_1}, ${address.town_or_city}`}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.addressSelect && (
                    <FormHelperText>{errors.addressSelect.message}</FormHelperText> // Display error message
                  )}
                </FormControl>
              </div>
            )}
          </div>
        </div>

        {/* Address Dropdown - Show only after clicking Search */}

        {/* Address Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TextField
            label="Address Line 1"
            variant="standard"
            value={watch("streetAddress") || ""}
            fullWidth
            sx={textFieldStyles}
            {...register("streetAddress", {
              required: "Address Line 1 is required",
            })}
            error={!!errors.streetAddress}
            helperText={errors.streetAddress?.message}
          />
          <TextField
            label="Address Line 2"
            variant="standard"
            fullWidth
            sx={textFieldStyles}
            value={watch("streetAddress2") || ""}
            {...register("streetAddress2")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TextField
            label="City"
            value={watch("city") || ""}
            variant="standard"
            fullWidth
            sx={textFieldStyles}
            {...register("city", { required: "City is required" })}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
          <TextField
            value={watch("state") || ""}
            label="State / Province / Region"
            variant="standard"
            fullWidth
            sx={textFieldStyles}
            {...register("state")}
          />
        </div>

        {/* Ethnicity Selection */}

        <div>
          <h6 className="font-bold text-xl text-black my-6">Confirm Ethnicity for BMI</h6>
          <p className="font-med text-md text-gray pb-3 font-bold">
            People of certain ethnicities may be suitable for treatment at a lower BMI than others, if appropriate. Does one of the following options
            describe your ethnic group or background?
          </p>
          <ul className="list-disc ms-5 my-5">
            <li className="my-1 font-reg text-gray-800">South Asian</li>
            <li className="my-1 font-reg text-gray-800">Chinese</li>
            <li className="my-1 font-reg text-gray-800">Other Asian</li>
            <li className="my-1 font-reg text-gray-800"> Middle Eastern</li>
            <li className="my-1 font-reg text-gray-800">Black African</li>
            <li className="my-1 font-reg text-gray-800">African-Caribbean</li>
          </ul>

          <div className="sm:w-3/3">
            {[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "prefer not to say", label: "Prefer not to say" },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex justify-center items-center mt-2 px-6 py-2 border-2 rounded-lg cursor-pointer transition-all duration-300 min-w-[150px] ${selectedEthnicity === option.value ? "bg-[#6d28d9] text-white" : "bg-[#e5e7eb] text-gray-700"
                  }`}
              >
                <input
                  type="radio"
                  value={option.value}
                  {...register("ethnicity", {
                    required: "Ethnicity is required",
                  })}
                  className="hidden "
                />
                <span>{option.label}</span>
                {/* {selectedEthnicity === option.value && <FaCheck className="text-green-500 ml-auto" />} */}
              </label>
            ))}
          </div>

          {errors.ethnicity && <p className="text-red-500 mt-1">{errors.ethnicity.message}</p>}
        </div>

        {/* <div className="flex justify-end">
          <div className="mt-4 sm:max-w-40">
            <div className="text-center my-3">
              <button
                type="submit"
                disabled={!isValid || !watch("ethnicity") || loader || error} // Check if ethnicity is filled
                className={`rounded-md px-4 py-2 shadow-md text-white ${isValid && watch("ethnicity") && !loader
                  ? "bg-violet-700 hover:bg-[#3a54a0] cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                {loader ? "Loading..." : "Next"}
              </button>
            </div>
          </div>
        </div> */}

        <div className="hidden justify-start sm:flex">
          <div className="mt-2 sm:max-w-40">
            <div className="text-center">
              <NextButton
                disabled={!isValid || loader || error || !selectedEthnicity || WarningMessage || !!dobError}
                label={"Next"}
                loading={loader}
              />
            </div>
          </div>
        </div>

        <div className="fixed bottom-2 w-[95%] mx-auto left-0 right-0 z-50 block sm:hidden">
          <div className="relative flex justify-between items-center bg-white/30 backdrop-blur-lg rounded-lg py-3 px-6 shadow-lg border border-white/40">
            <div className="relative flex w-full justify-end items-center">
              <button
                type="submit"
                disabled={!isValid || loader || error || !selectedEthnicity || WarningMessage || !!dobError}
                className={`p-3 flex flex-col items-center justify-center ${!isValid || loader || error || !selectedEthnicity || WarningMessage || !!dobError
                  ? "disabled:opacity-50 disabled:hover:bg-violet-700 disabled:cursor-not-allowed bg-violet-700 text-white rounded-md"
                  : "text-white rounded-md bg-violet-700"
                  }`}
              >
                {loader ? (
                  // Loading Spinner with Label
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span></span>
                  </div>
                ) : (
                  <span className="text-md font-semibold px-6">Next</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Stepone;
