import React from "react";
import "./Hero.scss";

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        {/* Content */}
        <h1 className="top-title">FRONTEND</h1>
        <h2 className="middle-title">PORTFOLIO</h2>
        <h1 className="bottom-title">DEVELOPER</h1>
        <p className="corner-text">DESIGN BY DAN 2026</p>
      </div>
    </section>
  );
};

export default Hero;
