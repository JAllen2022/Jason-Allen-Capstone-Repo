import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showProfDiv, setShowProfDiv] = useState(true);

  return (
    <div className="nav-bar-outer-container">
      {isLoaded && (
        <>
          <div className="top-nav-bar-container">
            <div className="nav-item">
              <div className="nav-button">
                <ProfileButton
                  user={sessionUser}
                  showProfDiv={showProfDiv}
                  setShowProfDiv={setShowProfDiv}
                />
              </div>
              {showProfDiv && (
                <div className="nav-popup-profile">
                  <span>Profile</span>
                </div>
              )}
            </div>

            <div className="nav-item">
              <NavLink className="nav-button" exact to="/">
                <i className="fa-solid fa-house-chimney"></i>
              </NavLink>
              <div className="nav-popup">
                <span>Planner</span>
              </div>
            </div>
            <div className="nav-item">
              <NavLink className="nav-button" exact to="/tasks">
                <i className="fa-solid fa-list-check"></i>
              </NavLink>
              <div className="nav-popup">
                <span>Daily Tasks</span>
              </div>
            </div>
            <div className="nav-item">
              <NavLink className="nav-button" exact to="/goals">
                <i className="fa-solid fa-bullseye"></i>
              </NavLink>
              <div className="nav-popup">
                <span>Goals</span>
              </div>
            </div>
            <div className="nav-item">
              <NavLink className="nav-button" exact to="/reflections">
                <i className="fa-solid fa-book-open"></i>
              </NavLink>
              <div className="nav-popup">
                <span>Reflections</span>
              </div>
            </div>
            <div className="nav-item">
              <NavLink className="nav-button" exact to="/journal">
                <i class="fa-solid fa-book"></i>
              </NavLink>
              <div className="nav-popup">
                <span>Journal</span>
              </div>
            </div>
          </div>
          <div className="developer-info-nav-bottom ">
            <div className="nav-item">
              <div className="nav-button-dev ">
                <a href="https://github.com/JAllen2022" target="_blank">
                  <i
                    style={{ color: "#e0dfdf" }}
                    className="fa-brands fa-github"
                  ></i>
                </a>
              </div>
              <div className="nav-popup-dev">
                <span>Developer Info</span>
              </div>
            </div>
            <div className="nav-item">
              <div className="nav-button-dev">
                <a
                  href="https://www.linkedin.com/in/jasonallen715/"
                  target="_blank"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </div>
              <div className="nav-popup-dev">
                <span>Developer Info</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Navigation;
