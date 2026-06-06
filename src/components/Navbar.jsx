import logo from "../assets/images/logo.png";
import { useState } from "react";
import NavLinks from "./HomeNavLinks";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        {/* Logo */}
        <img src={logo} alt="Tickitz" className="h-10 w-auto" />

        {/* Menu Desktop */}
        <div className="hidden md:block">
          <NavLinks />
        </div>

        {/* Buttons Desktop */}
        <div className="hidden gap-3 md:flex">
          <button className="rounded border border-primary px-5 py-2 text-sm text-primary">
            Sign In
          </button>
          <button className="rounded bg-primary px-5 py-2 text-sm text-white">
            Sign Up
          </button>
        </div>

        {/* Hamburger Menu Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <div className="h-1 w-6 bg-slate-700"></div>
          <div className="h-1 w-6 bg-slate-700"></div>
          <div className="h-1 w-6 bg-slate-700"></div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 md:hidden">
          <div className="mb-4">
            <NavLinks mobile />
          </div>

          <div className="flex flex-col gap-2">
            <button className="rounded border border-primary px-5 py-2 text-sm text-primary">
              Sign In
            </button>
            <button className="rounded bg-primary px-5 py-2 text-sm text-white">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;