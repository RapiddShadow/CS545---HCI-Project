import React, { useState , useEffect} from 'react';
import { Card, CardContent, Typography }  from '@material-ui/core';

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
    <div className="col-md-6 offset-3 d-flex align-items-center">
  <div className="wsk-cp-matches">
    <Card style={{ maxWidth: 600, margin: 'auto', marginTop: 50, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <CardContent>
        {userData ? (
          <>
            <Typography variant="h5" component="div" style={{ marginBottom: 20, textAlign: 'center' }}>
              Welcome, {userData.firstName} {userData.lastName}!
            </Typography>
            <Typography color="textSecondary" style={{ marginBottom: 10 }}>
              Email: {userData.email}
            </Typography>
            <Typography color="textSecondary" style={{ marginBottom: 10 }}>
              Area of Interest: {userData.areaOfInterest}
            </Typography>
            <hr style={{ margin: '15px 0', border: '0.5px solid #ccc' }} />
            <Typography color="textSecondary" style={{ marginBottom: 10 }}>
              Pop Culture Score: {userData.Pop_score}
            </Typography>
            <Typography color="textSecondary" style={{ marginBottom: 10 }}>
              Geography Score: {userData.Geo_score}
            </Typography>
            <Typography color="textSecondary" style={{ marginBottom: 10 }}>
              History Score: {userData.Hist_score}
            </Typography>
            <Typography color="textSecondary" style={{ marginBottom: 10 }}>
              Sports Score: {userData.Sport_score}
            </Typography>
            <Typography color="textSecondary" style={{ marginBottom: 10 }}>
              Science Score: {userData.Sci_score}
            </Typography>
            <Typography color="textSecondary" style={{ marginBottom: 10 }}>
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

  );
};

export default UserProfile;
