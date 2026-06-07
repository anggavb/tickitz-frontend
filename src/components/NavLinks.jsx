import { NavLink } from "react-router-dom";

function NavLinks({ links = [], mobile = false }) {
  return (
    <div
      className={
        mobile
          ? "flex flex-col gap-3 text-sm"
          : "flex gap-12 text-sm"
      }
    >
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.href}
          className={({ isActive }) =>
            `transition-colors hover:text-primary ${
              isActive
                ? "font-semibold text-primary"
                : "text-slate-700"
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
}

export default NavLinks;