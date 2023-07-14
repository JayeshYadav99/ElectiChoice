import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const Signup = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      if (response) {
        console.log(response.data.token);
        cookies.set("TOKEN", response.data.token, {
          path: "/",
        });
      }
      console.log(cookies.get("TOKEN"));

      const { success, message } = response.data;
      if (success) {
        setTimeout(() => {
          navigate("/Home");
        }, 1000);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Signup Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-lg font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={handleOnChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-lg font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-700"
          >
            Submit
          </button>
          <span>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
