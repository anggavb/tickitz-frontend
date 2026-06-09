import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/ProfileNavbar';

function ProfileLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default ProfileLayout;
