import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import axios from "axios";

const MyProfile = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    trigger,
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      gender: "",
      dateOfBirth: null,
    },
  });


  const [user, setUserData] = useState(null);
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        "https://app.mayfairweightlossclinic.co.uk/api/profile/GetUserData",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {

        const user = data?.profile?.user;
        if (user) {
          localStorage.setItem("userData", JSON.stringify(data));
          setUserData(user);
        } else {
          console.warn("User data not found in response.");
        }
      } else {
        console.error("Error:", data.message || "Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


  useEffect(() => {
    fetchUserData();
  }, []);

  const [dobError, setDobError] = useState("");
  const today = dayjs();

  const handleDateChange = (date) => {
    if (!date) {
      setDobError("Date of birth is required");
      setValue("dateOfBirth", null);
      return;
    }

    const age = today.diff(date, "year");

    if (age < 18) {
      setDobError("You must be at least 18 years old");
      setValue("dateOfBirth", date);
    } else {
      setDobError("");
      // const formattedDate = moment(date).format("DD-MM-YYYY");
      setValue("dateOfBirth", date);
    }
  };

  useEffect(() => {
    if (user) {
      setValue("firstName", user.fname || "");
      setValue("lastName", user.lname || "");
      setValue("phoneNumber", user.phone || "");
      setValue("gender", user.gender || "");
      setValue("dateOfBirth", user.dob || null);

      if (user.fname && user.lname && user.phone && user.gender && user.dob) {
        trigger();
      }
    }
  }, [user, setValue, trigger]);



  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
  
      const response = await axios.post(
        "https://app.mayfairweightlossclinic.co.uk/api/profile/UpdateUserData",
        {
          dob: data.dateOfBirth,
          firstname: data.firstName,
          lastname: data.lastName,
          phone: data.phoneNumber,
          gender: data.gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      // ✅ Handle Success
      toast.success(response.data.message || "Profile updated successfully");
      fetchUserData();
    } catch (error) {
      // ✅ Handle Errors Properly
      const errorMessage =
        error.response?.data?.message || "Failed to update profile";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="p-6 sm:bg-[#F9FAFB] sm:min-h-screen sm:rounded-md sm:shadow-md my-5 me-5">
      <div className="mb-8">
        <h2 className="md:text-3xl text-lg mb-2 font-semibold">
          Profile Information
        </h2>
        <p className="reg-font text-gray-600 text-left text-sm xl:w-3/4 mt-2">
          Update your account's profile information and email address.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* First Name and Last Name */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <TextField
              label="First Name"
              variant="standard"
              fullWidth
              value={watch("firstName") || ""}
              {...register("firstName", { required: "First name is required" })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </div>
          <div>
            <TextField
              label="Last Name"
              variant="standard"
              fullWidth
              value={watch("lastName") || ""}
              {...register("lastName", { required: "Last name is required" })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </div>
        </div>

        {/* Gender Selection */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Gender Selection */}
          <FormControl fullWidth variant="standard" error={!!errors.gender}>
            <InputLabel>Gender</InputLabel>
            <Select
              value={watch("gender") || ""}
              onChange={(e) => setValue("gender", e.target.value)}
              {...register("gender", { required: "Gender is required" })}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
            {errors.gender && (
              <FormHelperText>{errors.gender.message}</FormHelperText>
            )}
          </FormControl>

          {/* Date of Birth */}
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="dateOfBirth"
                control={control}
                rules={{ required: "Date of birth is required" }}
                render={({ field }) => (
                  <DatePicker
                    label="Date of Birth"
                    value={
                      field.value ? dayjs(field.value, "DD-MM-YYYY") : null
                    }
                    onChange={(date) => {
                      handleDateChange(date);
                      field.onChange(date);
                    }}
                    format="DD/MM/YYYY"
                    maxDate={today}
                    slotProps={{
                      textField: {
                        variant: "standard",
                        fullWidth: true,
                        error: !!dobError,
                        helperText: dobError,
                        placeholder: "DD/MM/YYYY",
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>

        {/* Phone Number */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="my-auto">
            <Controller
              name="phoneNumber"
              control={control}
              value={watch("phoneNumber") || ""}
              rules={{
                required: "Phone number is required",
                minLength: {
                  value: 10,
                  message: "Phone number should be at least 10 digits",
                },
              }}
              render={({ field }) => (
                <PhoneInput
                  country="gb"
                  placeholder="Enter your phone number"
                  inputStyle={{ width: "100%" }}
                  {...field}
                />
              )}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="relative top-3">
            <div className=" bg-white border border-gray-400 rounded-[4px] border-1 p-[6px] cursor-not-allowed my-auto">
              <p className="font-med text-sm text-gray-400">{user?.email}</p>

              {/* Helper text */}
            </div>

            <p className="reg-font text-xs mt-2 text-gray-700">
              ( This email is associated with your account and cannot be changed)
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4 sm:max-w-20">
          <div className="text-center my-3">
            <button
              disabled={!isValid || isLoading}
              type="submit"
              className="w-full px-6 py-2 disabled:opacity-50 disabled:hover:bg-[#4565BF] disabled:cursor-not-allowed bg-[#4565BF] border border-transparent rounded-md med-font text-xs text-white uppercase tracking-widest hover:bg-[#4565BF] focus:bg-bg-[#4565BF] active:bg-[#4565BF] focus:outline-none focus:ring-2 focus:ring-[#4565BF] focus:ring-offset-2 transition ease-in-out duration-150"
            >
              {/* Show a progress bar if loading is true */}
              {isLoading ? (
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-t-transparent border-[#ffffff] rounded-full animate-spin"></div>{" "}
                    {/* Spinner */}
                  </div>
                  <span className="opacity-0">Saving...</span>
                </div>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
