import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignIn = ({ title }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    document.title = title; // Set the page title
  }, [title]);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/login', {
        email: formData.email,
        password: formData.password,
      });

      // Assuming the server returns a JWT token upon successful login
      
      const token  = response.data;
      console.log(token)

      // Store the token in session storage
      sessionStorage.setItem('token', token);
      console.log('Login successful:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Logged in successfully!',
      });
      navigate('/categories');
    } catch (error) {
      console.error('Login failed:', error.response.data);
      // Handle login failure, display an error message, etc.
    }
  };

  return (
    <div className="col-md-4 offset-4 align-items-center ">
      <br /><br /><br></br>
      <div className="wsk-cp-matches ">
        <h5>Login</h5>
        <hr style={{ background: '#D3D3D3', height: '2px', border: 'none', opacity: 0.5 }} /><br />
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input type="text" className="form-control" name="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <br />
          <div>
            <label>Password:</label>
            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleInputChange} required />
          </div>
          <br />
          <button className="round-button" type="submit">Login</button>
          <br /><br />
        </form>
      </div>
    </div>
  );
};

export default SignIn;

