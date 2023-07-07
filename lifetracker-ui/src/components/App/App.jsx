import { useState, useEffect } from "react"
import jwtDecode from "jwt-decode"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../Home/Home"
import Register from "../Register/Register"
import Login from "../Login/Login"
// import Portal from "../Portal/Portal"
import "./App.css"
import Navbar from "../Navbar/Navbar"
import Workouts from "../ExercisePage/ExercisePage"
import Activity from "../ActivityPage/Activity"
import Nutrition from "../NutritionPage/Nutrition"

export default function App() {
  const [appState, setAppState] = useState({})
  const[loggedIn, setLoggedIn] = useState(false)
  const[userName, setUserName] = useState()

  useEffect(() => {
    const checkLoggedIn = () => {
      const token = localStorage.getItem("token")
      if(token){
        const decodedToken = jwtDecode(token)
        setUserName(decodedToken.userName)
        if(decodedToken.exp * 1000 > Date.now()){
          setLoggedIn(true)
        }else{
          handleLogout()
        }
      }
    }
    checkLoggedIn()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setLoggedIn(false)
  }

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar handleLogout={handleLogout} loggedIn={loggedIn} />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Home setAppState={setAppState} />} />
          <Route path="/register" element={<Register setAppState={setAppState} />} />
          <Route path="/login" element={<Login setAppState={setAppState} setLoggedIn={setLoggedIn} setUserName={setUserName} />} />
          <Route path="/exercise" element={<Workouts setAppState={setAppState} loggedIn={loggedIn}/>}/>
          <Route path="/Activity" element={<Activity setAppState={setAppState} loggedIn={loggedIn}/>}/>
          <Route path="/nutrition" element={<Nutrition setAppState={setAppState} loggedIn={loggedIn}/>}/>
          <Route path="/sleep" element={<Nutrition setAppState={setAppState} loggedIn={loggedIn}/>}/>
          {/* <Route
            path="/portal"
            element={<Portal setAppState={setAppState} appState={appState} user={appState?.user} />}
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}