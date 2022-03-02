import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../css/Nav.css";

function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/" className="buttonNav">
        Log out
      </NavLink>
      <NavLink to="/countries" className="buttonNav">
        Home
      </NavLink>
      <NavLink to="/countries/addactivity" className="buttonNav">
        Add activity
      </NavLink>
      <SearchBar className="searchBar" />
    </nav>
  );
}

export default Nav;
