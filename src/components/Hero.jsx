import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import useHeroAnimation from "../hooks/useHeroAnimation";
import "./Hero.scss";

const Hero = () => {
  const topTitleRef = useRef(null);
  const middleTitleRef = useRef(null);
  const bottomTitleRef = useRef(null);
  const bottomTitleRef2 = useRef(null);
  const nameRef = useRef(null);
  const heroLeftRef = useRef(null); // ← orange block
  const heroRightRef = useRef(null); // ← dark right side

  useHeroAnimation({
    topTitleRef,
    middleTitleRef,
    bottomTitleRef,
    bottomTitleRef2,
  });

  // ── PARALLAX ──
  useEffect(() => {
    const top = topTitleRef.current;
    const bottom = bottomTitleRef.current;
    const bottom2 = bottomTitleRef2.current;
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
      if (bottom2) {
        gsap.to(bottom2, {
          x: dx * 20,
          y: dy * 10,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // ── ORANGE BLOCK ENTRANCE ──
  useEffect(() => {
    const left = heroLeftRef.current;
    const right = heroRightRef.current;
    const name = nameRef.current;
    if (!left || !right) return;

    // set initial states
    gsap.set(left, { xPercent: -100, opacity: 0 });
    gsap.set(right, { opacity: 0 });
    gsap.set(name, { opacity: 0, y: 8 });

    const tl = gsap.timeline({ delay: 0.1 });

    // orange block slams in from left
    tl.to(left, {
      xPercent: 0,
      opacity: 1,
      duration: 0.9,
      ease: "expo.out",
    })
      // right side fades in as orange settles
      .to(
        right,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4",
      )
      // name fades up last
      .to(
        name,
        {
          opacity: 0.2,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2",
      );

    return () => tl.kill();
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-left" ref={heroLeftRef}>
          <h1 className="left-big" ref={topTitleRef}>
            FRONTEND
          </h1>
        </div>

        <div className="hero-right" ref={heroRightRef}>
          <p className="hero-name" ref={nameRef}>
            Dan Gabrielle <span>De Castro</span>
          </p>

          <div className="outline-stack">
            <h2 className="outline-word" ref={bottomTitleRef}>
              DEVELOPER
            </h2>
            <h2 className="filled-word" ref={middleTitleRef}>
              PORTFOLIO
            </h2>
            <h2 className="outline-word outline-faint" ref={bottomTitleRef2}>
              DEVELOPER
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
