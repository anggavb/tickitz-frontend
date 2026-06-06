import React from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="sticky inset-x-0 top-0 z-20 w-full border-b border-gray-100 bg-white md:bg-mainbg dark:border-gray-600 dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-6 md:py-5">
        <a href="#" className="flex items-center">
          <img src={logo} className="h-8 w-auto md:h-9" alt="Tickitz Logo" />

          <span className="hidden self-center whitespace-nowrap text-2xl font-bold text-gray-900 md:inline dark:text-white">
            Tickitz
          </span>
        </a>

        <div className="hidden md:flex md:items-center md:gap-10">
          <a
            href="#"
            className="font-semibold text-primary transition hover:opacity-80"
          >
            Home
          </a>
          <a
            href="#"
            className="font-medium text-gray-900 transition hover:text-primary dark:text-white"
          >
            Movie
          </a>
          <a
            href="#"
            className="font-medium text-gray-900 transition hover:text-primary dark:text-white"
          >
            Buy Ticket
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            className="rounded-lg border border-primary bg-transparent px-5 py-2.5 text-base font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            Login
          </button>

          <button
            type="button"
            className="rounded-lg bg-primary px-5 py-2.5 text-base font-semibold text-white transition hover:opacity-90"
          >
            Sign Up
          </button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Open menu"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 7h16M4 12h16M4 17h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
