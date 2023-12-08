import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import '../App.css';
import { Link  } from 'react-router-dom';
import { Button }from '@material-ui/core';

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
          <Link to = '/'>
          <Button size="small" style={{color: 'Black'}}>
              Please Login!!!
          </Button>
          
          </Link>
        </div>
      </div>
    );
  };
  
  export default AccessForbidden;
