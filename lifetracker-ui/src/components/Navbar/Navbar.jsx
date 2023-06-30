import * as React from "react"
import "./Navbar.css"

//This is the navigation bar at the top of the page
export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li></li>
        <li><a href = "/" className="site-home">Activity</a></li>
        <li><a href = "/#About">Exercise</a></li>
        <li><a href = "/#Contact">Nutrition</a></li>
        <li><a href = "/#Buy">Sleep</a></li>
        <button><a href="/login">Login</a></button>
        <button><a href="/register">Register</a></button>
      </ul>
    </nav>
  )
}