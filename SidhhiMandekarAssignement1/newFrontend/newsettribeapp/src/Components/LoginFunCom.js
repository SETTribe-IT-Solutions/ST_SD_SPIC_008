import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff, Refresh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    captchaInput: ""
  });

  const [captcha, setCaptcha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Generate Captcha
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newCaptcha = "";
    for (let i = 0; i < 6; i++) {
      newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(newCaptcha);
  };

  // ✅ Load captcha on page load
  useEffect(() => {
    generateCaptcha();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.captchaInput) {
      Swal.fire("Warning", "All fields are required!", "warning");
      return;
    }

    if (formData.captchaInput !== captcha) {
      Swal.fire("Error", "Invalid Captcha!", "error");
      generateCaptcha();   // regenerate new captcha
      setFormData({ ...formData, captchaInput: "" }); // clear input
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        {
          username: formData.username,
          password: formData.password
        }
      );

      // ✅ Store JWT
      localStorage.setItem("token", response.data);

      Swal.fire("Success 🎉", "Login Successful", "success")
        .then(() => navigate("/tender"));

    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        Swal.fire("Error", "Invalid Credentials!", "error");
      } else if (error.response?.status === 403) {
        Swal.fire("Error", "Access Denied (403)", "error");
      } else {
        Swal.fire("Error", "Server not responding", "error");
      }

      generateCaptcha(); // regenerate on failed login
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #f5f5f5, #ffffff)"
      }}
    >
      <Card sx={{ width: 400, p: 2, borderRadius: 3, boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {/* CAPTCHA */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 2,
                mb: 1
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  letterSpacing: 3,
                  fontSize: 18
                }}
              >
                {captcha}
              </Typography>

              <IconButton onClick={generateCaptcha}>
                <Refresh />
              </IconButton>
            </Box>

            <TextField
              fullWidth
              label="Enter Captcha"
              name="captchaInput"
              value={formData.captchaInput}
              onChange={handleChange}
              margin="normal"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                background: "linear-gradient(to right,#4caf50,#43a047)"
              }}
            >
              Login
            </Button>

            <Typography align="center" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <span
                style={{
                  color: "#4caf50",
                  cursor: "pointer"
                }}
                onClick={() => navigate("/")}
              >
                Register Here
              </span>
            </Typography>

          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;