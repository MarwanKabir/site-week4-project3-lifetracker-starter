import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../Home/Home"
import Register from "../Register/Register"
import Login from "../Login/Login"
// import Portal from "../Portal/Portal"
import "./App.css"
import Navbar from "../Navbar/Navbar"

export default function App() {
  const [appState, setAppState] = useState({})

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Home setAppState={setAppState} />} />
          <Route path="/register" element={<Register setAppState={setAppState} />} />
          <Route path="/login" element={<Login setAppState={setAppState} />} />
          {/* <Route
            path="/portal"
            element={<Portal setAppState={setAppState} appState={appState} user={appState?.user} />}
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}