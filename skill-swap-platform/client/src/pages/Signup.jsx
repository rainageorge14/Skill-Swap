

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import "../styles/Signup.css";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
        "http://skill-swap-1-a5b8.onrender.com/api/auth/signup",
        formData
      );

      toast.success(response.data.message);

      navigate("/login");

    } catch (error) {

      toast.error(error.response.data.message);

    }

  };

  return (

    <div className="signup-container">

      <form className="signup-form" onSubmit={handleSubmit}>

        <h1>Create Account</h1>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
        />

        <button type="submit">
          Signup
        </button>

      </form>

    </div>

  );

}

export default Signup;