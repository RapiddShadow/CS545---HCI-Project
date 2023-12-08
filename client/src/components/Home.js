import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import '../App.css';
import { Link } from 'react-router-dom';

function Home({ title }) {
  useEffect(() => {
    document.title = title; // Set the page title
  }, [title]);

  return(
  <div className="row justify-content-center" >
      <div className="col-md-10" style={{ height: '100vh',display: 'flex', justifyContent: 'center', alignItems: 'center' , backgroundColor: "transparent"}}>
                  <div className="d-flex">
                      <div className="col-md-6 mx-auto"> {/* Use mx-auto to center the column */}
                        <div className="d-block" style={{ position: 'relative' }}>
                        <Link to="/signin">
                          <Card className="card-with-border">
                            <Card.Img variant="top" src="/images/login.png" style={{ objectFit: 'cover' }}/>
                            
                            <button className="round-button">Login</button>
                            
                            <br></br>
                          </Card>
                          </Link>
                        </div>
                      </div>

                      <div className="col-md-1"></div> {/* Gap of 3 columns here */}

                      <div className="col-md-5 mx-auto"> {/* Use mx-auto to center the column */}
                        <div className="d-block" style={{ position: 'relative' }}>
                        <Link to="/register">
                          <Card className="card-with-border">
                          <Card.Img variant="top" src="/images/signup.png" style={{ objectFit: 'cover' }}/>
                            
                            <button className="round-button">Register</button>
                            
                            <br></br>
                          </Card>
                          </Link>
                        </div>
                      </div>
                  </div>

  




</div>

</div>
        
  
);
}

export default Home;
