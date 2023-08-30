import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  const handleID = (e) => {
    setID(e.target.value);
    setSubmitted(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (name === "" || email === "" || id === "" || password === "") {
      setError(true);
    } else if (!email.includes("@")) {
      setError(true);
    } else {
      try {
        const response = await axios.post("http://localhost:8000/signup", {
          id: id,
          password: password,
          name: name,
          email: email,
        });

        if (response.data === "notexist") {
          setSubmitted(true);
          navigate("/login");
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
    }
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h4>Hi, {name}! Successfully registered!!</h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h4>Please enter all the fields or the user already exists</h4>
      </div>
    );
  };

  return (
    <div className="signup-box">
      <div className="signup-title">
        <h3>Sign Up Page</h3>
      </div>

      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <div className="signup-forms">
        <p><label htmlFor="name" className="signup-text">Name</label>&nbsp;
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleName}
          className="input"
          placeholder="Name"
        />
        </p>

        <p><label htmlFor="email" className="signup-text">Email</label>&nbsp;
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmail}
          className="input"
          placeholder="email@email.com"
        />
        </p>

        <p><label htmlFor="id" className="signup-text">ID</label>&nbsp;
        <input
          type="text"
          id="id"
          value={id}
          onChange={handleID}
          className="input"
          placeholder="ID"
        />
        </p>

        <p><label htmlFor="password" className="signup-text">Password</label>&nbsp;
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePassword}
          className="input"
          placeholder="Password"
        />
        </p>

        <p><button
          onClick={handleSubmit}
          className="btn btn-primary"
          type="submit"
        >
          Submit
        </button>
        </p>
      </div>
    </div>
  );
}
