import React from "react";

import { FaInstagram } from "react-icons/fa6";


function Footer() {
  return (
    <div className="border-t border-solid border-gray-300 px-4 sm:px-8 lg:px-20 xl:px-44 py-4">
      <div className="container flex flex-col sm:flex-row justify-between items-center sm:items-end">
        <span className="text-xs text-gray-500">&copy; 2024, lilas</span>
        <a href="#">
          <span className="text-2xl text-gray-500 mt-4 sm:mt-0">
            <FaInstagram className="hover:scale-105" />
          </span>
        </a>
      </div>
    </div>
  );
}

export default Footer;
