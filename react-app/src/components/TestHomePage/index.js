import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import HomePageNotebook from "../../Assets/HomePageNotebook";
import SplashSlider from "./SplashPageSlider";
import "./TestHomePage.css";
import Logo from "../../Assets/Logo";

export default function TestHomePage() {
  const [showMenu, setShowMenu] = useState(false);

  const ulRef = useRef();

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      <div className="home-page-container">
        <div className="home-page-nav-bar-container">
          <div className="home-page-nav-bar-left">
            <Logo />
            Goal-e, Your Virtual Planner
          </div>
          <div className="home-page-nav-bar-right">
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              className="log-in"
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              className="sign-up"
              modalComponent={<SignupFormModal />}
            />
          </div>
        </div>

        <div>
          <SplashSlider />
        </div>
        <div className="home-page-task-list-example">
          <div className="home-page-task-list-example-text">
            <h4>Get more done</h4>
            <h2>Add your tasks. </h2>
            <h2>Organize your life.</h2>
            <h2>Achieve more every day.</h2>
            <p>
              Add tasks like “Read work emails every day at 10am” to fill your
              to-do list in seconds using Todoists powerful natural language
              recognition and recurring dates.
            </p>
          </div>
          <div className="home-page-task-list-example-image">Image here</div>
        </div>
        <div className="home-page-task-list-example">
          <div className="home-page-task-list-example-image">Image here</div>
          <div className="home-page-task-list-example-text">
            <h4>Clear your mind</h4>
            <h2>Reach that mental clarity you’ve been longing for. </h2>
            <p>
              Plan and structure your life around your goals. Get more done and
              achieve more, by designing your tasks around your goals.
            </p>
          </div>
        </div>
        <div className="home-page-feature-container">
          <h2 className="home-page-feature-title">Goal-e Features:</h2>
          <div className="home-page-feature-grid">
            <div className="grid-feature-container">Goal setting</div>
            <div className="grid-feature-container">Task Lists</div>
            <div className="grid-feature-container">
              Weekly Reflections - Prompts are provided to help you reflect how
              the previous week as gone, and how you can improve in the next.
            </div>
            <div className="grid-feature-container">Habbit Tracking</div>
            <div className="grid-feature-container">
              Image Uploading to Capture and log all of your proudest moments
            </div>
            <div className="grid-feature-container">Feature 6</div>
          </div>
        </div>
        <div className="home-page-footer">
          <div className="footer-dev-links">
            <a href="https://github.com/JAllen2022">
              <i className="fa-brands fa-github"></i>
            </a>{" "}
            <a href="https://www.linkedin.com/in/jasonallen715/">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
          <div>
            <i className="fa-regular fa-copyright footer-home-page-copyright"></i>{" "}
            Jason Allen 2023
          </div>
        </div>
      </div>
    </>
  );
}
