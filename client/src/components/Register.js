import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';


const SignUp = ({ title }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
    areaOfInterest: 'select Area of Interest',
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.title = title; // Set the page title

    // Check if the user is already logged in
    const sessionToken = sessionStorage.getItem('token');
    if (sessionToken) {
      Swal.fire({
        icon: 'info',
        title: 'Already Logged In',
        text: 'You are already logged in!',
      }).then(() => {
        // Redirect to the desired page (e.g., '/categories')
        navigate('/categories');
      });
    }
  }, [title, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        age: formData.age,
        areaOfInterest: formData.areaOfInterest,
      });

      const token = response.data;
      sessionStorage.setItem('token', JSON.stringify(token));

      Swal.fire({
        icon: 'success',
        title: 'Registered successfully!',
      });

      navigate('/categories');
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      // Handle registration failure, display an error message, etc.
    }
  };


  return (
    <div className="col-md-6 offset-3 align-items-center ">
      <br></br>
      <div className="wsk-cp-matches" >
      <h5>Sign Up</h5>
        <hr style={{ background: "#D3D3D3",height: "2px", border: "none", opacity:0.5}}/>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label htmlFor="firstName" className="teamname ">First Name</label>
              <div className="col-sm-6 offset-3 align-items-center ">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
          </div>
          <br></br>

          <div className="form-group">
              <label htmlFor="lastName" className="teamname ">Last Name</label>
              <div className="col-sm-6 offset-3 align-items-center ">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                </div>
          </div>

          <br></br>
          <div className="form-group">
            <label htmlFor="email" className='teamname' >Email</label>  
            <div className="col-sm-6 offset-3 align-items-center ">     
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            </div>  
          </div>

          <br></br>
          <div className="form-group">
            <label htmlFor="password" className='teamname'>Password</label>
            <div className="col-sm-6 offset-3 align-items-center ">    
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            </div>
          </div>
          <br></br>
          <div className="form-group">
            <label htmlFor="age" className='teamname'>Age</label>
            <div className="col-sm-6 offset-3 align-items-center ">   
            <input
              type="text"
              className="form-control"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
            />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="areaOfInterest" className='teamname'>Area of Interest</label>
            <div className="col-sm-6 offset-3 align-items-center ">
          <select className="form-select" id="areaOfInterest" name="areaOfInterest" value={formData.areaOfInterest} onChange={handleInputChange}>
              <option>select Area of Interest</option>
              <option value="pop culture">Pop Culture</option>
              <option value="geography">Geography</option>
              <option value="history">History</option>
              <option value="sports">Sports</option>
              <option value="science">Science</option>
              <option value="surprise me">Surprise Me!</option>
          </select>
          </div>
          </div>

          <br></br>
          <button type="submit" className="round-button">
            Sign Up
          </button>
          <br></br><br></br>
        </form>
      </div>
    </div>
    
  );
};

export default SignUp