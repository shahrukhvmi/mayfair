import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Select, MenuItem, InputLabel, FormControl, Checkbox, FormControlLabel, Box, Typography, IconButton } from "@mui/material";
import "../../../src/fonts.css";
import { FaSearch, FaEdit, FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { nextStep, prevStep, triggerStep } from "../../store/slice/stepper";
import { useNavigate } from "react-router-dom";
import { useFetchAddressesForBillingQuery, useFetchAddressesQuery } from "../../store/services/addressApi/addressApi";
import { usePostStepsMutation } from "../../store/services/Steps/Steps";
import { setStep6 } from "../../store/slice/stepSlice";
import toast from "react-hot-toast";
import { useProfileUserDataQuery } from "../../store/services/Dashboard/dashboardApi";

import PrevButton from "../PrevBtn/PrevButton";
import NextButton from "../NextBtn/NextButton";
import { gsap } from "gsap";
import PaymentPage from "../PaymentSection/PaymentPage";
import { HiOutlinePencilAlt } from "react-icons/hi";
const Stepeight = ({ setHideSidebar }) => {
  setHideSidebar(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can change to "auto" for instant scrolling
    });
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      streetAddress: "",
      streetAddress2: "",
      city: "",
      state: "",
      postCode: "",
      country: "",
      billingFirstName: "",
      billingLastName: "",
      billingStreetAddress: "",
      billingStreetAddress2: "",
      billingCity: "",
      billingState: "",
      billingPostalCode: "",
      billingCountry: "",
    },
  });
  // const [billing, setBilling] = useState(null);
  // const [shipping, setShipping] = useState(null);
  // const [userInfo, setUserInfo] = useState(null);
  const [email, setEmail] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [countryShippingPrice, setCountryShippingPrice] = useState(null);
  const [coutryPrice, setCountryPrice] = useState(null);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const user = JSON.parse(localStorage.getItem("user"));
    setEmail(user?.email);
    setUserProfile(user);
    console.log(user, "sdssd");
    if (!cart || cart.length === 0) {
      localStorage.setItem("currentStep", 7);
      localStorage.removeItem("addonCart");
      dispatch(triggerStep(7));
    }
  }, [dispatch]);

  const handleCountryChange = (selectedCountry) => {
    setValue("country", selectedCountry.name);

    setCountryShippingPrice(selectedCountry.price);
  };

  const [shipping, setShippingApi] = useState("");
  const [billing, setBillingApi] = useState("");
  const [userInfo, setUserApi] = useState("");

  // const fetchUserData = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://app.mayfairweightlossclinic.co.uk/api/profile/GetUserData",
  //       // "=http://192.168.1.64:8000/api/profile/GetUserData",
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     const data = await response.json();
  //     if (response.ok) {
  //       const user = data;
  //       const userLocalGet = localStorage.getItem("user");
  //       // Update state
  //       setShippingApi(user?.profile?.shipping);
  //       setBillingApi(user?.profile?.billing);
  //       setUserApi(user?.profile?.user || userLocalGet?.emai);
  //     } else {
  //       console.log(data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserData();
  // }, []);

   // RTk Query Fetch user /GetUserData 🔥🔥
   const { data:getData } = useProfileUserDataQuery();
   useEffect(() => {
     if (getData) {
       const user = getData;
       const userLocalGet = localStorage.getItem("user");
       // Update state
       setShippingApi(user?.profile?.shipping);
       setBillingApi(user?.profile?.billing);
       setUserApi(user?.profile?.user || userLocalGet?.emai);
     }
   }, [getData]);
  // set prefilled data here 😊😊✔✔
  useEffect(() => {
    if (billing || shipping || userInfo) {
      // Shipping-related fields
      setValue("firstName", shipping?.first_name || "");
      setValue("lastName", shipping?.last_name || "");
      setValue("streetAddress", shipping?.addressone || "");
      setValue("streetAddress2", shipping?.addresstwo || "");
      setValue("city", shipping?.city || "");
      setValue("state", shipping?.state || "");
      setValue("postCode", shipping?.postalcode || "");
      setZipCode(shipping?.postalcode || "");
      setValue("country", shipping?.country || "");

      const matchingCountry = ShipmentCountry?.find((country) => country.name === shipping?.country);

      if (matchingCountry) {
        setCountryPrice(Number(matchingCountry.price) || 0);
      }

      setValue("billingFirstName", userInfo?.fname || "");
      setValue("billingLastName", userInfo?.lname || "");
      setValue("billingStreetAddress", billing?.addressone || "");
      setValue("billingStreetAddress2", billing?.addresstwo || "");
      setValue("billingCity", billing?.city || "");
      setValue("billingState", billing?.state || "");
      setValue("billingPostalCode", billing?.postalcode || "");
      setValue("billingCountry", billing?.country || "");
      setZipCodeBill(billing?.postalcode || "");
      trigger();
    }
  }, [setValue, userInfo, billing, shipping, trigger, coutryPrice]);

  const [addons, setAddon] = useState([]);
  const [doses, setDose] = useState([]);
  const [doseMessage, setDoseMessage] = useState([]);
  const [ShipmentCountry, setShipmentCountry] = useState([]);
  const [billingAddres, setBillingAddres] = useState({ country: "" });
  const [BillingCountrys, setBillingCountrys] = useState([]);

  // State to track true/false status
  const [selectedStates, setSelectedStates] = useState([]);
  const [termCondition, setTermCondition] = useState("");
  const [patientInfo, setPatientInfo] = useState(null);
  const [medicalInfo, setMedicalInfoData] = useState(null);
  const [gpDetails, setGpdetails] = useState(null);
  const [getBmi, setBmi] = useState(null);
  const [confirmationInfo, setconfirmationInfo] = useState(null);

  const [user, setUser] = useState([]);

  const updatedAddons = addons.map(({ qty, ...rest }) => ({
    ...rest,
    quantity: qty,
  }));

  const updatedDoses = doses.map(({ qty, id, ...rest }) => {
    const matchingMessage = doseMessage?.find((item) => item.id === id);

    return {
      ...rest,
      id,
      quantity: qty,
      product_concent: matchingMessage?.message || null,
    };
  });

  const isValidObj = (obj) => obj && typeof obj === "object" && Object.keys(obj).length > 0;

  useEffect(() => {
    const storedDoses = JSON.parse(localStorage.getItem("cart"));
    const storedAddons = JSON.parse(localStorage.getItem("addonCart"));
    const storedDoseMessage = JSON.parse(localStorage.getItem("selectedMessages"));
    const storedPrev = JSON.parse(localStorage.getItem("stepPrevApiData")) || {};

    const step1 = JSON.parse(localStorage.getItem("step1") || "null");
    const step2 = JSON.parse(localStorage.getItem("step2") || "null");
    const step3 = JSON.parse(localStorage.getItem("step3") || "null");
    const step4 = JSON.parse(localStorage.getItem("step4") || "null");
    const step5 = JSON.parse(localStorage.getItem("step5") || "null");

    // Set addon
    if (storedAddons) setAddon(storedAddons);

    const fallbackFields = storedPrev?.last_consultation_data || {};
    console.log(step1, fallbackFields, "sdjsdhusd");
    const patientData = fallbackFields?.patientInfo || {};
    const bmiData = fallbackFields?.bmi || {};
    const medicalInfoData = fallbackFields?.medicalInfo || {};
    const confirmationInfoData = fallbackFields?.confirmationInfo || {};
    const gpdetailsData = fallbackFields?.gpdetails || {};

    // Step data with fallback
    setPatientInfo(isValidObj(step1) ? step1 : patientData);
    setBmi(isValidObj(step2) ? step2 : bmiData);
    setMedicalInfoData(isValidObj(step3) ? step3 : medicalInfoData);
    setconfirmationInfo(isValidObj(step4) ? step4 : confirmationInfoData);
    setGpdetails(isValidObj(step5) ? step5 : gpdetailsData);

    // Dose info
    if (storedDoses) setDose(storedDoses);
    if (storedDoseMessage) setDoseMessage(storedDoseMessage);

    // Shipment and countries
    if (storedPrev) {
      setShipmentCountry(storedPrev?.selected_product?.shippments || []);

      const countries = storedPrev?.billing_countries || [];
      const termConditions = storedPrev?.selected_product?.terms_and_conditon || [];
      setBillingCountrys(countries);
      setTermCondition(termConditions);

      const initialStates = countries.map((_, index) => index < 3);
      setSelectedStates(initialStates);
    }
  }, []);

  const handleSelectChange = (value, index) => {
    setBillingAddres({ ...billingAddres, country: value }); // Update selected country
    const isValidState = index < 3; // Check if the selected index is within the first three

    setSelectedStates(isValidState); // Set the boolean for valid/invalid state

    // If the selected state is invalid (index >= 3), clear the form fields
    if (!isValidState) {
      setValue("billingStreetAddress", "");
      setValue("billingStreetAddress2", "");
      setValue("billingCity", "");
      setValue("billingState", "");
      setValue("billingPostalCode", "");
    }
  };

  const [zipCode, setZipCode] = useState("");
  const [zipCodeBill, setZipCodeBill] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressOptions, setAddressOptions] = useState([]);
  const [addressOptionsBilling, setAddressOptionsBilling] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchClickedBill, setSearchClickedBill] = useState(false);

  // Billing state
  const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(false);

  useEffect(() => {
    if (isBillingSameAsShipping) {
      const shippingFields = {
        billingFirstName: watch("firstName"),
        billingLastName: watch("lastName"),
        billingStreetAddress: watch("streetAddress"),
        billingStreetAddress2: watch("streetAddress2"),
        billingCity: watch("city"),
        billingState: watch("state"),
        billingPostalCode: watch("postCode"),
        billingCountry: watch("country"),
      };

      Object.entries(shippingFields).forEach(([field, value]) => {
        setValue(field, value, { shouldValidate: true });
      });
    }
  }, [
    isBillingSameAsShipping,
    watch("firstName"),
    watch("lastName"),
    watch("streetAddress"),
    watch("streetAddress2"),
    watch("city"),
    watch("state"),
    watch("postCode"),
    watch("country"),
  ]);

  const handleBillingCheckbox = (e) => {
    const checked = e.target.checked;
    setIsBillingSameAsShipping(checked);

    if (!checked) {
      // Reset billing fields when unchecked
      setValue("billingFirstName", "", { shouldValidate: true });
      setValue("billingLastName", "", { shouldValidate: true });
      setValue("billingStreetAddress", "", { shouldValidate: true });
      setValue("billingStreetAddress2", "", { shouldValidate: true });
      setValue("billingCity", "", { shouldValidate: true });
      setValue("billingState", "", { shouldValidate: true });
      setValue("billingPostalCode", "", { shouldValidate: true });
      setValue("billingCountry", "", { shouldValidate: true });
    }
  };

  // 👇👇**RTK Query - Fetch addresses**👇👇
  const { data, error, isLoading } = useFetchAddressesQuery(zipCode, {
    skip: !searchClicked || !zipCode,
  });
  const {
    data: dataBill,
    error: errorBill,
    isLoading: load,
  } = useFetchAddressesForBillingQuery(zipCodeBill, {
    skip: !searchClickedBill || !zipCodeBill,
  });

  // Handle edit button click
  const handleEdit = (itemId) => {
    dispatch(prevStep()); // Navigate to the previous step
  };

  const selectedCountry = watch("country");

  // shipping
  const handleSearch = () => {
    if (zipCode.trim() !== "") {
      setSearchClicked(true);
    } else {
      toast.error(error?.message);
    }
  };
  // billing
  const handleSearchBilling = () => {
    if (zipCodeBill.trim() !== "") {
      setSearchClickedBill(true);
    } else {
      toast.error(errorBill?.message);
    }
  };

  // Shiping
  const handleSelect = (index, setValue) => {
    const selected = addressOptions[index];
    setSelectedAddress(selected);
    setValue("streetAddress", selected.line_1 || "");
    setValue("streetAddress2", selected.line_2 || "");
    setValue("city", selected.town_or_city || "");
    setValue("state", selected.county || "");
    setValue("postalCode", zipCode || "");
  };

  // billing
  const handleSelectBilling = (index, setValue) => {
    const selected = addressOptionsBilling[index];
    setSelectedAddress(selected);
    setValue("billingStreetAddress", selected.line_1 || "");
    setValue("billingStreetAddress2", selected.line_2 || "");
    setValue("billingCity", selected.town_or_city || "");
    setValue("billingState", selected.county || "");
    setValue("billingPostalCode", zipCodeBill || "");
  };

  // billing
  useEffect(() => {
    if (data?.addresses) {
      setAddressOptions(data.addresses);
    } else {
      setAddressOptions([]);
    }
  }, [data]);
  // billing
  useEffect(() => {
    if (dataBill?.addresses) {
      setAddressOptionsBilling(dataBill.addresses);
    } else {
      setAddressOptionsBilling([]);
    }
  }, [dataBill]);

  // **Coupon Apply✌✌**

  const [discountCode, setDiscountCode] = useState(localStorage.getItem("discountCode") || "");
  const [isCouponApplied, setIsCouponApplied] = useState(!!localStorage.getItem("isCouponApplied"));
  const [discountAmount, setDiscountAmount] = useState(parseFloat(localStorage.getItem("discountAmount") || 0));
  const [discountType, setDiscountType] = useState(localStorage.getItem("discountType") || "");
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [finalDicount, setFinalDiscount] = useState(0);
  useEffect(() => {
    // Calculate the subtotal
    const addonsTotal = addons.reduce((sum, addon) => sum + addon.price * addon.qty, 0);
    const dosesTotal = doses.reduce((sum, dose) => sum + dose.price * dose.qty, 0);
    const calculatedSubtotal = addonsTotal + dosesTotal;
    const shippingPrice = parseFloat(countryShippingPrice || coutryPrice);
    const discountValue = calculateDiscountValue(calculatedSubtotal);

    const calculatedTotal = shippingPrice || discountValue ? calculatedSubtotal - (discountValue || 0) + (shippingPrice || 0) : calculatedSubtotal;

    setSubtotal(calculatedSubtotal);
    setTotal(calculatedTotal);
    setFinalDiscount(discountValue);
  }, [coutryPrice, addons, doses, countryShippingPrice, discountAmount, discountType, isCouponApplied]);

  const calculateDiscountValue = (calculatedSubtotal) => {
    if (discountType === "Percent") {
      return (calculatedSubtotal * discountAmount) / 100;
    } else if (discountType === "Fixed") {
      return discountAmount;
    }
    return 0;
  };

  useEffect(() => {
    if (isCouponApplied) {
      gsap.fromTo(".success-message", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
    }
  }, [isCouponApplied]);

  useEffect(() => {
    if (error) {
      gsap.fromTo(".error-message", { x: -10 }, { x: 10, duration: 0.1, yoyo: true, repeat: 5, ease: "power2.inOut" });
    }
  }, [error]);

  const handleApplyCoupon = async () => {
    if (!discountCode.trim()) {
      toast.error("Please enter a valid coupon code.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://app.mayfairweightlossclinic.co.uk/api/getCoupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ coupon_code: discountCode.trim() }),
      });

      const data = await response.json();
      const couponType = data?.Data?.type;
      const couponDiscount = parseFloat(data?.Data?.discount) || 0;

      if (!response.ok) {
        const errorMessage = data?.errors?.coupon_code || data?.errors?.Coupon;
        toast.error(errorMessage);
        setIsCouponApplied(false);
        setError(errorMessage);
        return;
      }

      // Update state and localStorage
      setDiscountType(couponType);
      setDiscountAmount(couponDiscount);
      setIsCouponApplied(true);
      localStorage.setItem("discountCode", discountCode.trim());
      localStorage.setItem("isCouponApplied", true);
      localStorage.setItem("discountType", couponType);
      localStorage.setItem("discountAmount", couponDiscount);

      toast.success("Coupon applied successfully!");
    } catch (error) {
      setIsCouponApplied(false);
    }
  };

  const handleRemoveCoupon = () => {
    setDiscountCode("");
    setIsCouponApplied(false);
    setDiscountAmount(0);
    setDiscountType("");

    // Clear localStorage
    localStorage.removeItem("discountCode");
    localStorage.removeItem("isCouponApplied");
    localStorage.removeItem("discountType");
    localStorage.removeItem("discountAmount");
  };

  const getDiscountDisplay = () => {
    if (discountType === "Percent") {
      return `${discountAmount}% off`;
    } else if (discountType === "Fixed") {
      return `-£${discountAmount.toFixed(2)}`;
    }
    return "";
  };

  const [postSteps, { isLoading: loader }] = usePostStepsMutation();
  const [paymentData, setPaymentData] = useState(null);
  const reorder_concent = localStorage.getItem("reorder_concent") || null;

  const getPid = localStorage.getItem("pid");
  const onSubmit = async (data) => {
    const checkout = {
      firstName: data?.firstName || patientInfo?.firstName || userProfile?.fname,
      lastName: data?.lastName || patientInfo?.lastName || userProfile?.lname,
      email: userInfo?.email || email,
      phoneNo: patientInfo?.phoneNo || userProfile?.phone,
      shipping: {
        postalcode: data?.postCode,
        addressone: data?.streetAddress,
        addresstwo: data?.streetAddress2,
        city: data?.city,
        state: data?.state,
        country: data?.country,
      },
      terms: true,
      sameAddress: isBillingSameAsShipping,
      billing: {
        postalcode: data?.billingPostalCode,
        addressone: data?.billingStreetAddress,
        addresstwo: data?.billingStreetAddress2,
        city: data?.billingCity,
        state: data?.billingState,
        country: data?.billingCountry || billingAddres?.country?.name,
      },
      discount: {
        code: discountCode,
        discount: discountAmount,
        type: discountType,
        discount_value: finalDicount,
      },
      subTotal: parseFloat(subtotal),
      total: parseFloat(total),
      shipment: {
        id: null,
        name: data.country || shipping?.country,
        price: parseFloat(countryShippingPrice || coutryPrice),
        status: 1,
        taggable_type: "App\\Models\\Product",
        taggable_id: getPid,
      },
    };

    try {
      const response = await postSteps({
        checkout: checkout,
        patientInfo: patientInfo || user,
        items: updatedDoses,
        addons: updatedAddons,
        pid: getPid,
        medicalInfo: medicalInfo,
        gpdetails: gpDetails,
        bmi: getBmi,
        confirmationInfo: confirmationInfo,
        reorder_concent: reorder_concent ? reorder_concent.toString() : null,
        product_id:getPid

        // successurl: "https://weightlosspharmacy.vercel.app/thank-you",
        // failedurl: "https://weightlosspharmacy.vercel.app/payment-failed"
        // successurl: "http://localhost:5173/thank-you",
        // failedurl: "http://localhost:5173/payment-failed"
      }).unwrap();

      if (response?.status === true) {
        dispatch(setStep6(response?.lastConsultation?.fields.checkout));
        // localStorage.removeItem("step2");
        // localStorage.removeItem("cart");
        // localStorage.removeItem("addonCart");
        // localStorage.removeItem("progress");
        // localStorage.removeItem("currentStep");
        // localStorage.removeItem("discountCode");
        // localStorage.removeItem("isCouponApplied");
        // localStorage.removeItem("discountType");
        // localStorage.removeItem("discountAmount");
        // <PaymentPage paymentData={response?.paymentData} />
        setPaymentData(response?.paymentData);
        console.log(response?.paymentData, "response?.paymentData");
        // navigate("/thank-you");
        localStorage.removeItem("previous_id");

        // window.location.href = response?.payment_Link;

        // dispatch(nextStep());
      } else {
        toast.error("Invalid login response");
      }
    } catch (err) {
      if (errors && typeof errors === "object") {
        Object.keys(errors).forEach((key) => {
          const errorMessage = errors[key];
          Array.isArray(errorMessage) ? errorMessage.forEach((msg) => toast.error(msg)) : toast.error(errorMessage);
        });
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      {paymentData ? (
        <PaymentPage paymentData={paymentData} />
      ) : (
        <>
          <section className="">
            <div className="bg-white rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-screen-2xl mx-auto">
                <div className="grid grid-cols-12 gap-4">
                  {/* Left Side: Main Form */}

                  <div className="col-span-12 sm:col-span-8  py-5">
                    <Box className="lg:col-span-2">
                      {/* Heading */}
                      <h1 className="font-bold text-3xl md:text-4xl sm:mb-8 my-4 flex sm:justify-start justify-center">Checkout</h1>

                      {/* Shipping Information */}
                      <Box className="bg-[#F9FAFB] rounded-lg border mb-8">
                        <div class="bg-gray-100 flex py-2 px-5 items-center gap-2">
                          <div class="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs">01</div>
                          <h2 class="text-left font-medium text-gray-900 py-3">Shipping Address</h2>
                        </div>

                        <div className="p-6">
                          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                            <TextField
                              label="First Name"
                              variant="standard"
                              value={watch("firstName") || ""}
                              fullWidth
                              {...register("firstName", {
                                required: "First Name is required",
                              })}
                              error={!!errors.firstName}
                              helperText={errors.firstName?.message}
                            />
                            <TextField
                              label="Last Name"
                              variant="standard"
                              value={watch("lastName") || ""}
                              fullWidth
                              {...register("lastName", {
                                required: "Last Name is required",
                              })}
                              error={!!errors.lastName}
                              helperText={errors.lastName?.message}
                            />
                          </Box>
                          <Box className="flex sm:grid sm:grid-flow-row my-4">
                            <FormControl variant="standard" fullWidth error={!!errors.country}>
                              <InputLabel>Country</InputLabel>
                              <Select
                                {...register("country", {
                                  required: "Country is required",
                                })}
                                value={watch("country")} // Bind the current country value
                                onChange={(e) => {
                                  const selectedCountry = ShipmentCountry.find((country) => country.name === e.target.value);
                                  handleCountryChange(selectedCountry);
                                }}
                              >
                                {ShipmentCountry?.map((country, index) => (
                                  <MenuItem key={index} value={country?.name}>
                                    {country?.name}
                                  </MenuItem>
                                ))}
                              </Select>

                              {/* Display error message */}
                              {errors.country && (
                                <Typography variant="body2" color="error" className="mt-1">
                                  {errors.country.message}
                                </Typography>
                              )}
                            </FormControl>
                          </Box>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextField
                              label="Postal Code"
                              // value={watch("postCode") || zipCode}
                              value={zipCode}
                              variant="standard"
                              fullWidth
                              {...register("postCode", {
                                required: "Postal Code is required",
                              })}
                              error={!!errors.postCode || !!error}
                              helperText={errors.postCode?.message || error?.message}
                              // value={zipCode}
                              onChange={(e) => {
                                setZipCode(e.target.value);
                                setSearchClicked(false);
                              }}
                              InputProps={{
                                endAdornment: (
                                  <>
                                    {zipCode && (
                                      <div className="relative -top-2">
                                        <button
                                          type="button"
                                          onClick={handleSearch}
                                          disabled={!zipCode.trim() || isLoading || error}
                                          className="flex items-center justify-center px-3 py-1 bg-violet-700 text-white font-semibold text-xs rounded-md hover:bg-violet-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out"
                                        >
                                          {/* Search Text */}
                                          <FaSearch className={`text-white ${isLoading ? "animate-spin" : ""}`} />
                                          <span className="mx-2 text-sm "> {isLoading ? "SEARCH..." : "SEARCH"} </span>
                                        </button>
                                      </div>
                                    )}
                                  </>
                                ),
                              }}
                            />

                            <div className="">
                              {!error && searchClicked && addressOptions.length > 0 && (
                                <div className="">
                                  <FormControl fullWidth variant="standard" error={!!errors.addressSelect}>
                                    <InputLabel>Select Autofill</InputLabel>
                                    <Select
                                      {...register("addressSelect", {
                                        required: "Please select an address",
                                      })} // Validation for Select
                                      onChange={(e) => handleSelect(e.target.value, setValue)} // Use selected index for `handleSelect`
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

                          {/* Address Fields */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <TextField
                              label="Address Line 1"
                              variant="standard"
                              value={watch("streetAddress") || ""}
                              fullWidth
                              {...register("streetAddress")}
                              error={!!errors.streetAddress}
                              helperText={errors.streetAddress?.message}
                            />
                            <TextField
                              label="Address Line 2"
                              variant="standard"
                              fullWidth
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
                              {...register("city", { required: "City is required" })}
                              error={!!errors.city}
                              helperText={errors.city?.message}
                            />
                            <TextField
                              value={watch("state") || ""}
                              label="State / Province / Region"
                              variant="standard"
                              fullWidth
                              {...register("state")}
                            />
                          </div>

                          <div className="pt-3  sm:mt-4 mt-5">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={isBillingSameAsShipping}
                                  onChange={handleBillingCheckbox}
                                  icon={<span className=" w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center" />}
                                  checkedIcon={
                                    <span className="w-5 h-5 border-2 border-[#6D28D9] bg-[#6D28D9] rounded-full flex items-center justify-center">
                                      <FaCheck size={10} className="text-white text-xs" /> {/* Check Icon */}
                                    </span>
                                  }
                                  sx={{
                                    "& .MuiSvgIcon-root": {
                                      display: "none", // Hide the default Material-UI checkbox icon
                                    },
                                  }}
                                />
                              }
                              label={<p className="font-sans font-reg text-gray-600 text-sm  capitalize ">Make billing address same as shipping</p>}
                            />
                          </div>
                        </div>
                      </Box>

                      {/* Billing Information */}
                      {!isBillingSameAsShipping && (
                        <Box className="bg-[#f9fafb] pb-12 rounded-lg border mb-8">
                          <>
                            <div class="bg-gray-100 flex py-2 px-5 items-center gap-2">
                              <div class="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs">02</div>
                              <h2 class="text-left font-medium text-gray-900 py-3">Billing Information</h2>
                            </div>

                            {!isBillingSameAsShipping && (
                              <div className="p-8">
                                <Box>
                                  {/* <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                                    <TextField
                                      label="First Name"
                                      variant="standard"
                                      fullWidth
                                      value={watch("billingFirstName") || ""}
                                      {...register("billingFirstName", {
                                        required:
                                          !isBillingSameAsShipping &&
                                          "First Name is required",
                                      })}
                                      error={!!errors.billingFirstName}
                                      helperText={errors.billingFirstName?.message}
                                    />
                                    <TextField
                                      label="Last Name"
                                      value={watch("billingLastName") || ""}
                                      variant="standard"
                                      fullWidth
                                      {...register("billingLastName", {
                                        required:
                                          !isBillingSameAsShipping &&
                                          "Last Name is required",
                                      })}
                                      error={!!errors.billingLastName}
                                      helperText={errors.billingLastName?.message}
                                    />
                                  </Box> */}
                                  <Box className="flex sm:grid sm:grid-flow-row mt-6">
                                    <FormControl variant="standard" fullWidth>
                                      <InputLabel>Country Billing</InputLabel>
                                      <Select
                                        value={watch("billingCountry") || ""} // Use the billingCountry value from the form state
                                        onChange={(e) => {
                                          const selectedValue = e.target.value;
                                          setValue("billingCountry", selectedValue); // Update the form state
                                          const selectedIndex = BillingCountrys.findIndex((country) => country.name === selectedValue);
                                          if (selectedIndex !== -1) {
                                            handleSelectChange(BillingCountrys[selectedIndex], selectedIndex);
                                          }
                                        }}
                                      >
                                        {BillingCountrys.map((country, index) => (
                                          <MenuItem key={index} value={country.name}>
                                            {country.name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </Box>

                                  <Box className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 w-full">
                                    {selectedStates ? (
                                      <>
                                        <TextField
                                          label="Postal Code"
                                          value={zipCodeBill}
                                          variant="standard"
                                          fullWidth
                                          disabled={!selectedStates}
                                          {...register("billingPostalCode", {
                                            required: "Postal Code is required",
                                          })}
                                          error={!!errors.billingPostalCode || !!errorBill}
                                          helperText={errors.billingPostalCode?.message || errorBill?.message}
                                          onChange={(e) => {
                                            setZipCodeBill(e.target.value);
                                            setSearchClickedBill(false);
                                          }}
                                          InputProps={{
                                            className: `${!selectedStates ? "cursor-not-allowed" : ""}`,
                                            endAdornment: (
                                              <>
                                                {zipCodeBill && (
                                                  <div className="relative -top-2">
                                                    <button
                                                      type="button"
                                                      onClick={handleSearchBilling}
                                                      disabled={!zipCodeBill.trim() || load || errorBill || !selectedStates}
                                                      className="flex items-center justify-center px-3 py-1 bg-violet-700 text-white font-semibold text-xs rounded-md hover:bg-violet-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out"
                                                    >
                                                      <FaSearch className={`${`text-white ${load ? "animate-spin" : ""}`}`} />
                                                      <span className="mr-2 text-sm">{load ? "SEARCH..." : "SEARCH"}</span>
                                                    </button>
                                                  </div>
                                                )}
                                              </>
                                            ),
                                          }}
                                        />

                                        {searchClickedBill && (
                                          <>
                                            {!error && searchClickedBill && addressOptionsBilling.length > 0 && (
                                              <div className="w-full">
                                                <FormControl
                                                  fullWidth
                                                  className={`${!selectedStates ? "cursor-not-allowed" : ""}`}
                                                  disabled={!selectedStates}
                                                  variant="standard"
                                                  error={!!errors.addressSelect}
                                                >
                                                  <InputLabel>Select Autofill</InputLabel>
                                                  <Select
                                                    {...register("addressSelect", {
                                                      required: "Please select an address",
                                                    })}
                                                    onChange={(e) => handleSelectBilling(e.target.value, setValue)}
                                                    defaultValue=""
                                                  >
                                                    {addressOptionsBilling.map((address, index) => (
                                                      <MenuItem key={index} value={index}>
                                                        {`${address.line_1}, ${address.town_or_city}`}
                                                      </MenuItem>
                                                    ))}
                                                  </Select>
                                                  {errors.addressSelect && <FormHelperText>{errors.addressSelect.message}</FormHelperText>}
                                                </FormControl>
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                          <TextField
                                            label="Postal Code"
                                            value={watch("billingPostalCode") || ""}
                                            variant="standard"
                                            fullWidth
                                            error={!!errorBill || !!errors.billingPostalCode}
                                            helperText={errorBill?.message || errors.billingPostalCode?.message}
                                            {...register("billingPostalCode", {
                                              required: "Postal Code is required",
                                            })}
                                          />
                                        </div>
                                      </>
                                    )}
                                  </Box>

                                  {/* Address Fields */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <TextField
                                      label="Street Address"
                                      variant="standard"
                                      value={watch("billingStreetAddress") || ""}
                                      fullWidth
                                      {...register("billingStreetAddress", {
                                        required: !isBillingSameAsShipping && "Address Line 1 is required",
                                      })}
                                      error={!!errors.billingStreetAddress}
                                      helperText={errors.billingStreetAddress?.message}
                                    />
                                    <TextField
                                      label="Address Line 2"
                                      variant="standard"
                                      fullWidth
                                      value={watch("billingStreetAddress2") || ""}
                                      // {...register("billingStreetAddress2")}
                                      {...register("billingStreetAddress2")}
                                    />
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <TextField
                                      label="City"
                                      variant="standard"
                                      value={watch("billingCity") || ""}
                                      fullWidth
                                      {...register("billingCity", {
                                        required: !isBillingSameAsShipping && "City is required",
                                      })}
                                      error={!!errors.billingCity}
                                      helperText={errors.billingCity?.message}
                                    />
                                    <TextField
                                      label="State / Province / Region"
                                      variant="standard"
                                      fullWidth
                                      value={watch("billingState") || ""}
                                      // {...register("billingState")}
                                      {...register("billingState", {
                                        required: !isBillingSameAsShipping && "State is required",
                                      })}
                                    />
                                  </div>
                                </Box>
                              </div>
                            )}
                          </>
                        </Box>
                      )}

                      {/* Terms & Conditions */}
                      <Box className="bg-white rounded-lg border sm:mb-0">
                        {/* Terms and Conditions */}
                        <Box className="">
                          <div className="bg-[#f3f4f6] flex items-start gap-3 py-3 px-4 rounded-md">
                            <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs shrink-0">
                              {isBillingSameAsShipping ? "02" : "03"}
                            </div>
                            <h2 className="font-medium text-gray-900 text-sm leading-snug">
                              Please review the important information below regarding your treatment
                            </h2>
                          </div>

                          {typeof termCondition === "string" && termCondition.trim() ? (
                            <>
                              <div
                                className="text-gray-600 text-sm leading-relaxed p-4 bg-[#F9FAFB]"
                                dangerouslySetInnerHTML={{
                                  __html: `
          <style>
            ol {
              list-style-type: decimal;
              padding-left: 1.5rem;
              margin-top: 0;
              // margin-bottom: 1rem;
            }
            li {
              line-height: 1.8;
              // margin-bottom: 0.75rem;
            }
            a {
              color: #2563eb;
              font-weight: 500;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
          </style>
          ${termCondition}
        `,
                                }}
                              />
                            </>
                          ) : (
                            <>
                              <div
                                className="text-gray-600 text-sm leading-relaxed space-y-4"
                                dangerouslySetInnerHTML={{
                                  __html: `
          <style>
            ul {
              list-style-type: decimal;
              padding-left: 1.5rem;
              margin-top: 0;
              margin-bottom: 1rem;
            }
            li {
              line-height: 1.8;
              margin-bottom: 0.75rem;
            }
            a {
              color: #2563eb;
              font-weight: 500;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
          </style>
          <ul>
            <li>I have read and agree to the Terms & Conditions.</li>
            <li>I consent to an ID check when placing my order.</li>
            <li>
              I will read the Patient Information Leaflet with my medication before using the medication.
              <br /> Read here: 
              <a href="https://www.medicines.org.uk/emc/files/pil.13801.pdf" target="_blank">Wegovy</a>,
              <a href="https://www.medicines.org.uk/emc/files/pil.9749.pdf" target="_blank">Ozempic</a>, and
              <a href="https://www.medicines.org.uk/emc/files/pil.2313.pdf" target="_blank">Saxenda</a>.
            </li>
            <li>
              I will contact Mayfair Weight Loss Clinic immediately by email (and before the medication is dispensed) if I require the medication to be delivered on a particular day or if I need to cancel or amend the order. Once dispensed, the order cannot be amended or returned.
            </li>
            <li>I am over the age of 18, and all treatments requested through my account are for my use only.</li>
            <li>
              I will read the Patient Information Leaflet provided with my medication before using the medication prescribed through Mayfair Weight Loss Clinic website.
            </li>
            <li>
              I accept to be contacted by the clinical team via phone, email, or my account's messaging service if additional information is required.
            </li>
            <li>
              By registering on the site, you also grant us and pharmacists employed by us access to your NHS Summary Care Records.
            </li>
            <li>
              If you are taking Wegovy for the first time, then you will need to start the treatment on the 0.25mg dose. If you start on the higher doses, the risk of side effects (e.g., nausea) will be very high.
            </li>
            <li>
              I confirm that I am not starting treatment or will be taking Wegovy or Semaglutide for the first time. I have started on the lower dose(s), and this is the escalation or maintenance dose selected.
            </li>
          </ul>
        `,
                                }}
                              />
                            </>
                          )}

                          {/* Checkbox with Agreement */}
                          <div className="space-x-4 text-sm p-3 sm:p-6 bg-gray-50">
                            <FormControlLabel
                              className=""
                              control={
                                <Checkbox
                                  {...register("terms", {
                                    required: "Please agree to the terms and conditions",
                                  })}
                                  icon={<span className=" w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center" />}
                                  checkedIcon={
                                    <span className="w-5 h-5 border-2 border-violet-700 rounded-full flex items-center justify-center">
                                      <span className="w-2.5 h-2.5 bg-violet-700 rounded-full" />
                                    </span>
                                  }
                                  sx={{
                                    "& .MuiSvgIcon-root": {
                                      display: "none", // Hide the default Material-UI checkbox icon
                                    },
                                  }}
                                />
                              }
                              label={
                                <p className="font-sans font-bold text-xs sm:text-base italic">
                                  I agree that I have read, understood and agree to the above
                                </p>
                              }
                            />

                            {errors.terms && (
                              <Typography variant="body2" color="error" className="mt-2 text-red-500">
                                {errors.terms.message}
                              </Typography>
                            )}
                          </div>
                        </Box>
                      </Box>

                      {/* Navigation Buttons */}
                    </Box>

                    <div className="hidden sm:flex justify-normal py-4">
                      <PrevButton label="Back" onClick={() => dispatch(prevStep())} />
                      <NextButton label="Proceed to Payment " disabled={!isValid || loader} loading={loader} />
                    </div>
                  </div>

                  {/* Right Side: Order Summary */}
                  <div className="col-span-12 sm:col-span-4">
                    <div className="mb-24 sm:mb-0">
                      {/* <div className="bg-white p-6 rounded-lg shadow-md sm:fixed mt-10 sm:mt-[100px]"> */}

                      <Box className="bg-gray-100 sm:p-6 p-2 rounded-lg shadow-md mt-6 sm:mt-[110px]">
                        <div className="overflow-y-auto ">
                          <h6 className="text-2xl font-bold mb-6 text-[#1C1C29]">Order Summary</h6>

                          {/* Scrollable Content */}
                          <Box className="space-y-4 overflow-y-auto max-h-[250px] pr-1 pb-4 my-2">
                            {/* Doses */}
                            {doses?.map((item, index) => (
                              <>
                                {/* <Box
                                  key={index}
                                  className="flex items-center p-2 lg:p-3 text-sm lg:text-base font-medium text-gray-900 rounded-lg bg-[#E8E1FC] group shadow dark:bg-red-500 dark:hover:bg-gray-500  w-full overflow-hidden"
                                >
                                  <Box className="flex items-center space-x-2">
                                    <span className="font-medium text-sm">
                                      {item.product} {item.name}
                                    </span>
                                    <span className="font-bold text-md">£{item.price}</span>
                                  </Box>
                                  <Box>
                                    <IconButton
                                      size="small"
                                      color="success"
                                      onClick={() => handleEdit(item.id)} // Ensure this function works
                                    >
                                      <FaEdit />
                                    </IconButton>
                                  </Box>
                                </Box> */}
                                <li class="flex" key={index}>
                                  <div class="flex items-center p-2 lg:p-3 text-sm lg:text-base font-medium text-gray-900 rounded-lg bg-[#E8E1FC] group shadow  w-full overflow-hidden">
                                    <span class="flex-1 whitespace-nowrap text-[13px] overflow-ellipsis overflow-hidden">
                                      {" "}
                                      {item.product} {item.name}
                                    </span>

                                    <span class="text-[13px]">(x{item.qty})</span>
                                    <span class="text-[13px]">£ £{(item.qty * parseFloat(item.price)).toFixed(2)}</span>
                                  </div>
                                  <button
                                    onClick={() => handleEdit(item.id)}
                                    class="inline-flex items-center justify-center px-2 py-0.5 ms-1 text-md text-indigo-600 cursor-pointer  shadow-sm bg-indigo-100 "
                                  >
                                    <HiOutlinePencilAlt />
                                  </button>
                                </li>

                                {item.product === "Mounjaro (Tirzepatide)" && (
                                  // <Box
                                  //   key={`${item.id}-needle`}
                                  //   className="flex justify-between  border border-green-400 rounded-md p-3"
                                  // >
                                  //   <Box className="flex items-center space-x-2">
                                  //     <span className="font-medium text-sm">
                                  //       Pack of 5 Needle, {item.qty}x
                                  //     </span>
                                  //     <span className="font-bold text-md">£0.00</span>
                                  //   </Box>
                                  //   <Box>

                                  //   </Box>
                                  // </Box>

                                  <li class="flex" key={index}>
                                    <div class="flex items-center p-2 lg:p-3 text-sm lg:text-base font-medium text-gray-900 rounded-lg bg-[#E8E1FC] group shadow   w-full overflow-hidden">
                                      <span class="text-[13px]"> Pack of 5 Needle, {item.qty}x</span>
                                      <span class="text-[13px]">£0.00</span>
                                    </div>
                                  </li>
                                )}
                              </>
                            ))}

                            {/* Addons */}
                            {addons?.map((item) => (
                              // <Box
                              //   key={item.id}
                              //   className="flex justify-between  border border-green-400 rounded-md p-3"
                              // >
                              //   <Box className="flex items-center space-x-2">
                              //     <span className="font-medium text-sm">
                              //       {item.product} {item.name}
                              //     </span>
                              //     <span className="font-bold text-md">£{item.price}</span>
                              //   </Box>
                              //   <Box className="flex items-center space-x-2">
                              //     <IconButton
                              //       size="small"
                              //       color="success"
                              //       onClick={() => handleEdit(item.id)} // Ensure this function works
                              //     >
                              //       <FaEdit />
                              //     </IconButton>
                              //   </Box>
                              // </Box>

                              <li class="flex" key={item.id}>
                                <div class="flex items-center p-2 lg:p-3 text-sm lg:text-base font-medium text-gray-900 rounded-lg bg-[#E8E1FC] group shadow   w-full overflow-hidden">
                                  <span class="flex-1 whitespace-nowrap text-[13px] overflow-ellipsis overflow-hidden"> {item.name}</span>

                                  <span class="text-[13px]">(x{item.qty})</span>
                                  <span class="text-[13px]">£{(item.qty * parseFloat(item.price)).toFixed(2)}</span>
                                </div>
                                <button
                                  onClick={() => handleEdit(item.id)}
                                  class="inline-flex items-center justify-center px-2 py-0.5 ms-1 text-md text-indigo-600 cursor-pointer  shadow-sm bg-indigo-100 hover:bg-indigo-200 rounded "
                                >
                                  <HiOutlinePencilAlt />
                                </button>
                              </li>
                            ))}
                          </Box>

                          {(countryShippingPrice !== null && countryShippingPrice !== undefined) ||
                          (coutryPrice !== null && coutryPrice !== undefined) ? (
                            <>
                              {/* <div className="flex justify-between items-center">
                                <Typography variant="body1" className="text-gray-600">Shipping</Typography>
                                <span className="font-medium text-lg text-gray-800">
                                  £{countryShippingPrice !== null && countryShippingPrice !== undefined
                                    ? Number(countryShippingPrice).toFixed(2)
                                    : Number(coutryPrice || 0).toFixed(2)}
                                </span>
                              </div> */}

                              <li class="flex">
                                <div class="flex items-center p-2 lg:p-3 text-sm lg:text-base font-medium text-gray-900 rounded-lg bg-[#E8E1FC] group shadow  w-full overflow-hidden">
                                  <span class="flex-1 whitespace-nowrap text-[13px] overflow-ellipsis overflow-hidden">Shipping</span>

                                  <span class="text-[13px]">
                                    {" "}
                                    £
                                    {countryShippingPrice !== null && countryShippingPrice !== undefined
                                      ? Number(countryShippingPrice).toFixed(2)
                                      : Number(coutryPrice || 0).toFixed(2)}
                                  </span>
                                </div>
                              </li>
                            </>
                          ) : null}
                          {/* <div className="flex justify-between items-center">
                            <Typography variant="body1" className="text-gray-600">Subtotal</Typography>
                            <span className="font-medium text-lg text-gray-800">£{subtotal.toFixed(2)}</span>
                          </div> */}

                          <div class="flex items-center justify-between mt-6 md:mt-8">
                            <p class="text-sm text-gray-900 ">Sub Total</p>
                            <p class="text-sm text-gray-900 ">£{subtotal.toFixed(2)}</p>
                          </div>

                          <hr className="my-2 md:my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:mt-4" />

                          <div class="flex items-center justify-between">
                            <p class="text-base font-bold text-gray-900 ">Total</p>
                            <p class="text-base font-bold text-gray-900 ">£{total.toFixed(2)}</p>
                          </div>

                          <hr className="my-2 md:my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:mt-4" />

                          <div className="pt-6 flex flex-col space-y-6">
                            {/* Coupon Input Section */}
                            <div>
                              {!isCouponApplied && (
                                <div className={`flex items-center py-3 shadow-sm w:100  `}>
                                  <div className="sm:w-full w-1/2">
                                    <input
                                      type="text"
                                      value={discountCode}
                                      onChange={(e) => setDiscountCode(e.target.value)}
                                      placeholder="Discount code"
                                      className="w-full flex-1 text-sm text-gray-800 placeholder-gray-400 focus:outline-none rounded-md p-2 hover:border-blue-600 focus:outline-blue transition-shadow duration-200"
                                    />
                                  </div>
                                  <div className="w-1/2">
                                    <button
                                      type="button"
                                      onClick={handleApplyCoupon}
                                      disabled={discountCode.trim() === ""}
                                      className={`w-50 ml-3 px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-md transition-all duration-200 ${
                                        discountCode.trim() === ""
                                          ? "disabled:opacity-50 disabled:hover:bg-violet-700 disabled:cursor-not-allowed bg-violet-700 text-white rounded-md"
                                          : "bg-gradient-to-r from-violet-700 to-violet-500 text-white hover:from-violet-700 hover:to-violet-600"
                                      }`}
                                    >
                                      Apply Code
                                    </button>
                                  </div>
                                </div>
                              )}

                              {isCouponApplied && (
                                <div className="success-message mt-3 flex items-center justify-between bg-green-50 border border-green-400 rounded-lg px-5 py-3 shadow-sm hover:shadow-md transition-shadow duration-200">
                                  <div>
                                    <p className="text-green-800 font-medium">
                                      <span className="font-semibold text-green-900">{discountCode}</span> applied successfully.
                                    </p>
                                    <p className="text-green-600 text-sm">{getDiscountDisplay()} discount applied</p>
                                  </div>
                                  <button
                                    type="button"
                                    className="text-green-900 hover:text-red-600 transition-all duration-200 font-extrabold text-2xl"
                                    onClick={handleRemoveCoupon}
                                  >
                                    ×
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Subtotal */}

                            {/* Shipping */}
                            {/* {(countryShippingPrice !== null || coutryPrice) && (
                        <div className="flex justify-between items-center">
                          <Typography variant="body1" className="text-gray-600">Shipping</Typography>
                          <span className="font-medium text-lg text-gray-800">
                            £{countryShippingPrice !== null ? countryShippingPrice?.toFixed(2) : coutryPrice?.toFixed(2)}
                          </span>
                        </div>
                      )} */}

                            {/* Discount */}
                            {isCouponApplied && (
                              <div className="flex justify-between items-center text-green-700">
                                <Typography variant="body1">Discount</Typography>
                                <Typography variant="body1">
                                  {discountType === "Percent"
                                    ? `${discountAmount}% off (-£${calculateDiscountValue(subtotal).toFixed(2)})`
                                    : `-£${calculateDiscountValue(subtotal).toFixed(2)}`}
                                </Typography>
                              </div>
                            )}

                            {/* Total */}
                          </div>
                        </div>
                      </Box>
                    </div>
                  </div>
                </div>
                <div className="fixed bottom-2 w-[95%] mx-auto left-0 right-0 z-50 block sm:hidden">
                  <div className="relative flex justify-between items-center bg-white/30 backdrop-blur-lg rounded-lg py-3 px-6 shadow-lg border border-white/40">
                    {/* Content Layer (to prevent blur on buttons) */}
                    <div className="relative flex w-full justify-between items-center">
                      {/* Back Button */}
                      <button
                        onClick={() => dispatch(prevStep())}
                        className="flex flex-col items-center justify-center text-white rounded-md bg-violet-700 p-3"
                      >
                        <span className="text-md font-semibold px-3">Back</span>
                      </button>
                      <button
                        type="submit"
                        disabled={!isValid || loader}
                        className={`p-3 flex flex-col items-center justify-center ${
                          !isValid || loader
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
                          // Label with Icon
                          <span className="text-sm font-semibold">Proceed to Payment</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Stepeight;
