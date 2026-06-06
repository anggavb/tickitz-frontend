import React from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    // Replaced bg-white with bg-mainbg, and fixed inset-s-0 to inset-x-0
    <nav className="bg-mainbg dark:bg-gray-900 sticky w-full z-20 top-0 inset-x-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-5">
        {/* Logo/Brand */}
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-9 w-auto" alt="Logo" />
        </a>

        {/* Action Buttons */}
        <div className="flex gap-1 md:order-2 space-x-4 md:space-x-0 rtl:space-x-reverse items-center">
          {/* Login: Ghost button using primary color text/border */}
          <button
            type="button"
            className="text-primary bg-transparent hover:bg-primary hover:text-white focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-base px-5 py-2.5 text-center border border-primary dark:text-white dark:hover:bg-primary"
          >
            Login
          </button>
          {/* Sign Up: Solid button using primary color background */}
          <button
            type="button"
            className="text-white bg-primary hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-base px-5 py-2.5 text-center dark:focus:ring-orange-800"
          >
            Sign Up
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-11 h-11 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-7 h-7"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          {/* Changed mobile menu background to bg-mainbg or transparent for desktop */}
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium text-lg border border-gray-100 rounded-lg bg-mainbg md:space-x-10 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white bg-primary rounded md:bg-transparent md:text-primary md:p-0 md:dark:text-primary font-semibold"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
