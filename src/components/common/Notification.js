import React, { useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded-md shadow-md z-50 ${
        type === 'success'
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white'
      }`}
    >
      <p>{message}</p>
      <button
        className="absolute top-2 right-2 text-white hover:text-gray-300"
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  );
};

export default Notification;
