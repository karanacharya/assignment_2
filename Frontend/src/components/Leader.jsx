import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './modal'; // Import the Modal component
// import { REACT_APP_DATABASE_URL } from '../.env';


const host = "http://localhost:7000";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [history, setHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${host}/api/user/v1/get-users`, {
          headers: {
            'Authorization': token
          }
        });
        const sortedUsers = response.data.data.sort((a, b) => b.Points - a.Points).slice(0, 10); // Sort by Points and limit to 10
        setUsers(sortedUsers);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  const handleUserClick = async (username) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${host}/api/user/v1/your-history`, { username }, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });
      setHistory(response.data.data);
      setSelectedUser(username);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching user history:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <ul className="space-y-4">
        {users.map((user, index) => (
          <li key={index} className="bg-white p-4 rounded shadow-md flex justify-between cursor-pointer" onClick={() => handleUserClick(user.username)}>
            <div className="w-1/3 text-lg font-semibold">{user.username}</div>
            <div className="w-1/3 text-gray-600 text-center">Rank: {index + 1}</div>
            <div className="w-1/3 text-orange-500 text-right">Points: {user.Points}</div>
          </li>
        ))}
      </ul>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} history={history} />
    </div>
  );
};

export default Leaderboard;
