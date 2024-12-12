import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Css/style.css";
import { BASE_URL } from "../../Constant/constant";
import Swal from "sweetalert2";
import axios from "axios";
import { AppNavbar } from "./Navbar";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = formData;
      console.log(email);
      const Response = await axios.post(`${BASE_URL}/api/login`, {
        email,
        password,
      });
      if (Response.status === 200) {
        const token = Response.data.token;
        console.log(Response.data.user.role);
        console.log(Response.data.user, "user");
        localStorage.setItem("token", token);
        localStorage.setItem("role", Response.data.user.role);
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/");
      }
      setFormData({
        password: "",
        email: "",
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
    <>
      <AppNavbar />
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h2>WelCome, TO WeLearn</h2>
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
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

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
