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
                      <div className="col-md-6 mx-auto"> {/* Use mx-auto to center the column */}
                        <div className="d-block" style={{ position: 'relative' }}>
                          <Card className="card-with-border">
                            <Card.Img variant="top" src="/images/QNA.jpg" />
                            <Link to="/signin">
                              <Button className="round-button">
                                <span>Login</span>
                              </Button>
                            </Link>
                            <br></br>
                          </Card>
                        </div>
                      </div>

                      <div className="col-md-2"></div> {/* Gap of 3 columns here */}

                      <div className="col-md-6 mx-auto"> {/* Use mx-auto to center the column */}
                        <div className="d-block" style={{ position: 'relative' }}>
                          <Card className="card-with-border">
                            <Card.Img variant="top" src="/images/QNA.jpg" />
                            <Link to="/signup">
                              <Button className="round-button">
                                <span>Sign Up</span>
                              </Button>
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
