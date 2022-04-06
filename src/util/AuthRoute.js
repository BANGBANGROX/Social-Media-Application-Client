import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

// Context
import { AuthContext } from "../context/auth";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { userData } = useContext(AuthContext);
  //console.log(userData);

  return userData ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRoute;
