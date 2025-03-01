// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
