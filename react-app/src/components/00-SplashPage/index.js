import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "../Modals/OpenModalButton";
import LoginFormModal from "../Modals/LoginFormModal";
import SignupFormModal from "../Modals/SignupFormModal";
import { useModal } from "../../context/Modal";
import GoalSVG from "../../assets/GoalSVG";
import TaskTrackerSVG from "../../assets/TaskTrackerSVG";
import ReflectionSVG from "../../assets/ReflectionSVG";
import HabitTrackSVG from "../../assets/HabitTrackSVG";
import ImageSVG from "../../assets/ImageSVG";
import NotesSVG from "../../assets/NotesSVG";

import "./SplashPage.css";
// Links to images
// https://appacademypictures.s3.us-west-2.amazonaws.com/goals-page.png
// https://appacademypictures.s3.us-west-2.amazonaws.com/reflections.png
// https://appacademypictures.s3.us-west-2.amazonaws.com/5minutejournal.png
// https://appacademypictures.s3.us-west-2.amazonaws.com/planner-no-nav.png
// https://appacademypictures.s3.us-west-2.amazonaws.com/planner-full-page.png
// https://appacademypictures.s3.us-west-2.amazonaws.com/icons8-open-book-64.png

export default function SplashPage() {
  const { setModalContent } = useModal();
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
    <div className="splash-page-container">
      <div className="splash-page-nav-container">
        <div className="splash-page-nav-left">
          <img
            id="splash-page-nav-icon"
            src="https://appacademypictures.s3.us-west-2.amazonaws.com/icons8-open-book-64.png"
            alt="book icon logo"
          />
        </div>

        <div className="splash-page-nav-right">
          <div
            className="splash-page-login"
            onClick={() => setModalContent(<LoginFormModal />)}
          >
            Log in
          </div>
          <div
            className="splash-page-signup"
            onClick={() => setModalContent(<SignupFormModal />)}
          >
            Sign up
          </div>
        </div>
      </div>
      <div className="splash-page-title-container">
        <h1 className="splash-page-title">
          Organize your work and life, finally.
        </h1>
        <div className="splash-page-sub-title">
          Become focused, organized, and calm with Goal-e. Get more done, with a
          familiar concept. Just in virtual format!
        </div>
        <div
          className="splash-page-signup"
          id="title-container-signup"
          onClick={() => setModalContent(<SignupFormModal />)}
        >
          Sign up
        </div>
        <div className="splash-page-demo-planner-page-container">
          <img
            id="planner-page-screenshot"
            src="https://appacademypictures.s3.us-west-2.amazonaws.com/planner-full-page.png"
            alt="description of image"
          />
        </div>
      </div>
      <div className="home-page-task-list-example">
        <div className="home-page-task-list-example-text">
          <div className="home-page-task-sub-heading">Get more done.</div>
          <div className="home-page-task-heading">Add your goals. </div>
          <div className="home-page-task-heading">Organize your life.</div>
          <div className="home-page-task-heading"> Achieve more every day.</div>
          <div className="home-page-task-description">
            Add goals like “Read work emails every day at 10am” to fill your
            list of goals in seconds. Add sub-tasks and habits to help you
            achieve the goals you set.
          </div>
        </div>
        <div className="home-page-task-list-example-image">
          <img
            className="home-page-task-list-image"
            src="https://appacademypictures.s3.us-west-2.amazonaws.com/goals-page.png"
          />
        </div>
      </div>
      <div className="home-page-task-list-example">
        <div className="home-page-task-list-example-image">
          <img
            className="home-page-task-list-image"
            src="https://appacademypictures.s3.us-west-2.amazonaws.com/reflections.png"
          />
        </div>
        <div className="home-page-task-list-example-text">
          <div className="home-page-task-sub-heading">Clear your mind.</div>
          <div className="home-page-task-heading">
            Reach that mental clarity you’ve been longing for.{" "}
          </div>
          <div className="home-page-task-description">
            Elevate your self-reflection game with our weekly reflection and
            nightly journaling feature, designed to help you achieve greater
            self-awareness and personal growth.
          </div>
        </div>
      </div>
      <div className="home-page-feature-container">
        <h2 className="home-page-feature-title">Goal-e Features:</h2>
        <div className="home-page-feature-grid">
          <div className="grid-feature-container">
            <div className="splash-page-grid-svg">
              <GoalSVG />
            </div>
            <div className="splash-page-grid-title">Goal tracker</div>
            <div className="splash-page-grid-details">
              {" "}
              Set and monitor progress towards specific objectives.
            </div>
          </div>
          <div className="grid-feature-container">
            <div className="splash-page-grid-svg">
              <TaskTrackerSVG />
            </div>
            <div className="splash-page-grid-title"> Task tracker</div>
            <div className="splash-page-grid-details">
              {" "}
              Keep track of to-do items and their status.
            </div>
          </div>
          <div className="grid-feature-container">
            <div className="splash-page-grid-svg">
              <ReflectionSVG />
            </div>
            <div className="splash-page-grid-title">
              Journaling and Reflections
            </div>
            <div className="splash-page-grid-details">
              {" "}
              Write about experiences and thoughts to aid in self-reflection.
            </div>
          </div>
          <div className="grid-feature-container">
            <div className="splash-page-grid-svg">
              <HabitTrackSVG />
            </div>
            <div className="splash-page-grid-title"> Habit Tracker</div>
            <div className="splash-page-grid-details">
              {" "}
              Monitor daily/weekly habits and identify trends.
            </div>
          </div>
          <div className="grid-feature-container">
            <div className="splash-page-grid-svg">
              <ImageSVG />
            </div>
            <div className="splash-page-grid-title"> Images</div>
            <div className="splash-page-grid-details">
              {" "}
              Upload and display visual media for your goals, tasks, and habits.
            </div>
          </div>
          <div className="grid-feature-container">
            <div className="splash-page-grid-svg">
              <NotesSVG />
            </div>
            <div className="splash-page-grid-title"> Notes</div>
            <div className="splash-page-grid-details">
              {" "}
              Capture ideas and information for future reference in each goal,
              task, and habit.
            </div>
          </div>
        </div>
      </div>

      <div className="splash-page-body-container"></div>
      <div className="home-page-footer">
        <div className="footer-dev-links">
          <a href="https://github.com/JAllen2022" target="_blank">
            <i className="fa-brands fa-github"></i>
          </a>{" "}
          <a href="https://www.linkedin.com/in/jasonallen715/" target="_blank">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
        <div>
          <i className="fa-regular fa-copyright footer-home-page-copyright"></i>{" "}
          Jason Allen 2023
        </div>
      </div>
    </div>
  );
}
