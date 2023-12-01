import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignOut from './SignOut';
import Home from './Home';
import Navigation from './Navigation';
import Quiz from './QuizCard'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import QuizCategories from './QuizCategories';
import QuizCard from './QuizCard';



function App() {

  const sessionToken = sessionStorage.getItem('sessionToken');
  console.log(sessionToken);
  if (sessionToken) {

  return (
        <Router>
          <div className='App'>
            <header className='App-header'>

              <Navbar collapseOnSelect expand="lg" className='bg' >
                <Container>

                  <Navbar.Brand>
                    <Link to="/">
                      <span className="navbar-brand">Trivia Website</span>
                    </Link>
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto" >
                      <Navigation />
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </header>

            <div className='App-body'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signin' element={<SignIn title="Login"/>} />
                <Route path='/signup' element={<SignUp title="Sign Up"/>} />
                <Route path='/signout' element={<SignOut />} />
                <Route path='/categories' element={<QuizCategories />} />
                <Route path='/quiz' element={<QuizCard />} />
              </Routes>
            </div>

          </div>
        </Router>
             
  );

}

else{

  return (
        <Router>
          <div className='App'>
            <header className='App-header'>

              <Navbar collapseOnSelect expand="lg" className='bg' >
                <Container>

                  <Navbar.Brand>
                    <Link to="/">
                      <span className="navbar-brand">Trivia Website</span>
                    </Link>
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto" >
                      <Navigation />
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </header>

            <div className='App-body'>
              <Routes>
              <Route path='/' element={<Home />} />
                <Route path='/signin' element={<SignIn title="Login"/>} />
                <Route path='/signup' element={<SignUp title="Sign Up"/>} />
                <Route path='/signout' element={<SignOut />} />
                <Route path='/categories' element={<QuizCategories />} />
                <Route path='/quiz' element={<QuizCard />} />
              </Routes>
            </div>

          </div>
        </Router>
              
  );




}
}

export default App;
