import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useModal } from "../../context/Modal";

import "./SplashPage.css";

let splashPageItemList = [
  {
    name: "Complete prep-work for bootcamp",
    completed: false,
  },
  {
    name: "Walk the dog",
    completed: false,
  },
  {
    name: "File my taxes",
    completed: false,
  },
  {
    name: "Study for Chemistry midterm on Friday",
    completed: false,
  },
  {
    name: "Practice the guitar",
    completed: false,
  },
  {
    name: "Complete Capstone project",
    completed: true,
  },
  {
    name: "Complete prep-work for bootcamp",
    completed: true,
  },
];

export default function SplashPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [title, setTitle] = useState("");
  const [tab, setTab] = useState("all");
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

  const handleSubmit = (e) => {
    e.prevendDefault();
  };

  let displayList;
  let defaultListHeight = 20;
  console.log(displayList);
  displayList = splashPageItemList.map((item, index) => (
    <SplashPageListItem key={index} item={item} />
  ));
  console.log(displayList);

  if (displayList.length < defaultListHeight) {
    for (let i = displayList.length; i < defaultListHeight; i++) {
      displayList.push(<SplashPageListItem empty={true} />);
    }
  }
  console.log(displayList);

  return (
    <div className="splash-page-container">
      <div class="splash-page-notebook">
        <div class="splash-page-left-page">
          <div class="splash-title">
            <h1>To-Do</h1>
          </div>
          <div className="list-container-div">
            <div className="list-header-tab-organizer">
              <div
                className={
                  tab === "all" ? "list-tab-heading-active" : "list-tab-heading"
                }
                onClick={() => (tab === "all" ? "" : setTab("all"))}
              >
                All Tasks
              </div>
              <div
                className={
                  tab === "incomplete"
                    ? "list-tab-heading-active"
                    : "list-tab-heading"
                }
                onClick={() =>
                  tab === "incomplete" ? "" : setTab("incomplete")
                }
              >
                Incomplete
              </div>
              <div
                className={
                  tab === "complete"
                    ? "list-tab-heading-active"
                    : "list-tab-heading"
                }
                onClick={() => (tab === "complete" ? "" : setTab("complete"))}
              >
                Completed
              </div>
              <div className="list-tab-cog">
                <i class="fa-solid fa-gear"></i>
              </div>
            </div>
            <div className="list-input-field-container">
              <form className="list-form-container" onSubmit={handleSubmit}>
                <input
                  className="list-create-list-item-input-field"
                  placeholder="Add a task..."
                  type="text"
                  maxLength="50"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
                <input
                  type="submit"
                  style={{ position: "absolute", display: "none" }}
                />
              </form>
            </div>
            <div className="list-view-section">{displayList}</div>
          </div>
        </div>
        <div class="splash-page-right-page">
          <div class="splash-page-left-content">
            <h1 className="splash-page-title">Welcome to Goal-e</h1>
            <h2 className="splash-page-title">Your virtual planner</h2>

            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              className="log-in-button"
              modalComponent={<LoginFormModal />}
            />
            

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              className="log-in-button"
              modalComponent={<SignupFormModal />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SplashPageListItem({ item, empty }) {
  const [list, setList] = useState("");
  const [completed, setCompleted] = useState(item?.completed || false);

  // Eventually - need to cut down on the re-renders here when checkbox is checked
  // Many re-renders occuring here if we console.log here
  // console.log("checking currtask", currTask);

  // Handle check box click on the right side of the container to mark something complete
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Modal functionality

  const deleteClick = () => {};

  let innerDiv;

  innerDiv = (
    <div className="inner-list-item-text-container tag-color">
      <div className="inner-list-item-text">{!empty && item.name} </div>
      <div className="inner-list-edit-buttons-container">
        <form
          onSubmit={handleSubmit}
          className="list-edit-button-checkbox-form"
        >
          {!empty && (
            <>
              <input
                type="checkbox"
                checked={completed}
                className="edit"
                id="list-edit-button-checkbox"
                onChange={handleSubmit}
              ></input>
              <input
                type="submit"
                style={{ position: "absolute", display: "none" }}
              />
            </>
          )}
        </form>
        {!empty && <i class="fa-solid fa-trash edit" onClick={deleteClick}></i>}
      </div>
    </div>
  );

  let containerStyling = "list-item-container";
  if (!empty) containerStyling += " add-pointer";
  if (item?.completed) containerStyling += " list-item-strike-through";
  return <div className={containerStyling}>{innerDiv}</div>;
}
