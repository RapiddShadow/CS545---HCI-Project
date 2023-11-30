import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import SignOutButton from './SignOut';
import '../App.css';

// const Navigation = () => {

//   const sessionToken = sessionStorage.getItem('token');
//   console.log(sessionToken);

//   if (sessionToken) {
//     return (
//       <nav className='navigation'>
//         <NavLink className='nav-links' to='/'>
//           Home
//         </NavLink>  
//         <NavLink className='nav-links' to='/signout'>
//           SignOut
//         </NavLink>
  
//          {/* <NavLink className='nav-links' to='/signup'>
//           SignUp
//         </NavLink>  */}
//       </nav>
//     );
    
//   } else {
//     // the user is not logged in
//     return (
//       <nav className='navigation'>
//         <NavLink className='nav-links' to='/'>
//           Home
//         </NavLink>
//         <NavLink className='nav-links' to='/signin'>
//           LogIn
//         </NavLink>
  
//         <NavLink className='nav-links' to='/signup'>
//           SignUp
//         </NavLink>
//         <Link className='nav-links' to='/categories'>
//         Quiz
//       </Link>
//       </nav>
//     );
//   }

// }


// const NavigationNonAuth = () => {
//   return (
//     <nav className='navigation'>
//       <Link className='nav-links' to='/'>
//         Home
//       </Link>

//       <Link className='nav-links' to='/signin'>
//         LogIn
//       </Link>

//       <Link className='nav-links' to='/signup'>
//         SignUp
//       </Link>
//       <Link className='nav-links' to='/categories'>
//         Quiz
//       </Link>
//     </nav>
//   );
// };

// export default Navigation;


const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));

  const handleSignOut = () => {
    // Clear the session token and update authentication status
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return (
      <nav className='navigation'>
        <NavLink className='nav-links' to='/'>
          Home
        </NavLink>
        <NavLink className='nav-links' to='/signout' onClick={handleSignOut}>
          SignOut
        </NavLink>
      </nav>
    );
  } else {
    return (
      <nav className='navigation'>
        <NavLink className='nav-links' to='/'>
          Home
        </NavLink>
        <NavLink className='nav-links' to='/signin'>
          LogIn
        </NavLink>
        <NavLink className='nav-links' to='/signup'>
          SignUp
        </NavLink>
        <Link className='nav-links' to='/categories'>
          Quiz
        </Link>
      </nav>
    );
  }
};

export default Navigation;