import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-bar-outer-container">
      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      )}
      <NavLink className="nav-bar-nav-link" exact to="/">
        <i class="fa-solid fa-house-chimney"></i>
      </NavLink>
      <NavLink className="nav-bar-nav-link" exact to="/tasks/all">
        <i class="fa-solid fa-list-check"></i>
      </NavLink>
    </div>
  );
}

export default Navigation;
