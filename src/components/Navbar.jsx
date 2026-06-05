import logo from "../assets/images/logo1.png";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <img src={logo} alt="Tickitz" className="h-10 w-auto" />

        {/* Menu Desktop */}
        <div className="hidden gap-12 text-sm text-slate-700 md:flex">
          <a href="#">Home</a>
          <a href="#">Movie</a>
          <a href="#">Buy Ticket</a>
        </div>

        {/* Buttons Desktop */}
        <div className="hidden gap-3 md:flex">
          <button className="rounded border border-blue-600 px-5 py-2 text-sm text-blue-600">
            Sign In
          </button>
          <button className="rounded bg-blue-600 px-5 py-2 text-sm text-white">
            Sign Up
          </button>
        </div>

        {/* Hamburger Menu Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <div className="h-1 w-6 bg-slate-700"></div>
          <div className="h-1 w-6 bg-slate-700"></div>
          <div className="h-1 w-6 bg-slate-700"></div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 md:hidden">
          <div className="mb-4 flex flex-col gap-3 text-sm text-slate-700">
            <a href="#">Home</a>
            <a href="#">Movie</a>
            <a href="#">Buy Ticket</a>
          </div>
          <div className="flex flex-col gap-2">
            <button className="rounded border border-blue-600 px-5 py-2 text-sm text-blue-600">
              Sign In
            </button>
            <button className="rounded bg-blue-600 px-5 py-2 text-sm text-white">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;