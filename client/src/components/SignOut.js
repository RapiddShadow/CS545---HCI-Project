import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Signout = ({ title }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = title; // Set the page title

    // Remove session token
    sessionStorage.removeItem('token');
    const sessionToken = sessionStorage.getItem('token');
    console.log(sessionToken);

    if (sessionToken === null) {
      // Show signed out successfully alert
      Swal.fire({
        icon: 'success',
        title: 'Signed out successfully!',
      });
      navigate('/');
    }
  }, [title, navigate]);

  return (
    <div>
      {/* Add any additional content if needed */}
    </div>
  );
};

export default Signout;
