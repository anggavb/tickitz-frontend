import React from 'react';
import ProfileNavbar from '../components/ProfileNavbar';
import { Outlet } from 'react-router';

function AdminLayout() {
  return (
    <>
      <ProfileNavbar role="admin" />
      <Outlet />
    </>
  );
}

export default AdminLayout;
