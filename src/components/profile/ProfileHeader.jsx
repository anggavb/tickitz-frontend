import React from 'react';
import { Link, NavLink } from 'react-router';

function ProfileHeader() {
  return (
    <header className="bg-white py-4 md:py-6 rounded-2xl px-4 md:px-10">
      <nav className="flex md:gap-10 overflow-x-auto no-scrollbar">
        <NavLink
          to="/profile/setting"
          className={({ isActive }) =>
            `flex-1 md:flex-none text-center whitespace-nowrap pb-2 border-b-2 text-sm md:text-base transition ${
              isActive ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500'
            }`
          }
        >
          Account Settings
        </NavLink>

        <NavLink
          to="/profile/history"
          className={({ isActive }) =>
            `flex-1 md:flex-none text-center whitespace-nowrap pb-2 border-b-2 text-sm md:text-base transition ${
              isActive ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500'
            }`
          }
        >
          Order History
        </NavLink>
      </nav>
    </header>
  );
}

export default ProfileHeader;
