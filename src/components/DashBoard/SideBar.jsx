import React from "react";
import { NavLink } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { HiLocationMarker, HiOutlineLockClosed, HiShoppingBag, HiUser } from "react-icons/hi";
import { GiMedicines } from "react-icons/gi";
import "./sidebar.css"
const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`sm:m-5 fixed top-0 left-0 lg:relative h-full w-64 bg-[#F9FAFB] p-5 flex flex-col shadow-md transform ${isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 sm:relative sm:translate-x-0 sm:w-64`}
    >
      <div className="flex justify-between p-1 mb-3 md:hidden">
        <div>
          <img src="/logo.png" alt="logo" />
        </div>

        <div className="align-middle ms-2 pt-2 text-2xl text-[#4565BF]" onClick={toggleSidebar}>
          <FiX size={30} />
        </div>
      </div>

      <nav className="space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-md  font-bold tab-home ${isActive ? "bg-[#4565BF] text-white active-tab" : "hover:bg-gray-200 text-[#000000] "}`
          }
          onClick={toggleSidebar}
        >
          <GiMedicines className="text-2xl" />
          <span className="ml-2 sm:inline tab-text-home">My Account</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-md  font-bold tab-orders ${isActive ? "bg-[#4565BF] text-white active-tab" : "hover:bg-gray-200 text-[#000000] "}`
          }
          onClick={toggleSidebar}
        >
          <HiShoppingBag className="text-2xl" />
          <span className="ml-2 sm:inline tab-text-orders">My Orders</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-md  font-bold tab-profile ${isActive ? "bg-[#4565BF] text-white active-tab" : "hover:bg-gray-200 text-[#000000] "}`
          }
          onClick={toggleSidebar}
        >
          <HiUser className="text-2xl" />
          <span className="ml-2 sm:inline tab-text-profile">My Profile</span>
        </NavLink>

        <NavLink
          to="/address"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-md  font-bold tab-address ${isActive ? "bg-[#4565BF] text-white active-tab" : "hover:bg-gray-200 text-[#000000] "}`
          }
          onClick={toggleSidebar}
        >
          <HiLocationMarker className="text-2xl" />
          <span className="ml-2 sm:inline tab-text-address">My Address Book</span>
        </NavLink>

        <NavLink
          to="/change-password"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-md  font-bold tab-password ${isActive ? "bg-[#4565BF] text-white active-tab" : "hover:bg-gray-200 text-[#000000] "}`
          }
          onClick={toggleSidebar}
        >
          <HiOutlineLockClosed className="text-2xl" />
          <span className="ml-2 sm:inline tab-text-password">Change Password</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
