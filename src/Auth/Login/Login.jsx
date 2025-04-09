import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { useLoginImpersonationMutation, useLoginMutation } from "../../store/services/Auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../store/services/Auth/authSlice";
import { AuthContext } from "../AuthContext";
import { Checkbox, FormControlLabel } from "@mui/material";

const Login = ({ setIsImpersonateLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { islogin } = useContext(AuthContext);

  // 🔥🔥🔥🔥🔥🔥🔥🔥login in url  direct Impersonation mode 🔥🔥🔥🔥🔥🔥🔥🔥
  const [loginImpersonation, { isLoading: isImpersonateLoading, error: errorr }] = useLoginImpersonationMutation();

  const params = new URLSearchParams(location.search);
  const impersonateEmail = params.get("impersonate_email");

  useEffect(() => {
    setIsImpersonateLoading(isImpersonateLoading);
  }, [isImpersonateLoading, setIsImpersonateLoading]);
  useEffect(() => {
    if (impersonateEmail) {
      localStorage.setItem("impersonate_email", impersonateEmail);

      const loginNow = async () => {
        try {
          setIsImpersonateLoading(true);

          const response = await loginImpersonation({
            impersonate_email: impersonateEmail,
          }).unwrap();

          if (response?.data?.token) {
            dispatch(setCredentials({ token: response.data.token, user: response.data }));
            //    toast.success("Login successful!");
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard/");
            window.location.reload();
          } else {
            toast.error("Invalid login response");
          }
        } catch (err) {
          // const errors = err?.data?.errors?.login;
          // const user = err?.data?.errors?.user;
          // toast.error(errors || user || "Login failed");
          if (err) {
            localStorage.removeItem("impersonate_email", impersonateEmail);
            setIsImpersonateLoading(false);
            navigate("/")
          }else{

          }

        } finally {
          setIsImpersonateLoading(false); // ✅ Stop loading
        }
      };

      loginNow();
    }
  }, [location.search, loginImpersonation, dispatch, navigate]);

  // 🔥🔥🔥🔥🔥🔥🔥🔥login in url  direct Impersonation mode END 🔥🔥🔥🔥🔥🔥🔥🔥

  const company_id = 1;
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();

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
        dispatch(setCredentials({ token: response.data.token, user: response.data }));
        toast.success("Login successful!");
        islogin(response?.data?.token);
        navigate("/dashboard/");
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
  const [rememberMe, setRememberMe] = useState(false);

  const impersonateFromLocal = localStorage.getItem("impersonate_email");

  return (
    <>
      {impersonateEmail || impersonateFromLocal ? (
        ""
      ) : (
        <div className="w-full">
          <div className="p-4">
            <h2 className="bold-font text-center mb-5 lg:mb-10 text-xl 2xl:text-2xl">Returning patient</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              {/* Email Field */}
              <div className="mb-4 w-full">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-md bg-[#f4f6ff] text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  autoFocus
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>

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
                    // Uncomment below if you want stricter validation:
                    // minLength: {
                    //   value: 8,
                    //   message: "Password must be at least 8 characters",
                    // },
                    // pattern: {
                    //   value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).*$/,
                    //   message: "Must contain uppercase, number & special char",
                    // },
                  })}
                  className={`w-full px-4 py-2 pr-10 border rounded-md bg-[#f4f6ff] text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                />

                {/* Eye Icon */}
                <div className="absolute right-3 top-[36px] cursor-pointer text-purple-600" onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                </div>

                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex justify-between items-center mt-4">
                <div className="block mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded-lg accent-purple-700 border-gray-300 text-white shadow-sm focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Remember me</span>
                  </label>
                </div>

                {/* Forgot Password */}
                <Link to="/forgot-password/" className="text-sm text-gray-600 hover:text-violet-700">
                  Forgot your password?
                </Link>
              </div>

              <div className="text-start my-3">
                <button
                  disabled={!isValid || isLoading || isImpersonateLoading}
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2 disabled:opacity-50 disabled:hover:bg-violet-800 disabled:cursor-not-allowed bg-violet-800 border border-transparent rounded-full font-semibold text-xs text-white uppercase tracking-widest hover:bg-violet-700 focus:bg-bg-violet-700 active:bg-violet-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                  {(isLoading || isImpersonateLoading) && (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
                    </svg>
                  )}
                  {isLoading ? "" : "Login"}
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
              {/* <Box
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
          </Box> */}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
