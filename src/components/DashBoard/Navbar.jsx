import React, { useState, useEffect, useContext } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, redirect, useNavigate } from "react-router-dom";
// import { logout } from "../../store/services/Auth/authSlice";
import { AuthContext } from "../../Auth/AuthContext";
import ApplicationLogo from "../../config/ApplicationLogo";
import ApplicationUser from "../../config/ApplicationUser";

const Navbar = ({ isOpen, toggleSidebar }) => {
  const [isOpenDrop, setIsOpenDrop] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [name, setUserData] = useState("");

  // Fetch user profile data
  const fetchUserData = async () => {
    try {
      const response = await fetch("https://app.mayfairweightlossclinic.co.uk/api/profile/GetUserData", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        const userName = data?.profile?.user;
        setUserData(userName == null ? "" : userName);
      }
    } catch (error) { }
  };
  useEffect(() => {
    // Fetch data immediately on mount
    fetchUserData();
  }, []);


  const toggleDropdown = () => {
    setIsOpenDrop((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownMenu = document.querySelector(".dropdown-menu");
      if (dropdownMenu && !dropdownMenu.contains(event.target)) {
        setIsOpenDrop(false);
      }
    };

    if (isOpenDrop) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenDrop]);
  const handleLogout = () => {
    setIsOpenDrop(false); // Close the dropdown
    logout();
   
  };
  const handleRemovePid = () => {
    localStorage.removeItem("previous_id")
  }
  const [impersonat, setImpersonat] = useState(null);

  useEffect(() => {
    const impersonateEmail = localStorage.getItem("impersonate_email");
    setImpersonat(impersonateEmail);
  }, []);

  const handleRemovedImpersonate = () => {
    // window.location.href = "https://app.mayfairweightlossclinic.co.uk/admin";
    
    setImpersonat(null);
    logout();

  };
  return (

    <>
      {impersonat &&
        <div class="bg-gray-100">
          <div class="bg-red-500 text-white text-center p-2 flex justify-center items-center gap-2">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H8v-1.5c0-1.99 4-3 6-3s6 1.01 6 3V16z"></path></svg>
            You are impersonating another user.
            <button class="ml-2 underline flex items-center gap-2" onClick={handleRemovedImpersonate}>
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H8v-1.5c0-1.99 4-3 6-3s6 1.01 6 3V16z"></path></svg>

              Stop Impersonation

            </button>
          </div>
        </div>
      }

      <div className="bg-white px-4 sm:px-6 lg:px-6 flex items-center justify-between relative">
        {/* Hamburger Button (only visible on mobile) */}
        <button onClick={toggleSidebar} className="text-2xl text-violet-700 sm:hidden">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Logo */}
        <div className="w-32 sm:w-40">
          <Link to="/dashboard/" onClick={handleRemovePid}>
            {/* <img src="/logo.svg" className="w-32 sm:w-40" alt="Logo" /> */}
            <ApplicationLogo className="w-32 sm:w-40" />
          </Link>
        </div>

        {/* User Info */}
        <div className="relative">
          {/* Dropdown Trigger */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
            {/* <img src="/images/user.png" alt="User Avatar" className="w-10 h-10 rounded-full" /> */}
            <ApplicationUser className="w-10 h-10 rounded-full" />
            <span className="reg-font text-[#1C1C29] truncate">{name && name.fname && name.lname ? `${name.fname} ${name.lname}` : ""}</span>
          </div>

          {/* Dropdown Menu */}
          {isOpenDrop && (
            <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <ul className="py-1">
                <li className="ligt-font px-4 py-2 text-[#1C1C29] hover:bg-gray-100 cursor-pointer">
                  <Link to="/dashboard/" onClick={toggleDropdown}>My Account</Link>
                </li>
                <li className="ligt-font px-4 py-2 text-[#1C1C29] hover:bg-gray-100 cursor-pointer">
                  <Link to="/profile/" onClick={toggleDropdown}>
                    My Profile
                  </Link>
                </li>
                <li className="reg-font px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
