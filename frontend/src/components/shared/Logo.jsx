import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/expenselogo.png";

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="logo" className="h-16" />
    </Link>
  );
};

export default Logo;
