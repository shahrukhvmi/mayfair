import React from "react";
import { FaCheck } from "react-icons/fa";

const DynamicRadioButton = ({ name, label, terms, register, isChecked }) => {
  return (
    <div className="rounded-md border-[#d1d5db] border-2 p-4 sm:p-2 w-full my-3">
      <div className="space-y-3">
        <div className="flex sm:items-center  items-start space-x-3">
          <div className="relative">
            {/* Register Input with React Hook Form */}
            <input
              type="checkbox"
              id={name}
             
              {...register} // Use react-hook-form register
              className="hidden"
            />
            <div
              className={`w-5 h-5 border-2 rounded-full cursor-pointer ${
                isChecked
                  ? "bg-[#6d28d9] border-[#6d28d9] p-1"
                  : "bg-white border-gray-400"
              } transition duration-300`}
            >
              {isChecked && (
                <div className="w-full h-full flex items-center justify-center">
                  <FaCheck color="#fff" />
                </div>
              )}
            </div>
          </div>
          <label htmlFor={name} className="reg-font text-sm sm:text-md cursor-pointer">
            {label}
          </label>
        </div>

        {/* Render HTML Checklist */}
        {terms && (
          <div
            className="dynamic-content text-sm text-gray-700 mt-4 prose"
            dangerouslySetInnerHTML={{ __html: terms }}
          />
        )}
      </div>
    </div>
  );
};

export default DynamicRadioButton;
