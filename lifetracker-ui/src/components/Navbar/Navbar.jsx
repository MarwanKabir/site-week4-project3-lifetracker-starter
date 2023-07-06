import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({handleLogout, loggedIn}) {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
            <img src="https://lifetracker-ui-ai8e.onrender.com/assets/codepath-f1b3e41a.svg" alt="logo" />
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/activity">Activity</Link>
        </li>
        <li>
          <Link to="/exercise">Exercise</Link>
        </li>
        <li>
          <Link to="/nutrition">Nutrition</Link>
        </li>
        <li>
          <Link to="/sleep">Sleep</Link>
        </li>
      </ul>
      {location.pathname.indexOf("portal") === -1 ? (
        <ul>
        <div className="auth-buttons">
          {loggedIn ? 
            <>
              <button onClick={handleLogout}>Logout</button>
            </>
          :
            <>
            <li>
              <Link to="/login">
              <button className="btn ghost">Login</button>
              </Link>
            </li>
            <li>
              <Link to="/register">
              <button className="btn primary">Register</button>
              </Link>
            </li>
            </>}
        </div>
      </ul>
      
      ) : null}
    </nav>
  );
}

// import * as React from "react"
// import "./Navbar.css"

// //This is the navigation bar at the top of the page
// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <ul>
//         <li></li>
//         <li><a href = "/" className="site-home">Activity</a></li>
//         <li><a href = "/#About">Exercise</a></li>
//         <li><a href = "/#Contact">Nutrition</a></li>
//         <li><a href = "/#Buy">Sleep</a></li>
//         <button><a href="/login">Login</a></button>
//         <button><a href="/register">Register</a></button>
//       </ul>
//     </nav>
//   )
// }