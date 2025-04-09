import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const productId = params.get("product_id");

  if (productId) {
    localStorage.setItem("previous_id", productId);
  }

  // 🔥🔥🔥🔥🔥🔥🔥🔥login in url  direct Impersonation mode  🔥🔥🔥🔥🔥🔥🔥🔥

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
    localStorage.removeItem("token");
    localStorage.removeItem("currentStep");
    localStorage.removeItem("start_concent");
    localStorage.removeItem("reorder");
    localStorage.removeItem("reorder_concent");
    localStorage.removeItem("discountCode");
    localStorage.removeItem("isCouponApplied");
    localStorage.removeItem("discountType");
    localStorage.removeItem("discountAmount");
    localStorage.removeItem("selectedMessages");
    localStorage.removeItem("selectedVariations");
    localStorage.removeItem("step1");
    localStorage.removeItem("step1");
    localStorage.removeItem("step2");
    localStorage.removeItem("step3");
    localStorage.removeItem("step4");
    localStorage.removeItem("step5");
    localStorage.removeItem("step6");
    localStorage.removeItem("stepPrevApiData");
    localStorage.removeItem("previous_id");
    localStorage.removeItem("impersonate_email");

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
