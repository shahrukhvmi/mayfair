import React, { useEffect, useState } from "react";
import Stepone from "./formsteps/Stepone";
import Steptwo from "./formsteps/Steptwo";
import Stepthree from "./formsteps/Stepthree";
import Stepfour from "./formsteps/Stepfour";
import Stepfive from "./formsteps/Stepfive";
import Stepsix from "./formsteps/Stepsix";
import Stepseven from "./formsteps/Stepseven";
import Stepeight from "./formsteps/Stepeight";
import Stepnine from "./formsteps/Stepnine";
import Stepten from "./formsteps/Stepten";
import Stepeleven from "./formsteps/Stepeleven";
import Steptwelve from "./formsteps/Steptwelve";
import { useDispatch, useSelector } from "react-redux";
const Steps = () => {


  const currentStep = useSelector((state) => state.step?.currentStep);
  const currentSteps = JSON.parse(localStorage.getItem("currentStep"))
  const renderStep = () => {

    switch (currentStep) {
      case 1:
        return <Stepone />;
      case 2:
        return <Steptwo />;
      case 3:
        return <Stepthree />;
      case 4:
        return <Stepfour />;
      case 5:
        return <Stepfive />;
      case 6:
        return <Stepsix />;
      case 7:
        return <Stepseven />;
      case 8:
        return <Stepeight />;
      case 9:
        return <Stepnine />;
      case 10:
        return <Stepten />;
      case 11:
        return <Stepeleven />;
      case 12:
        return <Steptwelve />;
      default:
        return <Stepone />;
    }
  };
  return <div >{renderStep()}</div>
};

export default Steps;
