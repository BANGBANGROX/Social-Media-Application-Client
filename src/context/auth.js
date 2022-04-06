import { createContext, useReducer } from "react";
import { LOGIN, LOGOUT } from "./config";
import jwtDecode from "jwt-decode";

const initialState = {
  userData: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  //console.log(decodedToken);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.userData = decodedToken;
  }
}

const AuthContext = createContext({
  userData: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userData: action.payload,
      };
    case LOGOUT:
      return { ...state, userData: null };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({ type: LOGIN, payload: userData });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{ userData: state.userData, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
