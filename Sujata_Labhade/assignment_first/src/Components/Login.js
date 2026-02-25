import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import API from "./api";   // backend API import

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    captchaInput: ""
  });

  const [captcha, setCaptcha] = useState("");

  // Generate Captcha
  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let cap = "";
    for (let i = 0; i < 6; i++) {
      cap += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(cap);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validations 
    if (
      !loginData.username ||
      !loginData.password ||
      !loginData.captchaInput
    ) {
      alert("All fields are mandatory");
      return;
    }

    if (loginData.captchaInput !== captcha) {
      alert("Invalid Captcha");
      generateCaptcha();
      setLoginData({ ...loginData, captchaInput: "" });
      return;
    }

    try {
      // Backend API call
      const res = await API.post("/api/user/login", {
        email: loginData.username,
        password: loginData.password
      });

      if (res.data) {
        alert("Login Successful ");
        navigate("/tender");
      } else {
        alert("Invalid Username or Password");
      }
    } catch (error) {
      alert("Login Failed ");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            type="email"
            name="username"
            placeholder="Enter Username (Email)"
            onChange={handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />

          <label>Captcha:</label>
          <div className="captcha-row">
            <input
              type="text"
              value={captcha}
              readOnly
              className="captcha-text"
            />
            <button
              type="button"
              className="captcha-refresh"
              onClick={generateCaptcha}
            >
              Refresh
            </button>
          </div>

          <input
            type="text"
            name="captchaInput"
            placeholder="Enter captcha"
            onChange={handleChange}
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="register-link">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/")}>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;