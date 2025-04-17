import React, { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetPrevsMutation } from "../store/services/Steps/Steps";
import { setStepPrevApiData } from "../store/slice/stepSlice";
import { triggerStep } from "../store/slice/stepper";
import { setStockLoading } from "../store/slice/stockLoaderSlice";
// import { setPaymentLoading } from "../store/slice/paymentLoaderSlice";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [getPrev] = useGetPrevsMutation();
  // const currentStep = useSelector((state) => state.step?.currentStep);

  const params = new URLSearchParams(location.search);
  const productId = params.get("product_id");
  if (productId) {
    localStorage.setItem("previous_id", productId);
  }
  // :fire::fire::fire::fire::fire::fire::fire::fire:login in url  direct Impersonation mode  :fire::fire::fire::fire::fire::fire::fire::fire:
  const paramss = new URLSearchParams(location.search);
  const impersonateEmail = paramss.get("impersonate_email");
  if (impersonateEmail) {
    localStorage.clear();
  }
  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setLoading(false);
  };
  const islogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    navigate("/dashboard/");
  };
  const impersonateEmailGet = localStorage.getItem("impersonate_email");
  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(true);
    if (impersonateEmailGet) {
      window.location.href = "https://app.mayfairweightlossclinic.co.uk/admin";
      console.log("this runs");
    } else {
      navigate("/");
      setIsAuthenticated(false);
    }
  };
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // For instock Url
  const clinic_id = 1;
  const url = import.meta.env.VITE_BASE_URL;
  const param = new URLSearchParams(window.location.search);
  const pidFromUrl = param.get("pid");
  const inStockFromUrl = param.get("in_stock");

  if (inStockFromUrl) {
    dispatch(triggerStep(7));
    localStorage.setItem("progress", 85);
    localStorage.setItem("p_id", pidFromUrl);
    localStorage.setItem("in_stock", inStockFromUrl);
  }
  const pid = pidFromUrl || localStorage.getItem("p_id");
  // const inStock = pidFromUrl || localStorage.getItem("token");
  const inStock = inStockFromUrl || localStorage.getItem("in_stock");
  // Save URL params to localStorage if not already set
  // useEffect(() => {
  //   if (pidFromUrl && !localStorage.getItem("p_id")) {
  //     localStorage.setItem("p_id", pidFromUrl);
  //   }
  //   if (inStockFromUrl && !localStorage.getItem("in_stock")) {
  //     localStorage.setItem("in_stock", inStockFromUrl);
  //   }
  // }, [pidFromUrl, inStockFromUrl]);

  const autoCheck = async () => {
    try {
      setIsLoading(true); // Show loading spinner
      dispatch(setStockLoading(true));
      // localStorage.setItem("inStockLoader", "true");
      const response = await getPrev({
        url,
        clinic_id,
        product_id: Number(pid),
      }).unwrap();
      const res = response?.data;
      if (res) {
        dispatch(setStepPrevApiData(res));
        // localStorage.setItem("currentStep", 7);
        navigate(`/consultation-form/?product_id=${pid}`);
        // localStorage.setItem("inStockLoader", "false");
      }
    } catch (err) {
      console.error("Failed to fetch previous steps:", err);
    } finally {
      setIsLoading(false); // Hide loading spinner once response is received
    }
  };

  useEffect(() => {
    // const inStockValue = inStock;
    // Otherwise, fetch previous steps
    if (inStock) {
      // If in_stock is 1, immediately set the current step and progress
      // localStorage.setItem("currentStep", 7);
      // localStorage.setItem("progress", 85);
      setIsLoading(true); // Show loading spinner
      // navigate(`/consultation-form/?product_id=${pid}`);
      autoCheck();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, islogin, logout }}>
      {/* {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        children
      )} */}
      {/*  */}
      {children}
    </AuthContext.Provider>
  );
};
