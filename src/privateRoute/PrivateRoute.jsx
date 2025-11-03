import React, { use } from "react";
import { AuthContext } from "../provider/AuthContext";
import { Navigate, useLocation } from "react-router";
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location= useLocation();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[97vh]">
        <FadeLoader />
      </div>
    );
  }
  if (!user) {
    toast.error('You have not logged in yet.Please log in first.')
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
