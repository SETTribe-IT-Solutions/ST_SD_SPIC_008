import React, { useState } from "react";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";




export default function RegisterFunCom() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobile: "",
    photo: null,
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const fullName =
    `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    let newErrors = { ...errors };

    if (file) {
      const validTypes = ["image/jpeg", "image/png"];

      if (!validTypes.includes(file.type)) {
        newErrors.photo = "Only JPG or PNG allowed";
      } else if (file.size > 1024 * 1024) {
        newErrors.photo = "File must be under 1MB";
      } else {
        newErrors.photo = "";
        setFormData({ ...formData, photo: file });
      }

      setErrors(newErrors);
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!/^[A-Za-z]{2,30}$/.test(formData.firstName))
      newErrors.firstName = "Only letters (2-30 characters)";

    if (!/^[A-Za-z]{2,30}$/.test(formData.middleName))
      newErrors.middleName = "Only letters (2-30 characters)";

    if (!/^[A-Za-z]{2,30}$/.test(formData.lastName))
      newErrors.lastName = "Only letters (2-30 characters)";

    if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Mobile must be exactly 10 digits";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
        formData.password
      )
    )
      newErrors.password =
        "Must contain uppercase, lowercase, number & special character";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!formData.photo) newErrors.photo = "Photo is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (validate()) {
    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("middleName", formData.middleName);
    data.append("lastName", formData.lastName);
    data.append("mobile", formData.mobile);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("photo", formData.photo);

    try {
      await axios.post("http://localhost:8081/api/users/register", data);

      
      Swal.fire({
        icon: "success",
        title: "Registration Successful 🎉"
      });

      navigate("/login");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Registration Failed", "error");
    }
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, white,white)"
      }}
    >
      <Card  style={{
    backgroundColor: "#f2f6fa", // deep blue
    color: "black",             // text color
    borderRadius: "12px",
    padding: "24px"
  }}
        sx={{
          width: 450,
          p: 4,
          borderRadius: 3,
          boxShadow: 8
        }}
      >
        <CardContent >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Create Account
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              margin="normal"
            />

            {/* Middle Name */}
            <TextField
              fullWidth
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              error={!!errors.middleName}
              helperText={errors.middleName}
              margin="normal"
            />

            {/* Last Name */}
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              margin="normal"
            />

            {/* Full Name */}
            <TextField
              fullWidth
              label="Full Name"
              value={fullName}
              disabled
              margin="normal"
            />

            {/* Mobile */}
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile"
              inputProps={{ maxLength: 10 }}
              value={formData.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
              margin="normal"
            />

            {/* Email */}
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
            />

            {/* Photo Upload */}
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 2 }}
            >
              Upload Photo (JPG/PNG, Max 1MB)
              <input hidden type="file" onChange={handleFileChange} />
            </Button>

            {errors.photo && (
              <Typography color="error" variant="body2">
                {errors.photo}
              </Typography>
            )}

            {/* Password */}
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
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

            {/* Confirm Password */}
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {/* Submit */}
            <Button
  fullWidth
  type="submit"
  variant="contained"
  size="large"
  sx={{
    mt: 3,
    backgroundColor: "#4caf50",  // green
    color: "white",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#43a047", // darker green on hover
    },
  }}
>
  Register
</Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
