// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
// import { aside } from "framer-motion/client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { REACT_APP_DATABASE_URL } from '../.env';

const host = "http://localhost:7000";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate()


  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    }
  }, [authenticated]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Remove token and update authentication status
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/login")
     

  };
 
  // to fetch the logged in user details
  // try {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const response = await axios.post('http://localhost:7000/api/user/v1/get-users-info', {}, {
  //       headers: {
  //         'Authorization': token
  //       }
  //     })};
  const fetchUserInfo = async()=>{

     if(user === null){

       try {
         const token = localStorage.getItem('token')
          if(token){
            const res = await axios.post(`${host}/api/user/v1/get-users-info`,{},{
              headers:{
                'Authorization':token
              }
            })
             console.log(res)
            setUser(res.data.data)
            setIsDropdownOpen(!isDropdownOpen);
            
          }
        } catch (error) {
          console.log("error while fetching data at navabar.jsx line 52");
          
        }
     }
     else{
       setUser(null)
     }
  }
     



  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-around items-center">
        <div className="text-2xl font-bold text-black border">
          <a href="#">Nexorand</a>
        </div>

         {/* user icon with showing logged in user details */}

        <div onClick={fetchUserInfo}>
        <i className="fa-regular fa-user"></i>
          {/* This could be an icon of your choice */}
        </div>
        {isDropdownOpen && user && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out transform origin-top">
          <div className="text-sm text-gray-700">Name: {user.username}</div>
          <div className="text-sm text-gray-700">{user.email}</div>
          <div className="text-sm text-gray-700">Points: {user.Points}</div>
          {/* Add more user details as needed */}
        </div>
      )}

        <div className="hidden md:flex space-x-6">
          <Link to="/Home" className="text-gray-700 hover:text-black">
            Home
          </Link>
          <Link to="/Leaderboard" className="text-gray-700 hover:text-black">
            Leaderboard
          </Link>
          
          { !localStorage.getItem("token")?<form className="  sm:flex sm:gap-3">
          <Link className="text-gray-700 hover:text-black mb-3" to="/login" role="button">Login</Link> <br />
          <Link className="ext-gray-700 hover:text-black" to="/Register" role="button">Signup</Link>
         </form>:<button className="text-gray-700 hover:text-black" onClick={handleLogout}>Logout</button>
         }
           
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-black"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 px-4">
          <Link to="/Home" className="text-gray-700 hover:text-black">
            Home
          </Link>
          <Link to="/Leaderboard" className="text-gray-700 hover:text-black">
            Leaderboard
          </Link>
          {/* {authenticated ? (
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-black"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/Login" className="text-gray-700 hover:text-black">
                Login
              </Link>
              <Link to="/Register" className="text-gray-700 hover:text-black">
                Register
              </Link>
            </>
          )} */}
          { !localStorage.getItem("token")?<form className="">
          <Link className="text-gray-700 hover:text-black" to="/login" role="button">Login</Link> <br />
          <Link className="ext-gray-700 hover:text-black" to="/Register" role="button">Signup</Link>
         </form>:<button className="text-gray-700 hover:text-black" onClick={handleLogout}>Logout</button>
         }
          
        </div>
      )}
    </nav>
  );
};

export default Navbar;
