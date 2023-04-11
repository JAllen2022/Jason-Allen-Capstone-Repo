import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { signUp } from "../../../store/session";
import { login } from "../../../store/session";
import { useHistory } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { closeModal, setModalContent } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors({ ...errors, password: "Passwords do not match." });
    }
  };

  console.log("checking errors", errors);
  return (
    <div className="sign-up-modal-container">
      <div className="x-marks-the-spot">
        {" "}
        <i onClick={closeModal} className="fa-solid fa-x x-close"></i>
      </div>
      <img
        id="splash-page-nav-icon"
        src="https://appacademypictures.s3.us-west-2.amazonaws.com/icons8-open-book-64.png"
        alt="book icon logo"
      />
      <h1 className="log-in-header">Create an account</h1>
      <div className="log-in-sub-header">
        Enter your details to create your Goal-e account.
      </div>
      <form className="log-in-form" onSubmit={handleSubmit}>
        <label className="sign-up-label">
          Email
          <input
            className="log-in-input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <div style={{ color: "maroon" }}>{errors.email}</div>}
        <label className="sign-up-label">
          Username
          <input
            className="log-in-input"
            type="text"
            minLength="2"
            maxLength="10"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="sign-up-label">
          Password
          <input
            className="log-in-input"
            type="password"
            value={password}
            minLength="6"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label className="sign-up-label">
          Confirm Password
          <input
            className="log-in-input"
            type="password"
            value={confirmPassword}
            minLength="6"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && (
          <div style={{ color: "maroon", fontSize: "14px" }}>
            {errors.password}
          </div>
        )}
        <button className="log-in-button-modal" type="submit">
          Sign Up
        </button>
      </form>
      <div className="demo-user-text">
        Already have an account?{" "}
        <span
          className="demo-user"
          onClick={() => setModalContent(<LoginFormModal />)}
        >
          Log in
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
    </div>
  );
}

export default SignupFormModal;
