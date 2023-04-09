import React, { useState } from "react";
import { login } from "../../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

// Need to change this

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
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
        <h1 className="log-in-header">Log In</h1>
        {Object.values(errors).length ? (
          <div style={{ color: "maroon", marginBottom: ".5rem" }}>
            Invalid email or password.
          </div>
        ) : (
          ""
        )}
        <form className="log-in-form" onSubmit={handleSubmit}>
          <div>
            <label> Email</label>
          </div>
          <input
            type="text"
            className="log-in-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div>
            <label>Password</label>
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
