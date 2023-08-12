import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Login = () => {
  const [id, setID] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-form">
      <label>ID</label>
      <input
        type="text"
        autoFocus
        placeholder="아이디를 입력하세요"
        onChange={(e) => setID(e.target.value)}
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">로그인</button>

      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
