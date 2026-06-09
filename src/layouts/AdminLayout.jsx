import React from 'react';
import ProfileNavbar from '../components/ProfileNavbar';
import { Outlet } from 'react-router';

function AdminLayout() {
  // nanti disini pengecekkan role
  // const {user} = useSelector(state => state.auth)
  // if user.role !== 'admin' navigate to user profile
  return (
    <>
      <ProfileNavbar role="admin" />
      <Outlet />
    </>
  );
}

export default AdminLayout;
