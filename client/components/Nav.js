import React from "react";
import {Route, Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav-bar">

      <Link to="/">Index</Link>
      <Link to="/new">Create</Link>

    </div>
  );
};



export default Nav;
