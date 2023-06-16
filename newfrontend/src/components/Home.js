import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import WelcomeMessage from "./WelcomeMessage";

export default function Home() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("./login");
  };
  const handleRegisterClick = () => {
    navigate("./signup");
  };
  return (
    <div className="mainPage">
      <nav className="navbar">
        <div className="navbar-brand">AUTH</div>
      </nav>
      <WelcomeMessage></WelcomeMessage>
      <h4 style={{ color: "white" }}>
        A minimal road safety Detection app using MERN and YOLV5
      </h4>
      <div className="buttonContainer">
        <button onClick={handleRegisterClick} className="RegisterButton">
          Register
        </button>
        <div className="monkey_image">
          <img
            src="https://em-content.zobj.net/thumbs/120/apple/354/hear-no-evil-monkey_1f649.png"
            srcset="https://em-content.zobj.net/thumbs/240/apple/354/hear-no-evil-monkey_1f649.png 2x"
            alt="Hear-No-Evil Monkey on Apple iOS 16.4"
            width="120"
            height="120"
          ></img>
        </div>
        <button onClick={handleLoginClick} className="LoginButton">
          Login
        </button>
      </div>
    </div>
  );
}
