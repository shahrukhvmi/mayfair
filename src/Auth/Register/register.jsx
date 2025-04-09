import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../../store/services/Auth/authApi";
import { AuthContext } from "../AuthContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const company_id = 1;

  // Register Api here 👇👇
  const [registerPatient, { isLoading }] = useRegisterMutation();
  const { islogin } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const response = await registerPatient({
        email: data.email,
        email_confirmation: data.confirmEmail,
        password: data.password,
        password_confirmation: data.confirmPassword,
        company_id,
      }).unwrap();
      toast.success(response?.message);
      // navigate("/login/");
      islogin(response?.data?.token);

      navigate("/dashboard/");
      window.location.reload();
    } catch (err) {
      toast.error(err?.data?.errors?.email);
    }
  };

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // Watch password to validate confirm password
  const password = watch("password");
  const email = watch("email");
  const confirmEmail = watch("confirmEmail");

  const params = new URLSearchParams(location.search);
  const impersonateEmail = params.get("impersonate_email");

  const impersonateFromLocal = localStorage.getItem("impersonate_email");

  return (
    <>
      {impersonateEmail || impersonateFromLocal ? (
        ""
      ) : (
        <div className="w-full">
          <div className="p-4">
            <h2 className="bold-font text-center mb-5 lg:mb-10 text-xl 2xl:text-2xl">Register as a new patient</h2>

            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              {/* Email Field */}
              <div className="mb-4 w-full">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  autoFocus
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-md bg-[#f4f6ff] text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div className="mb-4 w-full">
                <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Email
                </label>
                <input
                  type="email"
                  id="confirmEmail"
                  autoComplete="off"
                  {...register("confirmEmail", {
                    required: "Confirm Email is required",
                    validate: (value) => value.trim() === email.trim() || "Emails do not match",
                  })}
                  onPaste={(e) => {
                    e.preventDefault();
                    toast.error("Copy-pasting is not allowed. Please manually enter the Confirm Email.");
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    toast.error("Drag-and-drop is not allowed. Please type the Confirm Email.");
                  }}
                  className={`w-full px-4 py-2 border rounded-md bg-[#f4f6ff] text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.confirmEmail ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.confirmEmail && <p className="mt-1 text-sm text-red-500">{errors.confirmEmail.message}</p>}
              </div>

              {/* Password Field */}
              {/* Password Field */}
              <div className="mb-4 w-full relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).*$/,
                      message: "Password must contain at least one uppercase letter, one number, and one special character",
                    },
                  })}
                  className={`w-full px-4 py-2 pr-10 border rounded-md bg-[#f4f6ff] text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {/* Toggle Eye Icon */}
                <div className="absolute right-3 top-[34px] cursor-pointer text-purple-600" onClick={handleClickShowPassword}>
                  {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                </div>

                {/* Error Message */}
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
              </div>

              {/* Confirm Password Field */}

              <div className="mb-4 w-full relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    validate: (value) => {
                      const passwordValue = getValues("password");

                      if (!passwordValue) {
                        return "Password field must be filled first";
                      }
                      if (!value) {
                        return "Confirm password is required";
                      }
                      return value.trim() === passwordValue.trim() || "Passwords do not match";
                    },
                  })}
                  onPaste={(e) => {
                    e.preventDefault();
                    toast.error("Copy-pasting is not allowed. Please manually enter the Confirm Password.");
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    toast.error("Drag-and-drop is not allowed. Please type the Confirm Password.");
                  }}
                  className={`w-full px-4 py-2 pr-10 border rounded-md bg-[#f4f6ff] text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {/* Eye Icon Toggle */}
                <div className="absolute right-3 top-[34px] cursor-pointer text-purple-600" onClick={handleClickShowConfirmPassword}>
                  {showConfirmPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                </div>

                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
              </div>

              {/* Register Button - Disabled if form is not valid */}

              <div className="text-start my-3">
                <button
                  disabled={!isValid}
                  type="submit"
                  className="inline-flex items-center px-6 py-2 disabled:opacity-50 disabled:hover:bg-violet-800 disabled:cursor-not-allowed bg-violet-800 border border-transparent rounded-full font-semibold text-xs text-white uppercase tracking-widest hover:bg-violet-700 focus:bg-bg-violet-700 active:bg-violet-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                  {isLoading && (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
                    </svg>
                  )}
                  {isLoading ? "" : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
