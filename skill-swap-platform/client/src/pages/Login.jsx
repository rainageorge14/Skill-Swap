import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast.success(response.data.message);

      navigate("/dashboard");

    } catch (error) {

      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server not responding");
      }

    }

  };

  return (

    <div className="login-container">

      <form className="login-form" onSubmit={handleSubmit}>

        <h1>Welcome Back</h1>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  );

}

export default Login;