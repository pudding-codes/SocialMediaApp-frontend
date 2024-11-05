import React, { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import "./Register.css";
import { register } from "../../services/api.jsx";
import { useAuth } from '../../AuthContext';
// toast.configure();

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("FormData", formData);
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return toast.error("Please fill in all fields");
    }

    setLoading(true);
    
    try {
      const { data } = await register(formData);
      // console.log("register-data", data);
      toast.success("Successfully registered");
      login(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      setTimeout(() => {
        navigate(`/user/${data._id}`);
      }, 1000);
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "Duplicate registration");
      } else {
        toast.error("An error occurred during registration");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          className="register-input"
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          required
        />
        <button className="register-button" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <Toaster position="top-right" reverseOrder={false} />
      </form>
    </div>
  );
}
