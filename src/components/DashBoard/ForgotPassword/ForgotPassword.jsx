import React from "react";
import { TextField, Box, Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useForgotPasswordMutation } from "../../../store/services/Auth/authApi";
import { setForgotToken } from "../../../store/services/Auth/authSlice";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const passwordlink = import.meta.env.VITE_FORGOT_URL;
  const forgotToken = useSelector((state) => state.auth.forgotToken);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  // Forgot Email Api here 👇👇
  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();
  const onSubmit = async (data) => {
    try {
      const response = await forgotPasswordMutation({
        email: data.email,
        passwordlink,
      }).unwrap();
      dispatch(setForgotToken({ forgotToken: response?.data?.token }));
      toast.success(response.message || "Password reset link sent!");
      reset();
    } catch (err) {
      toast.error(err?.data?.errors?.User);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#DACFFF] px-4 pt-6">
      <div className="xl:w-1/3 lg:w-2/5 sm:w-1/2 bg-white xl:p-10 sm:p-7 border shadow-lg rounded-xl px-4 py-4">
        <div className="bg-white w-full rounded-lg mb-10 ">
          <h2 className="text-xl font-semibold text-center text-[#1C1C29] mb-4">Forgot your password?</h2>
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
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600 transition ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="text-center mt-6">
              <button
                disabled={!isValid || isLoading}
                type="submit"
                className="w-full px-6 py-2 disabled:opacity-50 disabled:hover:bg-violet-700 disabled:cursor-not-allowed bg-violet-700 border border-transparent rounded-md med-font text-xs text-white uppercase tracking-widest hover:bg-violet-700 focus:bg-bg-violet-700 active:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 transition ease-in-out duration-150"
              >
                {isLoading ? "Sending..." : "Send Password Reset Link"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
