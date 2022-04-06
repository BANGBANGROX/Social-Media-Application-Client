import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

// Context
import { AuthContext } from "../context/auth";

const MenuBar = () => {
  const { userData, logout } = useContext(AuthContext);
  //console.log(userData);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substring(1);
  console.log(path);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = userData ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={userData.username} active as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item
          name="logout"
          active={activeItem === "logout"}
          onClick={() => {
            logout();
            setActiveItem("home");
          }}
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
};

export default MenuBar;
