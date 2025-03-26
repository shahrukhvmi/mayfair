import React from "react";
import Header from "../../components/Header";
import ProgressBar from "../../components/ProgressBar";
import Footer from "../../components/Footer";

const StepsLayout = ({ children }) => (
  <>
    <Header />
    {/* <ProgressBar /> */}
    <main>{children}</main>
    {/* <Footer /> */}
  </>
);

export default StepsLayout;
