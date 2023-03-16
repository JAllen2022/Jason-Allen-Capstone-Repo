import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/session";

function ProfileButton({ user, showProfDiv, setShowProfDiv }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
    setShowProfDiv(false);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
        setShowProfDiv(true);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "nav-popup-profile-modal" + (showMenu ? "" : " hidden");
  const closeMenu = () => {
    setShowMenu(false);
    setShowProfDiv(true);
  };

  return (
    <>
      <div className="nav-bar-profile-container">
        <div className="nav-bar-profile-button" onClick={openMenu}>
          <i className="fas fa-user-circle" />
        </div>
        <div>
          <ul className={ulClassName} ref={ulRef}>
            <div>{user.username}</div>
            <button className="log-out-button" onClick={handleLogout}>
              Log Out
            </button>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProfileButton;
