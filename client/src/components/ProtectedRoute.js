import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// This component is designed to protect certain routes by checking if the user is authenticated and has the correct user type.
// If the user is not authenticated or has the wrong user type, they will be redirected to the login page.

const ProtectedRoute = ({ children }) => {
  // Check if there is a token in the local storage, which indicates that the user is authenticated.
  const isAuthenticated = localStorage.getItem("token");

  // Get the user type from local storage.
  const user = localStorage.getItem("userType");

  // Get the current location to determine where the user tried to access.
  let location = useLocation();

  // If the user is not authenticated or has the user type "user," redirect them to the login page.
  if (!isAuthenticated || user !== "user") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is authenticated and has the correct user type, render the children components (the protected content).
  return children;
};

export default ProtectedRoute;
