import type { RootState } from "@/Store/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRouteProtect({ children }: { children: React.JSX.Element }) {
  const { user } = useSelector((state: RootState) => state.Auth);
  console.log("user AdminRouteProtect", user);

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}

export default AdminRouteProtect;
