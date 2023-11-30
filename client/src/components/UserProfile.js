import React from 'react';
import axios from 'axios';
import '../App.css';


const UserProfile = ( { title }) => {

  React.useEffect(() => {
    document.title = title; // Set the page title
  }, [title]);

  return (
    <div>Hey</div>
  );
};

export default UserProfile;


