import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const { maintenanceMode } = useSelector((state) => state.token);
  return maintenanceMode ? children : <Navigate to="/home" />;
};

export default PublicRoute;
