import React, { useEffect, useState } from "react";
import { login } from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLogged, setIsLogged] = useState(false);

  const { login: loginUser } = useAuth(); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("FormData", formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(formData);
      // console.log("data", data);
      loginUser(data);
      console.log("=======>",data)
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      // alert("User loggedin successfully");
      toast.success("Successfully Login");
      // navigate(`/user/${data.userId}`); 
      setTimeout(() => {
        navigate(`/user/${localStorage.getItem("userId")}`);
      }, 1000);
    } catch (err) {
      // console.log("err", err);
      toast.error("Invalid email or password");
    }
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
  
    if (token) {
      setIsLogged(true)
      if (userId) {
        console.log("Hello world")
        navigate(`/user/${userId}`);
      } else {
        console.error("User ID not found in local storage.");
      }
    } else {
      setIsLogged(false);
    }
  }, []);

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          className="register-input"
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          className="register-input"
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button
          className="register-button"
          type="submit"
        >
          Login
        </button>
        <Toaster position="top-right" reverseOrder={false} />
      </form>
    </div>
  );
}
export default Login;
