import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const host = "https://leaderboard-backend-x6ol.onrender.com";


// const host = REACT_APP_DATABASE_URL;

const Register = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${host}/api/auth/v1/register`, userData);
      console.log(res);
      
      navigate("/login");
    } catch (err) {
      console.log(err)
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleRegister}
      >
        <h1 className="text-xl font-bold mb-4">Register</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            className="border w-full p-2"
            value={userData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="border w-full p-2"
            value={userData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="border w-full p-2"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            className="border w-full p-2"
            value={userData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="border w-full p-2"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
