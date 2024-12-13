import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Css/style.css";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../Constant/constant";

export const Sign = () => {
  const [formData, setFormData] = useState({
    userName: "",
    displayName: "",
    password: "",
    confirmPassword: "",
    email: "",
    role: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      role: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Passwords Do Not Match",
        text: "Please make sure both passwords are the same.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      console.log(formData);
      const { userName, displayName, password, email, role } = formData;
      const Response = await axios.post(`${BASE_URL}/api/signup`, {
        userName,
        displayName,
        password,
        email,
        isStudent: role,
      });
      console.log(Response);
      if (Response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Register Successful!",
          text: "Welcome To WeLearn",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Register Failed",
          text: "Try Again",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
      setFormData({
        userName: "",
        displayName: "",
        password: "",
        confirmPassword: "",
        email: "",
        role: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error Occurred",
        text: error.response.data.message || "failed due to server",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Create your account</h2>
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">Username: </label>
            <input
              type="text"
              name="userName"
              id="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="displayName">Display Name: </label>
            <input
              type="text"
              name="displayName"
              id="displayName"
              value={formData.displayName}
              onChange={handleChange}
              maxLength={50}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength={6}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              maxLength={32}
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label htmlFor="role" className="checkbox-label">
              Student:{" "}
            </label>
            <input
              type="checkbox"
              name="role"
              id="role"
              checked={formData.role}
              onChange={handleRoleChange}
            />
          </div>

          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>

        <div className="login-link">
          <p>
            Already Registered?{" "}
            <Link to="/login" className="login-link-text">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

/*
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Css/style.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

export const Sign = () => {
  const [formData, setFormData] = useState({
    username: '',
    displayname: '',
    password: '',
    confirmPassword: '',
    email: '',
    role: false,
  });

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [passwordError, setPasswordError] = useState(''); // State for password error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate password length only when the password changes
    if (name === 'password') {
      if (value.length < 6) {
        setPasswordError('Minimum 6 characters are required');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      role: e.target.checked,
    });
  };

  const handleBlur = (e) => {
    if (e.target.name === 'password' && formData.password.length < 6) {
      setPasswordError('Minimum 6 characters are required');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      console.log(formData);
      alert('Registration successful!');
      setFormData({
        username: '',
        displayname: '',
        password: '',
        confirmPassword: '',
        email: '',
        role: false,
      });
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Create your account</h2>
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="displayname">Display Name: </label>
            <input
              type="text"
              name="displayname"
              id="displayname"
              value={formData.displayname}
              onChange={handleChange}
              maxLength={50}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur} // Check password error on blur
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>} 
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password: </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                maxLength={32}
                required
              />
            </div>
  
            <div className="form-group checkbox-group">
              <label htmlFor="role" className="checkbox-label">Student: </label>
              <input
                type="checkbox"
                name="role"
                id="role"
                checked={formData.role}
                onChange={handleRoleChange}
              />
            </div>
  
            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </form>
  
          <div className="login-link">
            <p>
              Already Registered?{' '}
              <Link to="/login" className="login-link-text">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  };
  */
