import logo from "../assets/images/logo.png";
import { useState } from "react";
import NavLinks from "./NavLinks";
import NavbarAuthButtons from "./NavbarAuthButtons";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const homeLinks = [
    { name: "Home", href: "/" },
    { name: "Movie", href: "/movies" },
    { name: "Buy Ticket", href: "/tickets" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        {/* Logo */}
        <img src={logo} alt="Tickitz" className="h-10 w-auto" />

        {/* Menu Desktop */}
        <div className="hidden md:block">
          <NavLinks links={homeLinks} />
        </div>

        <NavbarAuthButtons />

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
            <NavLinks links={homeLinks} mobile />
          </div>

          <NavbarAuthButtons mobile />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
