import React from "react";
import { Progress } from "flowbite-react";
import { useSelector } from "react-redux";
import ProgressBar from "./ProgressBar";

export default function Stepper() {
  const progress = useSelector((state) => state.step.progress);
  return (
    <div
      className="stepper-wrapper | bg-gray-100 px-4 py-2 md:px-5 md:py-3 lg:px-8 lg:py-4 m-0 lg:m-2 rounded-tl-md rounded-tr-md lg:rounded-md w-full lg:w-auto fixed z-40 bottom-0 left-0 lg:relative"
      //   style={{
      //     display: animatedProgress === 100 ? "hidden" : "", // Set height to 0 when animatedProgress is 100
      //   }}
    >
      <div className="stepper |  gap-4 hidden">
        <div className="stepper-item | flex text-sm transition-colors duration-700">Step 1</div>
        <div className="stepper-item | flex text-sm transition-colors duration-700">Step 2</div>
        <div className="stepper-item | flex text-sm transition-colors duration-700">Step 3</div>
        <div className="stepper-item | flex text-sm transition-colors duration-700">Step 4</div>
        <div className="stepper-item | flex text-sm transition-colors duration-700">Step 5</div>
        <div className="stepper-item | flex text-sm transition-colors duration-700">Step 6</div>
      </div>
      <div className="progress-wrapper | flex flex-col gap-1 lg:flex-row lg:gap-8">
        <div className="progress-bar | w-full lg:w-3/4 xl:w-4/5 mt-2">
          {/* <Progress progress={progress} size="sm" className="[&>div]:bg-violet-700" /> */}
          <ProgressBar className="[&>div]:bg-violet-700" />
        </div>
        <div className="progress | text-gray-500 text-sm">
          {/* {animatedProgress.toFixed(0)}% complete */}
          <div className="progress | text-gray-500 text-sm">{progress.toFixed(0)}% complete</div>
        </div>
      </div>
    </div>
  );
}
