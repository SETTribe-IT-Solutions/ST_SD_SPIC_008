import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import API from "./api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    gender: "Male"
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Auto-generate full name
  useEffect(() => {
    const full = form.firstName + " " + form.middleName + " " + form.lastName;
    setForm((prev) => ({ ...prev, fullName: full.trim() }));
  }, [form.firstName, form.middleName, form.lastName]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Photo validation
    if (!photo) {
      alert("Please upload a photo!");
      return;
    }

    // Existing validations
    if (form.password !== form.confirmPassword) {
      alert("Password mismatch");
      return;
    }

    if (form.contact.length !== 10) {
      alert("Mobile must be 10 digits");
      return;
    }

    // Send data to backend
    const formData = new FormData();
    formData.append("fullName", form.fullName);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("contact", form.contact);
    formData.append("gender", form.gender);
    formData.append("photo", photo);

    await API.post("/api/user/register", formData);

    alert("Registered Successfully");
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Registration Form</h2>

        <form onSubmit={handleSubmit}>
          <label>First Name</label>
          <input name="firstName" required onChange={handleChange} />

          <label>Middle Name</label>
          <input name="middleName" required onChange={handleChange} />

          <label>Last Name</label>
          <input name="lastName" required onChange={handleChange} />

          <label>Full Name</label>
          <input value={form.fullName} readOnly />

          <label>Email</label>
          <input type="email" name="email" required onChange={handleChange} />

          <label>Password</label>
          <input type="password" name="password" required onChange={handleChange} />

          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" required onChange={handleChange} />

          <label>Mobile</label>
          <input name="contact" maxLength="10" required onChange={handleChange} />

          <label>Photo</label>
          <input
            type="file"
            required
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              const validTypes = ["image/jpeg", "image/jpg", "image/png"];
              if (!validTypes.includes(file.type)) {
                alert("Only JPEG, JPG, PNG formats allowed!");
                e.target.value = null;
                return;
              }

              if (file.size > 1024 * 1024) {
                alert("Photo must be under 1MB!");
                e.target.value = null;
                return;
              }

              setPhoto(file);
              setPhotoPreview(URL.createObjectURL(file));
            }}
          />
          {photoPreview && (
            <div className="photo-preview">
              <img src={photoPreview} alt="preview" />
            </div>
          )}

          <button type="submit">Register</button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;