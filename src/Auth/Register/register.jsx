import React, { useContext, useState } from "react";
import {
  TextField,
  Typography,
  Box,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
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
  const company_id = 2;

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
      // navigate("/login");
      islogin(response?.data?.token);

      navigate("/");
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
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)", // Subtle but deep shadow
          borderRadius: 3,
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)", // Elevated shadow on hover
          },
        }}
      >
        <h2 className="text-2xl font-semibold text-center text-[#1C1C29] mb-4">
          Register as a new patient
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
            type="email"
            variant="standard"
            margin="normal"
            fullWidth
            label="Email"
            autoFocus
            error={!!errors.email}
            helperText={errors?.email?.message || ""}
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

          {/* Confirm Email Field */}
          <TextField
            {...register("confirmEmail", {
              required: "Confirm Email is required",
              validate: (value) => {
      
              
                return value.trim() === email.trim() || "Emails do not match";
              },
            })}
            variant="standard"
            margin="normal"
            fullWidth
            label="Confirm Email"
            autoFocus
            error={!!errors.confirmEmail}
            helperText={errors?.confirmEmail?.message || ""}
            onPaste={(e) => {
              e.preventDefault(); // Prevent paste
              toast.error(
                "Copy-pasting is not allowed. Please manually enter the Confirm Password."
              );
            }}
            onDrop={(e) => {
              e.preventDefault(); // Prevent drag-and-drop
              toast.error(
                "Drag-and-drop is not allowed in this field. Please type the email."
              );
            }}
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

          {/* Password Field */}
          {/* Password Field */}
          <TextField
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).*$/,
                message:
                  "Password must contain at least one uppercase letter, one number, and one special character",
              },
            })}
            variant="standard"
            margin="normal"
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            error={!!errors.password}
            helperText={errors?.password?.message || ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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

          {/* Confirm Password Field */}
          <TextField
            {...register("confirmPassword", {
              validate: (value) => {
                const passwordValue = getValues("password");
              

                if (!passwordValue) {
                  return "Password field must be filled first";
                }
                if (!value) {
                  return "Confirm password is required";
                }
                return (
                  value.trim() === passwordValue.trim() ||
                  "Passwords do not match"
                );
              },
            })}
            variant="standard"
            margin="normal"
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            error={!!errors.confirmPassword}
            helperText={errors?.confirmPassword?.message || ""}
            onPaste={(e) => {
              e.preventDefault();
              toast.error(
                "Copy-pasting is not allowed. Please manually enter the Confirm Password."
              );
            }}
            onDrop={(e) => {
              e.preventDefault();
              toast.error(
                "Drag-and-drop is not allowed. Please type the Confirm Password."
              );
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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

          {/* Register Button - Disabled if form is not valid */}

          <div className="text-center my-3">
            <button
              disabled={!isValid}
              type="submit"
              className="w-full px-6 py-2 disabled:opacity-50 disabled:hover:bg-[#4565BF] disabled:cursor-not-allowed bg-[#4565BF] border border-transparent rounded-md med-font text-xs text-white uppercase tracking-widest hover:bg-[#4565BF] focus:bg-bg-[#4565BF] active:bg-[#4565BF] focus:outline-none focus:ring-2 focus:ring-[#4565BF] focus:ring-offset-2 transition ease-in-out duration-150"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>

          {/* Login Button */}
          <Box
            sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
            className="reg-font"
          >
            <Typography variant="body2">
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
      </Box>
    </Container>
  );
};

export default Register;
