import React from 'react';

const Modal = ({ isOpen, onClose, history }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
  <div className="bg-white p-6 rounded shadow-lg w-3/4 md:w-1/2 max-h-[80vh] overflow-y-auto">
    <h2 className="text-xl font-bold mb-4">Points Claimed History</h2>
    <ul className="space-y-2">
      {history.map((entry, index) => (
        <li key={index} className="bg-gray-100 p-3 rounded">
          <div>Date: {entry.date}</div>
          <div>Points Awarded: {entry.pointsAwarded}</div>
        </li>
      ))}
    </ul>
    <button onClick={onClose} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Close</button>
  </div>
</div>


  );
};

export default Modal;
