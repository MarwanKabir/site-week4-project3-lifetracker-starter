import React from "react"
import { Link } from "react-router-dom" 
import "./ActivityPage.css"

export default function Activity({ loggedIn }) {
  return (
    <div className="container">
      {loggedIn ? (
        <div className="next-container">
          <h1>Welcome To The Activity Page!</h1>
          <div className="links">
            <ul>
              <li>
                <Link to="/activity">
                  <button>Activity</button>
                </Link>
              </li>
              <li>
                <Link to="/exercise">
                  <button>Exercise</button>
                </Link>
              </li>
              <li>
                <Link to="/nutrition">
                  <button>Nutrition</button>
                </Link>
              </li>
              <li>
                <Link to="/sleep">
                  <button>Sleep</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <h1>LOG IN TO VIEW</h1>
      )}
    </div>
  )
}
