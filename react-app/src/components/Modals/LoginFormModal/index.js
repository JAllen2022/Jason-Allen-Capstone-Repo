import React, { useState, useEffect } from "react";
import { login } from "../../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import SignupFormModal from "../SignupFormModal";
import "./LoginForm.css";

// Need to change this

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal, setModalContent } = useModal();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
      history.push("/");
    }
  };

  return (
    <>
      <div className="log-in-container">
        <div className="x-marks-the-spot">
          {" "}
          <i onClick={closeModal} className="fa-solid fa-x x-close"></i>
        </div>
        <img
          id="splash-page-nav-icon"
          src="https://appacademypictures.s3.us-west-2.amazonaws.com/icons8-open-book-64.png"
          alt="book icon logo"
        />
        <h1 className="log-in-header">Welcome back</h1>
        <div className="log-in-sub-header">
          Please enter your details to sign in.
        </div>
        {Object.values(errors).length ? (
          <div style={{ color: "#c23a22", marginBottom: ".5rem" }}>
            Invalid email or password.
          </div>
        ) : (
          ""
        )}
        <form className="log-in-form" onSubmit={handleSubmit}>
          <div>
            <label className="log-in-form-label"> Email</label>
          </div>
          <input
            type="text"
            className="log-in-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div id="log-in-password-label">
            <label className="log-in-form-label">Password</label>
          </div>
          <input
            className="log-in-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="log-in-button-modal" type="submit">
            Log In
          </button>
          <div className="demo-user-text">
            Don't have an account?{" "}
            <span
              className="demo-user"
              onClick={() => setModalContent(<SignupFormModal />)}
            >
              Create account
            </span>
          </div>
          <div className="demo-user-text">
            {" "}
            Try Goal-e!{" "}
            <span
              onClick={() => {
                dispatch(login("demo@aa.io", "password"));
                history.push("/");
                closeModal();
              }}
              className="demo-user"
            >
              Demo user
            </span>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
