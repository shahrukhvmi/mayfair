import React, { useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/register";

const Welcome = () => {
  const [selectedTab, setSelectedTab] = useState("tab1");

  const handleTabChange = (event) => {
    setSelectedTab(event.target.value);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-[#DACFFF] px-4 pt-6 lg:pt-20">
        {/* Page Heading */}
        <div className="max-w-4xl text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to your online consultation</h1>
          <p className="text-gray-700 mt-3">
            In order for our doctors to assess your suitability for treatment, you will be asked to complete a short medical questionnaire at the next
            step.
          </p>
        </div>

        {/* Desktop View: Side-by-Side */}
        <div className="hidden lg:grid bg-white p-6 rounded-lg shadow-lg grid-cols-2 gap-6 w-full max-w-5xl">
          <div className="border-r border-gray-500 pr-4">
            <Register />
          </div>
          <div className="pl-4">
            <Login />
          </div>
        </div>

        {/* Mobile View: Tab Switcher */}
        <div className="bg-white lg:hidden mx-auto py-8 shadow-lg rounded-xl w-full max-w-md mt-6">
          {/* Tab Switcher */}
          <div className="flex justify-center mb-6">
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
          {selectedTab === "tab2" && <Login />}
        </div>

        <div class="my-3">
          <p class="mt-0 p-0 pb-4 text-center text-gray-600 text-xs px-2">© 2025 Mayfair Weight loss Clinic. All Rights Reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Welcome;
