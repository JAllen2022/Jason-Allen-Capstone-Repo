import React, { useState, useEffect, useRef } from "react";
import HomePageNotebook from "../../Assets/HomePageNotebook";
import GoalImage from "../../Assets/GoalImage";

import "./SplashPageSlider.css";

export default function SplashSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeIndex = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  let style = {};

  useEffect(() => {
    const time = setInterval(() => {
      changeIndex();
    }, 6000);

    return () => {
      clearInterval(time);
    };
  }, [currentIndex]);

  const isActive = (index) => {
    return index === currentIndex ? "active" : "";
  };

  const slides = [
    <div className={`home-page-slide ${isActive(0)}`}>
      <HomePageNotebook />
      <div className="home-page-slide-text-container">
        <h1 className="home-page-header-slide1" style={{ textAlign: "center" }}>
          Goal-e
        </h1>
        <h2 style={{ textAlign: "center" }}>Your Virtual Planner</h2>
      </div>
    </div>,
    <div className={`home-page-slide ${isActive(1)}`}>
      <GoalImage />
      <div className="home-page-slide-text-container">
        <h1 className="home-lage-header-slide2" style={{ textAlign: "center" }}>
          Organize your work and life, finally.
        </h1>
        <p style={{ textAlign: "center" }}>
          Become focused, organized, and calm with Goal-e. Organize and plan
          tasks, based on the goals that are most important to you.
        </p>
      </div>
    </div>,
  ];

  return (
    <div className="home-page-slider-outer-container">
      <div className="home-page-slide-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              opacity: isActive(index) ? 1 : 0,
              transition: "opacity 2s",
            }}
          >
            {slide}
          </div>
        ))}
      </div>
      <div className="dot-container">
        {slides.map((_, index) => (
          <div
            key={index}
            className={currentIndex === index ? "active-dot" : "passive-dot"}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
