import logo from "../assets/images/logo.png";
import { useState } from "react";
import NavLinks from "./NavLinks";
import NavbarProfile from "./NavbarImage";
import { adminLinks, userLinks } from "../config/navLinks";

function ProfileNavbar({ role = "user" }) {
  const [isOpen, setIsOpen] = useState(false);

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white print:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <img src={logo} alt="Tickitz" className="h-10 w-auto" />

        <div className="hidden md:block">
          <NavLinks links={links} />
        </div>

        <div className="flex items-center gap-4">
          <NavbarProfile />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1.5 md:hidden"
          >
            <div className="h-1 w-6 bg-slate-700"></div>
            <div className="h-1 w-6 bg-slate-700"></div>
            <div className="h-1 w-6 bg-slate-700"></div>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 md:hidden">
          <NavLinks links={links} mobile />
        </div>
      )}
    </nav>
  );
}

export default ProfileNavbar;
