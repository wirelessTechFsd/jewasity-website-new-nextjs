import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { maintenanceMode } = useSelector((state) => state.token);
  return !maintenanceMode ? children : <Navigate to="/maintenance-mode" />;
};

export default PrivateRoute;
