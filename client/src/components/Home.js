import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function Home({ title }) {

  React.useEffect(() => {
    document.title = title; // Set the page title
  }, [title]);
  return(
  <div className="row justify-content-center" id='home'  >
      <div className="col-md-10" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="d-flex">
                      <div className="col-md-5 mx-auto"> {/* Use mx-auto to center the column */}
                        <div className="d-block" style={{ position: 'relative' }}>
                          <Card className="card-with-border">
                            <Card.Img variant="top" src="/images/login.png" style={{ objectFit: 'cover' }}/>
                            <Link to="/signin">
                            <button className="round-button">Log In</button>
                            </Link>
                            <br></br>
                          </Card>
                        </div>
                      </div>

                      <div className="col-md-1"></div> {/* Gap of 3 columns here */}

                      <div className="col-md-5 mx-auto"> {/* Use mx-auto to center the column */}
                        <div className="d-block" style={{ position: 'relative' }}>
                          <Card className="card-with-border">
                            <Card.Img variant="top" src="/images/signup.png" style={{ objectFit: 'cover' }}/>
                            <Link to="/signup">
                            <button className="round-button">Sign Up</button>
                            </Link>
                            <br></br>
                          </Card>
                        </div>
                      </div>
                  </div>

  




</div>

</div>
        
  
);
}

export default Home;
