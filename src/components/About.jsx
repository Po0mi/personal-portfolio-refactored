import React from "react";
import "./About.scss";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="noise"></div>
      <div className="about-container">
        <p className="first-paragraph">
          I'm, <span>Dan Gabrielle De Castro</span>, a 4th-year IT student at
          Central Philippine University, building real-world experience in web
          development, networking, and system design. Passionate about
          problem-solving and creating user-friendly interfaces — eager to apply
          my skills beyond the classroom.
        </p>

        <div className="tech-section">
          <div className="tech-divider">
            <span className="tech-label">— TECH STACK</span>
          </div>
          <div className="tech-groups">
            <div className="tech-group">
              <span className="group-label">Frontend</span>
              <div className="tech-badges">
                <span className="badge">React</span>
                <span className="badge">Vite</span>
                <span className="badge">TypeScript</span>
                <span className="badge">JavaScript</span>
                <span className="badge">HTML5</span>
                <span className="badge">CSS3</span>
                <span className="badge">SCSS</span>
                <span className="badge">Tailwind CSS</span>
                <span className="badge">GSAP</span>
                <span className="badge">Three.js</span>
              </div>
            </div>
            <div className="tech-group">
              <span className="group-label">Backend</span>
              <div className="tech-badges">
                <span className="badge">PHP</span>
                <span className="badge">MySQL</span>
                <span className="badge">Firebase</span>
                <span className="badge">REST API</span>
              </div>
            </div>
            <div className="tech-group">
              <span className="group-label">Tools</span>
              <div className="tech-badges">
                <span className="badge">Git</span>
                <span className="badge">GitHub</span>
                <span className="badge">Vercel</span>
                <span className="badge">Postman</span>
                <span className="badge">Figma</span>
                <span className="badge">VS Code</span>
              </div>
            </div>
          </div>
        </div>

        <h1 className="corner-text">01-ABOUT</h1>
        <span className="watermark">DG</span>
      </div>
    </section>
  );
};

export default About;
