import React, { useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/register";
import Footer from "../../components/Footer";

const Welcome = () => {
  const [selectedTab, setSelectedTab] = useState("tab1");
  const [isImpersonateLoading, setIsImpersonateLoading] = useState(false);

  const handleTabChange = (event) => {
    setSelectedTab(event.target.value);
  };

  const params = new URLSearchParams(location.search);
  const impersonateEmail = params.get("impersonate_email");

  console.log(isImpersonateLoading, "isImpersonateLoading");

  const impersonateFromLocal = localStorage.getItem("impersonate_email");
  console.log(impersonateFromLocal);

  return (
    <>
      {isImpersonateLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center bg-[#DACFFF] px-4 pt-6 justify-evenly" style={{ minHeight: "calc(100vh - 66px)" }}>
          {/* Page Heading */}
          {impersonateEmail || impersonateFromLocal ? (
            <>
              <Register />
              <Login setIsImpersonateLoading={setIsImpersonateLoading} />
            </>
          ) : (
            <>
              <div className="flex flex-col items-center pb-7 text-center ">
                <h1 className="xl:text-4xl sm:text-4xl bold-font pb-3 sm:pb-3 text-3xl w-3/4 sm:w-full 2xl:text-4xl 2xl:pb-4 sm:px-0 2xl:px-2 2xl:font-semibold">
                  Welcome to your online consultation
                </h1>

                <p className="reg-font md:text-lg sm:text-base text-lg text-[#595959] mx-auto 2xl:w-[1200px] 2xl:px-[280px] lg:px-[160px] md:px-[50px] sm:px-[40px] px-[16px]">
                  In order for our doctors to assess your suitability for treatment, you will be asked to complete a short medical questionnaire at
                  the next step.
                </p>
              </div>

              {/* Desktop View: Side-by-Side */}

              <div className="hidden lg:grid bg-white p-6 rounded-lg shadow-lg grid-cols-2 gap-6 lg:w-[950px] xl:w-[1100px] mb-5">
                <div className="border-r border-gray-500 pr-4">
                  <Register />
                </div>
                <div className="pl-4">
                  <Login setIsImpersonateLoading={setIsImpersonateLoading} />
                </div>
              </div>
            </>
          )}

          {/* Mobile View: Tab Switcher */}
          {impersonateEmail || impersonateFromLocal ? (
            <>
              <Register />
              <Login setIsImpersonateLoading={setIsImpersonateLoading} />
            </>
          ) : (
            <>
              <div className="bg-white lg:hidden mx-auto py-8 shadow-lg rounded-xl w-full max-w-md mt-6">
                {/* Tab Switcher */}
                <div className="flex justify-center mb-6 px-3">
                  <div className="bg-gray-200 rounded-lg flex overflow-hidden">
                    <label
                      htmlFor="tab1"
                      className={`py-2 px-4 cursor-pointer text-sm font-semibold transition-all duration-200 ${
                        selectedTab === "tab1" ? "bg-purple-600 text-white" : "text-gray-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="tabs"
                        id="tab1"
                        value="tab1"
                        className="hidden"
                        checked={selectedTab === "tab1"}
                        onChange={handleTabChange}
                      />
                      Register as a new patient
                    </label>
                    <label
                      htmlFor="tab2"
                      className={`py-2 px-4 cursor-pointer text-sm font-semibold transition-all duration-200 ${
                        selectedTab === "tab2" ? "bg-purple-600 text-white" : "text-gray-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="tabs"
                        id="tab2"
                        value="tab2"
                        className="hidden"
                        checked={selectedTab === "tab2"}
                        onChange={handleTabChange}
                      />
                      Returning patient
                    </label>
                  </div>
                </div>

                {/* Conditional Tabs */}
                {selectedTab === "tab1" && <Register />}
                {selectedTab === "tab2" && <Login setIsImpersonateLoading={setIsImpersonateLoading} />}
              </div>
              <Footer />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Welcome;
