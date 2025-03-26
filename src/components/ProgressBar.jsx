import React from "react";
import { useSelector } from "react-redux";

const ProgressBar = () => {
  const progress = useSelector((state) => state.step.progress);

  // const progress = 20;
  return (
    <div className="w-full bg-gray-200 rounded-full h-1 ">
      <div className="bg-violet-700 h-1 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
