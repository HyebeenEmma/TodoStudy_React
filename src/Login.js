import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Login = () => {
  const [id, setID] = useState("");
  const [password, setPassword] = useState("");

  const handleIDChange = (e) => {
    setID(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
  };

  return (
    <div className="login-form">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            className="form-control form-control-sm"
            style={{ fontSize: "12px", padding: "5px" }}
            autoFocus
            placeholder="ID"
            value={id}
            onChange={handleIDChange}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control form-control-sm"
            style={{ fontSize: "12px", padding: "5px" }}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>

      <p className="mt-3">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
