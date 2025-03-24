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
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          backgroundColor: "#ffffff",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          borderRadius: 3,
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <div className="bg-white sm:p-6 w-full rounded-lg mb-10">
          <h2 className="text-2xl font-semibold text-center text-[#1C1C29] mb-4">
            Forgot your password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            {/* Email Field */}
            <TextField
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              variant="standard"
              margin="normal"
              fullWidth
              label="Email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ddd",
                  },
                  "&:hover fieldset": {
                    borderColor: "#4DB581",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4DB581",
                  },
                },
              }}
            />

            {/* Submit Button */}
            <div className="text-center mt-6">
              <button
                disabled={!isValid || isLoading}
                type="submit"
                className="w-full px-6 py-2 disabled:opacity-50 disabled:hover:bg-[#4565BF] disabled:cursor-not-allowed bg-[#4565BF] border border-transparent rounded-md med-font text-xs text-white uppercase tracking-widest hover:bg-[#4565BF] focus:bg-bg-[#4565BF] active:bg-[#4565BF] focus:outline-none focus:ring-2 focus:ring-[#4565BF] focus:ring-offset-2 transition ease-in-out duration-150"
              >
                {isLoading ? "Sending..." : "Send Password Reset Link"}
              </button>
            </div>

            <Box
              sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
            >
              <Typography variant="body2" className="reg-font">
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#4DB581" }}
                  className="font-semibold"
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </form>
        </div>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
