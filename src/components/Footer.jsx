import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";


function Footer() {
  return (
    <div className="border-t border-solid border-gray-300 px-44 py-4">
      <div className="container flex justify-between items-end">
        <span className="text-xs text-gray-500">&copy; 2024,lilas</span>
        <a href="https://www.instagram.com/ahmedyaser_30?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
          <span className="text-2xl text-gray-500">
            <FaInstagram className="hover:scale-105" />
          </span>
        </a>
      </div>
    </div>
  );
}

export default Footer;
