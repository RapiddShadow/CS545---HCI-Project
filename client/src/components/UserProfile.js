import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Container, Button, Dialog, DialogTitle, DialogContent, DialogActions }  from '@material-ui/core';

const UserProfile = ({ title }) => {
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openCheckScore, setOpenCheckScore] = useState(false);
  const [openSubmitForm, setOpenSubmitForm] = useState(false);
  const [openSeeDetails, setOpenSeeDetails] = useState(false);

  const handleOpenEditProfile = () => setOpenEditProfile(true);
  const handleCloseEditProfile = () => setOpenEditProfile(false);

  const handleOpenCheckScore = () => setOpenCheckScore(true);
  const handleCloseCheckScore = () => setOpenCheckScore(false);

  const handleOpenSubmitForm = () => setOpenSubmitForm(true);
  const handleCloseSubmitForm = () => setOpenSubmitForm(false);

  const handleOpenSeeDetails = () => setOpenSeeDetails(true);
  const handleCloseSeeDetails = () => setOpenSeeDetails(false);

  React.useEffect(() => {
    document.title = title; // Set the page title
  }, [title]);

  const cardStyle = {
    maxWidth: '200px',
    marginBottom: '10px',
    marginRight: '10px',
    cursor: 'pointer',
  };

  return (
    <div>
      <br></br><br></br>
      <h1>Welcome to your profile page!</h1>

     

      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' , width: '100wh' }}>
      <Grid container spacing={5}>
             {/* Edit Profile Card */}
            <Card variant="outlined" style={cardStyle} onClick={handleOpenEditProfile}>
            <CardMedia component="img" alt={"Edit Profile"} height="250" image={'/images/geography.png'} style={{ width: '100wh', height: '100wh', objectFit: 'cover' }}/>
              <CardContent>
                <h2>Edit Profile</h2>
              </CardContent>
            </Card>

            {/* Check Score Card */}
            <Card variant="outlined" style={cardStyle} onClick={handleOpenCheckScore}>
            <CardMedia component="img" alt={"Edit Profile"} height="250" image={'/images/geography.png'} style={{ width: '100wh', height: '100wh', objectFit: 'cover' }}/>
              <CardContent>
                <h2>Check Score</h2>
              </CardContent>
            </Card>

            {/* Submit Form Card */}
            <Card variant="outlined" style={cardStyle} onClick={handleOpenSubmitForm}>
            <CardMedia component="img" alt={"Edit Profile"} height="250" image={'/images/geography.png'} style={{ width: '100wh', height: '100wh', objectFit: 'cover' }}/>
              <CardContent>
                <h2>Submit Form</h2>
              </CardContent>
            </Card>

            {/* See Details Card */}
            <Card variant="outlined" style={cardStyle} onClick={handleOpenSeeDetails}>
            <CardMedia component="img" alt={"Edit Profile"} height="250" image={'/images/geography.png'} style={{ width: '100wh', height: '100wh', objectFit: 'cover' }}/>
              <CardContent>
                <h2>See Details</h2>
              </CardContent>
            </Card>

        </Grid>
      </Container>



      {/* Edit Profile Modal */}
      <Dialog open={openEditProfile} onClose={handleCloseEditProfile}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>{/* Add your edit profile content here */}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditProfile} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Check Score Modal */}
      <Dialog open={openCheckScore} onClose={handleCloseCheckScore}>
        <DialogTitle>Check Score</DialogTitle>
        <DialogContent>{/* Add your check score content here */}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCheckScore} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Submit Form Modal */}
      <Dialog open={openSubmitForm} onClose={handleCloseSubmitForm}>
        <DialogTitle>Submit Form</DialogTitle>
        <DialogContent>{/* Add your submit form content here */}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSubmitForm} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* See Details Modal */}
      <Dialog open={openSeeDetails} onClose={handleCloseSeeDetails}>
        <DialogTitle>See Details</DialogTitle>
        <DialogContent>{/* Add your see details content here */}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSeeDetails} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default UserProfile;
