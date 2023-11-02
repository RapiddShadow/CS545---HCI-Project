import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
// import queries from '../queries';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const SignIn = ({ title }) => {

  React.useEffect(() => {
    document.title = title; // Set the page title
  }, [title]);
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    dob: '',
    phone: '',
    email: '',
    country: '',
    profilePic: '',
    bio: '',
    isPremium: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // const [createUser, { loading, error, data }] = useMutation(queries.CREATE_USER, {
  //   onCompleted: async () => {
  //     console.log('User Created');
  //     navigate('/signin');

  //   },
  //   onError: (error) => {

  //     console.log(error);
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error!',
  //       text: error.message.split(':')[1].trim().replace(/"/g, ''),
  //       confirmButtonText: "Fix it",
  //     });
  //     console.log(error.message.split(':')[1].trim().replace(/"/g, ''));
  //     console.log('User not created');
  //   },
  // });

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const { username, password, dob, phone, email, country, bio } = formData
  //   if(!username || !password || !email || !dob || !phone || !country || !bio) {
  //     console.log('Something is empty');
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error!',
  //       text: 'Please fill up all the fields',
  //     });
  //   } else{
  //     createUser({ variables: { username, password, dob, phone, email, country, bio } });
  //   }
  // };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dob: date
    });
  };

  return (
    <div class="col-md-6 offset-3 align-items-center ">
      <br></br>
      <div className="wsk-cp-matches" >
      <h5>Sign Up</h5>
        <hr style={{ background: "#D3D3D3",height: "2px", border: "none", opacity:0.5}}/>
        <br></br>
        {/* <form onSubmit={handleSubmit}> */}
        <form>
          <div className="form-group">
              <label htmlFor="username" className="teamname ">First Name</label>
              <div className="col-sm-6 offset-3 align-items-center ">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
          </div>
          <br></br>

          <div className="form-group">
              <label htmlFor="username" className="teamname ">Last Name</label>
              <div className="col-sm-6 offset-3 align-items-center ">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={formData.username}
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
            <label htmlFor="password" className='teamname'>Age</label>
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

export default SignIn