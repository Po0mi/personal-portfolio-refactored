import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import useMaskAnimation from "../hooks/useMaskAnimation";
import "./About.scss";

const About = () => {
  const paragraphRef = useRef(null);
  const frontendRef = useRef(null);
  const backendRef = useRef(null);
  const toolsRef = useRef(null);
  const gutterLabelRef = useRef(null); // ← add this

  useMaskAnimation([paragraphRef], "word");

  // ── GUTTER LABEL ANIMATION ──
  useEffect(() => {
    const label = gutterLabelRef.current;
    if (!label) return;

    gsap.set(label, { opacity: 0, y: 20 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(label, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power4.out",
              delay: 0.2,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(label);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const groups = [
      frontendRef.current,
      backendRef.current,
      toolsRef.current,
    ].filter(Boolean);

    groups.forEach((group) => {
      const badges = group.querySelectorAll(".badge");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(
                badges,
                { opacity: 0, y: 10, skewX: -10 },
                {
                  opacity: 1,
                  y: 0,
                  skewX: 0,
                  duration: 0.4,
                  ease: "power4.out",
                  stagger: 0.04,
                },
              );
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0, rootMargin: "0px 0px -80px 0px" },
      );
      observer.observe(group);
    });
  }, []);

  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-gutter">
          <span className="gutter-label" ref={gutterLabelRef}>
            About
          </span>
        </div>

        <p className="first-paragraph" ref={paragraphRef}>
          I'm, Dan Gabrielle De Castro, a 4th-year IT student at Central
          Philippine University, building real-world experience in web
          development, networking, and system design. Passionate about
          problem-solving and creating user-friendly interfaces, eager to apply
          my skills beyond the classroom.
        </p>

        <div className="tech-section">
          <div className="tech-divider">
            <span className="tech-label">Technologies</span>
          </div>
          <div className="tech-grid">
            <div className="tech-group" ref={frontendRef}>
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
            <div className="tech-group" ref={backendRef}>
              <span className="group-label">Backend</span>
              <div className="tech-badges">
                <span className="badge">PHP</span>
                <span className="badge">MySQL</span>
                <span className="badge">Firebase</span>
                <span className="badge">REST API</span>
              </div>
            </div>
            <div className="tech-group" ref={toolsRef}>
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

        <span className="watermark">01</span>
      </div>
    </section>
  );
};

export default About;
