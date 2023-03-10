import React from "react";

import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const isSignin = localStorage.getItem("token");

  return isSignin ? <Outlet /> : <Navigate to="/login" />;
}
