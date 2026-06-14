import React, { useEffect } from "react";
import ProfileNavbar from "../components/ProfileNavbar";
import { Outlet, useNavigate } from "react-router";
import { useSelector } from "react-redux";

function AdminLayout() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user, isAuthenticated);
    if (user?.role !== "admin" || !isAuthenticated) {
      navigate("/auth/signin", { replace: true });
    }
  }, [isAuthenticated, navigate, user]);
  return (
    <>
      <ProfileNavbar role="admin" />
      <Outlet />
    </>
  );
}

export default AdminLayout;
