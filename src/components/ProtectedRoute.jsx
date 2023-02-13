import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();
  const notify = () => {
    toast.warn(
      "Morate biti prijavljeni kako bi ste pristupili ovoj stranici! 🔒",
      {
        toastId: "MustBeLoggedIn",
      }
    );
  };
  if (!user) {
    notify();
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
