import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import {REACT_APP_DATABASE_URL} from '../../'



const host = "https://leaderboard-backend-x6ol.onrender.com";

//  const host = REACT_APP_DATABASE_URL;
// https://assignment-2-three-olive.vercel.app/
// api/user/v1/get-users-info
const Home = () => {
const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

 

   useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token)
    {
      navigate("/login")
      setAuthenticated(false)
    }
    else{
      setAuthenticated(true)
    }
   
     
   }, []);
   

  useEffect(() => {
    if (authenticated) {
      const fetchFriends = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${host}/api/user/v1/get-users`, {
            headers: {
              'Authorization': token
            }
          });
          setFriends(response.data.data);
        } catch (error) {
          console.error('Error fetching friends:', error);
        }
      };

      fetchFriends();
    }
   
  }, [authenticated]);

  const handleFriendClick = async (username) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${host}/api/user/v1/claim-points`, { username }, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 400) {
        console.log('User is not registered yet');
      } else {
        const updatedUser = response.data.data;
        setFriends(prevFriends => prevFriends.map(friend =>
          friend.username === username ? { ...friend, Points: updatedUser.Points } : friend
        ));
      }
    } catch (error) {
      console.error('Error claiming points:', error);
    }
  };

  if (!authenticated) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Friends List</h1>
    <ul className="space-y-4">
      {friends.map((friend, index) => (
        <li key={index} className="bg-white p-4 rounded shadow-md cursor-pointer flex justify-between" onClick={() => handleFriendClick(friend.username)}>
          <div className="w-1/3 text-lg font-semibold">{friend.username}</div>
          <div className="w-1/3 text-gray-600 text-center">Rank: {index + 1}</div>
          <div className="w-1/3 text-orange-500 text-right">Points: {friend.Points}</div>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default Home;
