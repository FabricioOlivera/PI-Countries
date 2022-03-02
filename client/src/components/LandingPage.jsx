import React from "react";
import { Link } from "react-router-dom";
import "../css/LandingPage.css";

function Landinpage() {
  return (
    <div className="container">
      <h2 className="titleLanding">Welcome</h2>
      <Link to="/countries" style={{textDecoration: "none"}}>
        
          <button className="buttonEnter">Enter</button>
        
      </Link>
    </div>
  );
}

export default Landinpage;
