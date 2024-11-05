import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the import based on your file structure

const ProtectedLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {/* You can include Navbar or any other components here */}
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
