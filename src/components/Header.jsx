import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdEmail } from "react-icons/md";
import { logout } from '../store/services/Auth/authSlice';
import { AuthContext } from '../Auth/AuthContext';

const Header = () => {

  const [isOpenDrop, setIsOpenDrop] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch user profile data
  const [name, setUserData] = useState("");

  // Call fetchUserData on mount
  const fetchUserData = async () => {
    try {
      const response = await fetch(
        "https://app.mayfairweightlossclinic.co.uk/api/profile/GetUserData",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const userName = data?.profile?.user;
        setUserData(userName == null ? "" : userName);
      }
    } catch (error) {
    }
  };
  useEffect(() => {
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

  // Check if the current route is login or register
  const isAuth =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/change-forgot-password";

  const handleLogout = () => {
    setIsOpenDrop(false);
    logout();
    navigate("/login");
  };


  return (
    <div className={`bg-white ${isAuth ? " py-4 sm:py-8" : "p-4"}  flex items-center justify-around sm:justify-between relative`}>
      {/* Logo - Centered, Only visible on non-login/register pages */}
      {!isAuth && (
        <a className="text-base items-center space-x-1 hidden lg:flex reg-font" href="">
          <MdEmail size="30" className="me-2 mb-0 text-[#5b45a7]" />
          contact@weightlosspharmacy.co.uk
        </a>
      )}


      <div className="sm:absolute sm:left-1/2 transform sm:-translate-x-1/2">
        <Link to="/">
          <img src="/logo.svg" className="w-36 sm:w-36" alt="Logo" />
        </Link>
      </div>

      {/* User Info (Dropdown) - Aligned to the right, Only visible on non-login/register pages */}
      {!isAuth && (
        <div className="relative ml-auto">
          {/* Dropdown Trigger */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>

            <img
              src="/images/user.png"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />

            <span className="reg-font text-[#1C1C29] truncate">
              {name && name.fname && name.lname
                ? `${name.fname} ${name.lname}`
                : ""}
            </span>
          </div>

          {/* Dropdown Menu */}
          {isOpenDrop && (
            <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <ul className="py-1 list-none">
                <Link to="/" onClick={toggleDropdown}><li className="ligt-font px-4 py-2 text-[#1C1C29] hover:bg-gray-100 cursor-pointer">
                  My Account
                </li>
                </Link>
                <Link to="/profile" onClick={toggleDropdown}><li className="ligt-font px-4 py-2 text-[#1C1C29] hover:bg-gray-100 cursor-pointer">
                  My Profile
                </li></Link>
                <li
                  className="reg-font px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
