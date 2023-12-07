import React, { useState , useEffect} from 'react';
import { Card, CardContent, Typography }  from '@material-ui/core';
import { Link } from 'react-router-dom';
import ProfileImage from "./ProfileImage";


const UserProfile = ({ title }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve user data from session
    const storedUserData = sessionStorage.getItem('token');
    console.log(storedUserData)
    
    if (storedUserData) {
      // Parse the stored data
      const parsedUserData = JSON.parse(storedUserData);
      console.log(parsedUserData)
      setUserData(parsedUserData);
    }
  }, []);

  return (
    <div className="container">
    <div className="row">
      {/* Left Column for Name, Email, and Area of Interest */}
      <div className="col-md-6">
      <Card style={{ maxWidth: 600, margin: 'auto', marginTop: 50, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: 550 , background: 'navy'}}>
  <CardContent>
    {userData ? (
      <>
        {/* Circular Image */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ width: 200, height: 200, borderRadius: '50%', overflow: 'hidden', marginRight: 20 }}>
            {/* <img
              src='/images/popculture.png'  // Replace with the actual source URL of your user's avatar
              alt="User Avatar"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            /> */}
           <ProfileImage name={`${userData.firstName} ${userData.lastName}`} />
          </div>
        </div>

        {/* User Information */}
        <Typography variant="h4" component="div" style={{ marginBottom: 20, textAlign: 'center', color:'white' }}>
          Welcome, {userData.firstName} {userData.lastName}!
        </Typography>
        <hr style={{ background: "#D3D3D3",height: "2px", border: "none", opacity:0.5}}/>
        
        {/* User Information */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          {/* Subcard for Email */}
          <div style={{ flex: 1, marginRight: 10 }}>
            <Card style={{ backgroundColor: 'white', color: 'black', padding: 10, textAlign: 'center' , height : 150}}>
              <Typography variant="h6" style={{ marginBottom: 10 }}>
                Email
              </Typography>
              <hr style={{ background: "#D3D3D3",height: "2px", border: "none", opacity:0.5}}/>
              <Typography color="navy">
                {userData.email}
              </Typography>
            </Card>
          </div>

          {/* Subcard for Area of Interest */}
          <div style={{ flex: 1, marginLeft: 10 }}>
            <Card style={{ backgroundColor: 'white', color: 'black', padding: 10, textAlign: 'center' , height : 150}}>
              <Typography variant="h6" style={{ marginBottom: 10 }}>
                Area of Interest
              </Typography>
              <hr style={{ background: "#D3D3D3",height: "2px", border: "none", opacity:0.5}}/>
              <Typography color="navy">
                {userData.areaOfInterest}
              </Typography>
            </Card>
          </div>
        </div>
      </>
    ) : (
      <p>Loading...</p>
    )}
  </CardContent>
</Card>


      </div>
  
      {/* Right Column for Score Cards */}
      <div className="col-md-6">
        <div className="row">
          {/* Pop Culture Score Card */}
          <div className="col-md-4">
              <Card style={{ maxWidth: 200, height: 150, margin: 'auto', marginTop: 50, boxShadow: '0 8px 8px rgba(0, 0, 0, 0.1)', background: 'navy', color: 'white' }}>
                  <CardContent>
                      <Typography variant="h6" color="textPrimary" style={{ marginBottom: 10, color: 'white' }}>
                          Pop Culture
                      </Typography>
                      <hr style={{ background: "#D3D3D3", height: "2px", border: "none", opacity: 0.5 }} />
                      {userData ? (
                          <>
                            <Typography color="textSecondary" style={{ marginBottom: 10 , color: 'white'}}>
                              Pop Culture Score: {userData.Pop_score}
                            </Typography>
                          </>
                      ) : (
                          <p>Loading...</p>
                      )}
                  </CardContent>
              </Card>
          </div>
  
          {/* Geography Score Card */}
          <div className="col-md-4">
              <Card style={{ maxWidth: 200, height: 150, margin: 'auto', marginTop: 50, boxShadow: '0 8px 8px rgba(0, 0, 0, 0.1)', background: 'navy', color: 'white' }}>
                  <CardContent>
                      <Typography variant="h6" color="textPrimary" style={{ marginBottom: 10, color: 'white' }}>
                          Geography
                      </Typography>
                      <hr style={{ background: "#D3D3D3", height: "2px", border: "none", opacity: 0.5 }} />
                      {userData ? (
                          <>
                            <Typography color="textSecondary" style={{ marginBottom: 10 , color: 'white'}}>
                              Geography Score: {userData.Geo_score}
                            </Typography>
                          </>
                      ) : (
                          <p>Loading...</p>
                      )}
                  </CardContent>
              </Card>
          </div>
  
          {/* History Score Card */}
          <div className="col-md-4">
              <Card style={{ maxWidth: 200, height: 150, margin: 'auto', marginTop: 50, boxShadow: '0 8px 8px rgba(0, 0, 0, 0.1)', background: 'navy', color: 'white' }}>
                  <CardContent>
                      <Typography variant="h6" color="textPrimary" style={{ marginBottom: 10, color: 'white' }}>
                          History
                      </Typography>
                      <hr style={{ background: "#D3D3D3", height: "2px", border: "none", opacity: 0.5 }} />
                      {userData ? (
                          <>
                            <Typography color="textSecondary" style={{ marginBottom: 10 , color: 'white'}}>
                              History Score: {userData.Hist_score}
                            </Typography>
                          </>
                      ) : (
                          <p>Loading...</p>
                      )}
                  </CardContent>
              </Card>
          </div>
        </div>
  
        <div className="row">
          {/* Sports Score Card */}
          <div className="col-md-4">
              <Card style={{ maxWidth: 200, height: 150, margin: 'auto', marginTop: 50, boxShadow: '0 8px 8px rgba(0, 0, 0, 0.1)', background: 'navy', color: 'white' }}>
                  <CardContent>
                      <Typography variant="h6" color="textPrimary" style={{ marginBottom: 10, color: 'white' }}>
                          Sports
                      </Typography>
                      <hr style={{ background: "#D3D3D3", height: "2px", border: "none", opacity: 0.5 }} />
                      {userData ? (
                          <>
                            <Typography color="textSecondary" style={{ marginBottom: 10 , color: 'white'}}>
                              Sports Score: {userData.Sport_score}
                            </Typography>
                          </>
                      ) : (
                          <p>Loading...</p>
                      )}
                  </CardContent>
              </Card>
          </div>
  
          {/* Science Score Card */}
          <div className="col-md-4">
              <Card style={{ maxWidth: 200, height: 150, margin: 'auto', marginTop: 50, boxShadow: '0 8px 8px rgba(0, 0, 0, 0.1)', background: 'navy', color: 'white' }}>
                  <CardContent>
                      <Typography variant="h6" color="textPrimary" style={{ marginBottom: 10, color: 'white' }}>
                          Science
                      </Typography>
                      <hr style={{ background: "#D3D3D3", height: "2px", border: "none", opacity: 0.5 }} />
                      {userData ? (
                          <>
                            <Typography color="textSecondary" style={{ marginBottom: 10 , color: 'white'}}>
                              Science Score: {userData.Sci_score}
                            </Typography>
                          </>
                      ) : (
                          <p>Loading...</p>
                      )}
                  </CardContent>
              </Card>
          </div>
  
          {/* Surprise Me Score Card */}
          <div className="col-md-4">
              <Card style={{ maxWidth: 200, height: 150, margin: 'auto', marginTop: 50, boxShadow: '0 8px 8px rgba(0, 0, 0, 0.1)', background: 'navy', color: 'white' }}>
                  <CardContent>
                      <Typography variant="h6" color="textPrimary" style={{ marginBottom: 10, color: 'white' }}>
                          Surprise Me
                      </Typography>
                      <hr style={{ background: "#D3D3D3", height: "2px", border: "none", opacity: 0.5 }} />
                      {userData ? (
                          <>
                            <Typography color="textSecondary" style={{ marginBottom: 10 , color: 'white'}}>
                              Surprise Me Score: {userData.Surprise_score}
                            </Typography>
                          </>
                      ) : (
                          <p>Loading...</p>
                      )}
                  </CardContent>
              </Card>
          </div>


        </div>

        <div className="row">

        <div className="col-md-12">
        <Card style={{ maxWidth: 1100, height: 150, margin: 'auto', marginTop: 50, boxShadow: '0 8px 8px rgba(0, 0, 0, 0.1)', background: 'navy', color: 'white' }}>
            <CardContent>
              <Typography variant="p" color="textPrimary" style={{ marginBottom: 10, color: 'white' }}>
                Your feedback matters! Help us enhance your experience on Trivia Website. Share your thoughts. We appreciate your input!
              </Typography>
              <hr style={{ background: "#D3D3D3", height: "2px", border: "none", opacity: 0.5 }} />
              <a href="https://forms.gle/PfAyvcW4u6FRoDtK9" target="_blank">
                  <p style={{ color: 'white' }}>Feedback Form</p>
              </a>
              <br /> <br/> 
            </CardContent>
        </Card>

          </div>


        </div>
      </div>
    </div>
  </div>


  );
};

export default UserProfile;
