import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ element }) => {

  
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-lg font-medium"></div>
      </div>
    );
  }

  return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
