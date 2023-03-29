import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { signUp } from "../../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

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
      <h1 className="log-in-header">Sign Up</h1>
      <form className="log-in-form" onSubmit={handleSubmit}>
        <label>
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
        <label>
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
        <label>
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

        <label>
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
          <div style={{ color: "maroon" }}>{errors.password}</div>
        )}
        <button className="log-in-button-modal" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
