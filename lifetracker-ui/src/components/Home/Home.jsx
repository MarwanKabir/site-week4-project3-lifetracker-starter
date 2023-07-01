import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="firstContainer">
      <div className="CardOne">
        <div className="contentContainer">
          <div className="textContainer">
            <h1>LifeTracker</h1>
            <p>Helping you take back control of your world.</p>
          </div>
          <div className="imgContainer">
            <img src="https://lifetracker-ui-ai8e.onrender.com/assets/tracker-2a96bfd0.jpg" alt="Image" />
          </div>
        </div>
      </div>
      <div className="BottomContainer">
        <div className="section">
          <h2>Fitness</h2>
          <img src="https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?cs=srgb&dl=pexels-zakaria-boumliha-2827392.jpg&fm=jpg" alt="Image" />
        </div>
        <div className="section">
          <h2>Food</h2>
          <img src="https://images.theconversation.com/files/489329/original/file-20221012-11-1j3fqj.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip" alt="Image" />
        </div>
        <div className="section">
          <h2>Rest</h2>
          <img src="https://media.istockphoto.com/id/540861476/photo/total-relaxation.jpg?b=1&s=612x612&w=0&k=20&c=CU6Z99TQqXYTdCC0qiKUpcyVGRPrZHZHhQm8DUj-Vbk=" alt="Image" />
        </div>
        <div className="section">
          <h2>Planner</h2>
          <img src="https://www.ringcentral.com/gb/en/blog/wp-content/uploads/2019/11/how-to-succeed-with-planning-in-management-3.jpg" alt="Image" />
        </div>
      </div>
    </div>
  )
}
