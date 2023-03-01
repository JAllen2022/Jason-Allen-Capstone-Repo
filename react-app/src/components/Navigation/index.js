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
            <div class="nav-item">
              <div class="nav-button">
                <ProfileButton
                  user={sessionUser}
                  showProfDiv={showProfDiv}
                  setShowProfDiv={setShowProfDiv}
                />
              </div>
              {showProfDiv && (
                <div class="nav-popup-profile">
                  <span>Profile</span>
                </div>
              )}
            </div>

            <div class="nav-item">
              <NavLink className="nav-button" exact to="/">
                <i class="fa-solid fa-house-chimney"></i>
              </NavLink>
              <div class="nav-popup">
                <span>Planner</span>
              </div>
            </div>
            <div class="nav-item">
              <NavLink className="nav-button" exact to="/tasks">
                <i class="fa-solid fa-list-check"></i>
              </NavLink>
              <div class="nav-popup">
                <span>Daily Tasks</span>
              </div>
            </div>
            <div class="nav-item">
              <NavLink className="nav-button" exact to="/goals">
                <i class="fa-solid fa-bullseye"></i>
              </NavLink>
              <div class="nav-popup">
                <span>Goals</span>
              </div>
            </div>
            <div class="nav-item">
              <NavLink className="nav-button" exact to="/reflections">
                <i class="fa-solid fa-book-open"></i>
              </NavLink>
              <div class="nav-popup">
                <span>Reflections</span>
              </div>
            </div>
          </div>
          <div className="developer-info-nav-bottom ">
            <div className="nav-item">
              <div className="nav-button-dev ">
                <a href="https://github.com/JAllen2022">
                  <i
                    style={{ color: "#color: #e0dfdf;" }}
                    class="fa-brands fa-github"
                  ></i>
                </a>
              </div>
              <div class="nav-popup-dev">
                <span>Developer Info</span>
              </div>
            </div>
            <div className="nav-item">
              <div className="nav-button-dev">
                <a href="https://www.linkedin.com/in/jasonallen715/">
                  <i class="fa-brands fa-linkedin"></i>
                </a>
              </div>
              <div class="nav-popup-dev">
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
