import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { REACT_APP_DATABASE_URL } from '../.env';
// import { div } from "framer-motion/client";
// import AuthContext from "../context/authContext";




const host = "https://leaderboard-backend-x6ol.onrender.com";



const Login = () => {
  // const context = useContext(AuthContext);  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  // const { login } = context;
  

  const handleLogin = async (e) => {  
    e.preventDefault();
    try {
      const response = await axios.post(`${host}/api/auth/v1/login`, {
        username,
        password
      });
      localStorage.setItem('token', response.data.token);
      setAuthenticated(true)
      navigate('/home')
     
    } catch (error) {
      setError('Login failed: ' + error);
      setAuthenticated(false)
      navigate('/login')
    
  };
}

  


  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleLogin}
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            className="border w-full p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="border w-full p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
