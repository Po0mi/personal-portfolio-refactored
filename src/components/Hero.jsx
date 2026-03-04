import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import useHeroAnimation from "../hooks/useHeroAnimation";
import "./Hero.scss";

const Hero = () => {
  const topTitleRef = useRef(null);
  const middleTitleRef = useRef(null);
  const bottomTitleRef = useRef(null);
  const nameRef = useRef(null);

  useHeroAnimation({ topTitleRef, middleTitleRef, bottomTitleRef });

  // parallax on top and bottom titles
  useEffect(() => {
    const top = topTitleRef.current;
    const bottom = bottomTitleRef.current;
    if (!top || !bottom) return;

    const onMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      gsap.to(top, {
        x: dx * -20,
        y: dy * -10,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(bottom, {
        x: dx * 20,
        y: dy * 10,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <h1 className="top-title" ref={topTitleRef}>
          FRONTEND
        </h1>

        <div className="middle-block">
          <h2 className="middle-title" ref={middleTitleRef}>
            PORTFOLIO
          </h2>
          <p className="hero-name" ref={nameRef}>
            DAN GABRIELLE DE CASTRO
          </p>
        </div>

        <h1 className="bottom-title" ref={bottomTitleRef}>
          DEVELOPER
        </h1>
      </div>
    </section>
  );
};

export default Hero;
