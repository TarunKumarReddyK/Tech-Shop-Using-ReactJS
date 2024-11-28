import React, { useState, useEffect } from 'react';
import './Notification.css'; // Ensure proper styling

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Close notification after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="notification">
      <p>{message}</p>
    </div>
  );
};

export default Notification;