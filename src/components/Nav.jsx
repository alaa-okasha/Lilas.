import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { auth } from "../config/Confij.jsx";
import { useNavigate } from "react-router-dom";


function Nav({ user, totalProducts }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <>
      <div className=" sticky top-0 flex flex-row justify-between px-4 sm:px-8 lg:px-32 py-4 lg:py-8 w-full bg-white shadow-md z-50">
        <div>
          <Link to={"/"}>
            <span className="font-playwrite text-4xl sm:text-5xl lg:text-7xl">
              lilas
            </span>
          </Link>
        </div>

        <div className="flex flex-row space-x-2 sm:space-x-4 text-xl sm:text-2xl pt-2 sm:pt-3">
          <div className="flex flex-row space-x-2 sm:space-x-4 pt-1 sm:pt-2">
            <span>
              <CiSearch className="hover:scale-110" />
            </span>
            <Link to="/cart" className="relative">
              <span>
                <HiOutlineShoppingBag className="hover:scale-110" />
              </span>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 sm:px-2 py-0.5 sm:py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
                {totalProducts}
              </span>
            </Link>
          </div>

          {!user && (
            <>
              <div className="flex flex-row space-x-2 sm:space-x-4">
                <Link
                  to="/login"
                  className="flex flex-col justify-center lg:pb-4"
                >
                  <div className="text-gray-500 text-xs sm:text-sm font-poppins">
                    Login
                  </div>
                </Link>
                <Link
                  to="/signup"
                  className="flex flex-col justify-center lg:pb-4"
                >
                  <div className="text-gray-500 text-xs sm:text-sm font-poppins">
                    Sign Up
                  </div>
                </Link>
              </div>
            </>
          )}

          {user && (
            <>
              <div className="flex flex-row space-x-2 sm:space-x-4 pb-3 lg:pb-5">
                <div className="text-gray-500 text-xs sm:text-sm font-poppins flex flex-col justify-center">
                  {user}
                </div>

                <button
                  className="text-red-600 text-xs sm:text-sm font-poppins"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Nav;
