import React, { useState, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import useGsapAnimation from "./Hook/useGsapAnimation/useGsapAnimation";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Auth/AuthContext";
import PublicRoute from "./Auth/PublicRoute";
import ProtectedRoute from "./Auth/ProtectedRoute";
import PaymentFailed from "./components/PaymentFailed/PaymentFailed";
import { useSelector } from "react-redux";

// Lazy load components
const MainLayout = React.lazy(() => import("./Layout/MainLayout/MainLayout"));
const StepsLayout = React.lazy(() => import("./Layout/StepsLayout/StepsLayout"));
const Steps = React.lazy(() => import("./components/Steps"));
const Welcome = React.lazy(() => import("./Auth/Welcom/Welcom"));
const DashBoardLayout = React.lazy(() => import("./components/DashBoard/DashBoardLayout"));
const MyAccount = React.lazy(() => import("./components/DashBoard/MyAccount/MyAccount"));
const MyOrders = React.lazy(() => import("./components/DashBoard/MyOrders/MyOrders"));
const OrderDetails = React.lazy(() => import("./components/DashBoard/OrderDetails/Order-details"));
const MyProfile = React.lazy(() => import("./components/DashBoard/MyProfile/MyProfile"));
const MyAddress = React.lazy(() => import("./components/DashBoard/MyAddress/MyAddress"));
const ChangePassword = React.lazy(() => import("./components/DashBoard/ChangePassword/ChangePassword"));
const ForgotPassword = React.lazy(() => import("./components/DashBoard/ForgotPassword/ForgotPassword"));
const ThankYou = React.lazy(() => import("./components/ThankYou/ThankYou"));
const ChangeForgotPassword = React.lazy(() => import("./Auth/ChangeForgotPassword/ChangeForgotPassword"));

const App = () => {
  // const [isLoaded, setIsLoaded] = useState(false);
  // const location = useLocation();
  const paymentLoading = useSelector((state) => state.paymentLoader.loading);
  // const [paymentLoading, setPaymentLoading] = useState(false);
  // useEffect(() => {
  //   if (localStorage.getItem("paymentLoader") == "true") {
  //     setPaymentLoading(true);
  //   } else {
  //     setPaymentLoading(false);
  //   }
  // }, [paymentLoading]);

  // console.log(paymentLoading, "paymentLoading");

  // // Check if the current route is /consultation-form
  // const shouldAnimate = location.pathname === "/consultation-form";

  // // Pass shouldAnimate to the useGsapAnimation hook
  // useGsapAnimation(setIsLoaded, shouldAnimate);

  return (
    <div className={`overflow-hidden ${paymentLoading ? "h-[100vh]" : "h-full"}`}>
      {/* Loader Animation */}
      {/* {!isLoaded && shouldAnimate && (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-green-100">
          <div className="flex flex-col items-center justify-center space-y-4 h-full">
            <div className="loader-logo opacity-0">
              <img
                src="/logo.png"
                alt="Logo"
                className="logo transition-transform duration-1000"
              />
            </div>
            <div className="welcome-message text-center text-lg opacity-0">
              <h1 className="text-[#1C1C29] font-sans text-4xl">Welcome</h1>
              <p className="text-[#1C1C29] font-sans text-lg">
                We will ask you some quick medical questions.
              </p>
            </div>
          </div>
        </div>
      )} */}

      {/* Main Application Content */}
      {/* {isLoaded && ( */}
      <AuthProvider>
        <Suspense fallback={<div></div>}>
          <Routes>
            {/* Auth Routes */}
            <Route
              path="/"
              element={
                <PublicRoute
                  element={
                    <MainLayout>
                      <Welcome />
                    </MainLayout>
                  }
                />
              }
            />
            <Route
              path="/register/"
              element={
                <PublicRoute
                  element={
                    <MainLayout>
                      <Welcome />
                    </MainLayout>
                  }
                />
              }
            />
            <Route
              path="/forgot-password/"
              element={
                <PublicRoute
                  element={
                    <MainLayout>
                      <ForgotPassword />
                    </MainLayout>
                  }
                />
              }
            />
            <Route
              path="/change-forgot-password/"
              element={
                <PublicRoute
                  element={
                    <MainLayout>
                      <ChangeForgotPassword />
                    </MainLayout>
                  }
                />
              }
            />

            {/* Dashboard Routes */}
            <Route path="/dashboard/" element={<ProtectedRoute element={<DashBoardLayout element={<MyAccount />} />} />} />
            <Route path="/orders/" element={<ProtectedRoute element={<DashBoardLayout element={<MyOrders />} />} />} />
            <Route path="/orders/:id/" element={<OrderDetails />} />

            <Route path="/profile/" element={<ProtectedRoute element={<DashBoardLayout element={<MyProfile />} />} />} />
            <Route path="/address/" element={<ProtectedRoute element={<DashBoardLayout element={<MyAddress />} />} />} />
            <Route path="/change-password/" element={<ProtectedRoute element={<DashBoardLayout element={<ChangePassword />} />} />} />
            <Route
              path="/consultation-form/"
              element={
                <ProtectedRoute
                  element={
                    <StepsLayout>
                      <Steps />
                    </StepsLayout>
                  }
                />
              }
            />
            {/* <Route
                path="/thank-you"
                element={
                  <PublicRoute
                    element={
                      <MainLayout>
                        <ThankYou />
                      </MainLayout>
                    }
                  />
                }
              />

              <Route
                path="/payment-failed"
                element={
                  <PublicRoute
                    element={
                      <MainLayout>
                        <PaymentFailed />
                      </MainLayout>
                    }
                  />
                }
              /> */}

            <Route path="/thank-you/" element={<ThankYou />} />
            <Route path="/payment-failed/" element={<PaymentFailed />} />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/dashboard/" />} />
          </Routes>
          <Toaster />
        </Suspense>
      </AuthProvider>
    </div>
  );
};

export default App;
