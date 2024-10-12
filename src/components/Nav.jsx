import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { auth } from "../config/Confij.jsx";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart.jsx";

function Nav({ user, totalProducts }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <>
      <div className="container sticky top-0 flex flex-row justify-evenly py-8 w-full bg-white shadow-md z-40">
        <div>
          <Link to={"/"}>
            <span className="font-playwrite text-7xl">lilas</span>
          </Link>
        </div>
        <div>
          <ul className="flex flex-row space-x-8 pt-6 text-gray-500 text-sm font-poppins">
            <Link to="/">
              <li className="hover:underline">Home</li>
            </Link>
            <Link>
              <li className="hover:underline">Contact</li>
            </Link>
          </ul>
        </div>
        <div className="flex flex-row space-x-4 text-2xl pt-3">
          <div className="flex flex-row space-x-4 pt-2">
            <span>
              <CiSearch className="hover:scale-110" />
            </span>
            <Link to="/cart" className="relative">
              <span>
                <HiOutlineShoppingBag className="hover:scale-110" />
              </span>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
                {totalProducts}
              </span>
            </Link>
          </div>

          {!user && (
            <>
              <div className="flex flex-row space-x-4">
                <Link to="/login">
                  <span className="text-gray-500 text-sm font-poppins">
                    Login
                  </span>
                </Link>
                <Link to="/signup">
                  <span className="text-gray-500 text-sm font-poppins">
                    Sign Up
                  </span>
                </Link>
              </div>
            </>
          )}
          {user && (
            <>
              <div className="flex flex-row space-x-4 pb-5">
                <Link to="/">
                  <span className="text-gray-500 text-sm font-poppins">
                    {user}
                  </span>
                </Link>
                <button
                  className="text-red-600 text-sm font-poppins"
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
