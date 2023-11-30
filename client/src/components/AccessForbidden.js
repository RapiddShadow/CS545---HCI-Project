import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import '../App.css';

const AccessForbidden = ( {title}) => {

    React.useEffect(() => {
        document.title = title; // Set the page title
      }, [title]);
    useEffect(() => {
      // Display SweetAlert2 when the component mounts
      Swal.fire({
        icon: 'error',
        title: '403 Access Forbidden',
        text: 'Please Login!!!',
      });
    }, []); // Empty dependency array ensures the effect runs only once after the component mounts
  
    return (
      <div className="access-forbidden-container">
        <div className="access-forbidden-content">
          <h1>403 Access Forbidden</h1>
          <p>Please Login!!!</p>
        </div>
      </div>
    );
  };
  
  export default AccessForbidden;
