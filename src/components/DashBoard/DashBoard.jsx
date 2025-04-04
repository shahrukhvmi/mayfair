import React, { useState } from "react";
import Sidebar from "./SideBar";
import Navbar from "./Navbar";

const Dashboard = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-1 h-screen overflow-auto bg-[#f3f4f6]">
      {/* Navbar (full width) */}
      <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="grid sm:grid-cols-[auto_1fr] lg:grid-cols-[23rem_1fr] 2xl:grid-cols-[31rem_1fr] h-full pt-5 sm:pe-8">
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className="rounded-md">{children}</div>
      </div>
    </div>
  );
};

export default Dashboard;
