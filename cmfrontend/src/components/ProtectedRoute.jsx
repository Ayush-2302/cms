import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { token } from "../apiService/authService";

// console.log(token);

const ProtectedRoute = ({ children }) => {
  if (!token) {
    toast.warn("Please log in to continue");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
