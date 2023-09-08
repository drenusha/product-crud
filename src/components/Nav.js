import React from "react";
import { Button } from "antd";
import "./Nav.css";
import "antd/dist/reset.css";
import { useNavigate } from "react-router-dom";
import AuthUser from './AuthUser';

const Nav = () => {
  const navigate = useNavigate();
  const { token, logout } = AuthUser();

  const logoutUser = () => {
    if (token != undefined) {
      logout();
      navigate("/");
    }
  }

  return (
    <div className="site-page-header-ghost-wrapper">
      <Button type="link" onClick={logoutUser}>
        Log Out
      </Button>
    </div>
  );
};

export default Nav;
