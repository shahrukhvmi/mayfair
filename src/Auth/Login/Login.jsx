import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
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
import { useLoginMutation } from "../../store/services/Auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../store/services/Auth/authSlice";
import { AuthContext } from "../AuthContext";
const Login = () => {
  const { islogin } = useContext(AuthContext);

  const company_id = 2;
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
        company_id,
      }).unwrap();

      if (response?.data?.token) {
        dispatch(
          setCredentials({ token: response.data.token, user: response.data })
        );
        toast.success("Login successful!");
        islogin(response?.data?.token);
        navigate("/");
        window.location.reload();
      } else {
        toast.error("Invalid login response");
      }
    } catch (err) {
      const errors = err?.data?.errors?.login;
      const user = err?.data?.errors?.user;
      if (errors || user) {
        toast.error(errors || user);
      }
    }
  };

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
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
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)", // Subtle but deep shadow
          borderRadius: 3,
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)", // Elevated shadow on hover
          },
        }}
      >
        <div className="bg-white p-6 w-full rounded-lg mb-10">
          <h2 className="text-2xl font-semibold text-center text-[#1C1C29] mb-4">
            Returning Patient
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
              error={!!errors.email} // Display error for email
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

            {/* Password Field */}
            <TextField
              {...register("password", {
                required: "Password is required",
                // minLength: {
                //     value: 8,
                //     message: 'Password must be at least 8 characters',
                // },
                // pattern: {
                //     value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).*$/,
                //     message: 'Password must contain at least one uppercase letter, one number, and one special character',
                // },
              })}
              variant="standard"
              margin="normal"
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              error={!!errors.password} // Display error for password
              // helperText={errors.password ? errors.password.message : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <FiEye size={18} />
                      ) : (
                        <FiEyeOff size={18} />
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

            {/* Submit Button */}

            <div className="text-center my-3">
              <button
                disabled={!isValid || isLoading}
                type="submit"
                className="w-full px-6 py-2 disabled:opacity-50 disabled:hover:bg-[#4565BF] disabled:cursor-not-allowed bg-[#4565BF] border border-transparent rounded-md med-font text-xs text-white uppercase tracking-widest hover:bg-[#4565BF] focus:bg-bg-[#4565BF] active:bg-[#4565BF] focus:outline-none focus:ring-2 focus:ring-[#4565BF] focus:ring-offset-2 transition ease-in-out duration-150"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            ></Box>
            {/* Register Button */}
            <Box
              sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
            >
              <Typography variant="body2" className="reg-font">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "#4DB581" }}
                  className="font-semibold"
                >
                  Register
                </Link>
                <div className="reg-font text-center mt-2">
                  <Link
                    to="/forgot-password"
                    style={{ textDecoration: "underline", color: "#4565BF" }}
                    className="font-semibold"
                  >
                    Forgot password?
                  </Link>
                </div>
              </Typography>
            </Box>
          </form>
        </div>
      </Box>
    </Container>
  );
};

export default Login;
