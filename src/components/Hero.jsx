import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import useHeroAnimation from "../hooks/useHeroAnimation";
import "./Hero.scss";

/**
 * Hero Component
 *
 * The main landing section of the portfolio. It features a split-screen layout:
 * - Left Side: A bold "FRONTEND" title that slides in from the left.
 * - Right Side contains the user's name and a stacked typography animation
 *   ("DEVELOPER / PORTFOLIO / DEVELOPER") handled by a custom hook.
 *
 * Features:
 * - Staggered entrance animations using GSAP timelines.
 * - Mouse-move parallax effect on the right-side typography.
 */
const Hero = () => {
  // -- Refs for Typography Elements (Right Side) --
  // These are passed to the custom hook for the initial text reveal animation
  const topTitleRef = useRef(null); // "PORTFOLIO" (Filled)
  const middleTitleRef = useRef(null); // "DEVELOPER" (Outline)
  const bottomTitleRef = useRef(null); // "DEVELOPER" (Outline Faint)
  const bottomTitleRef2 = useRef(null); // Additional layer if needed for stack depth

  // -- Refs for Layout & Identity --
  const nameRef = useRef(null); // "Dan Gabrielle De Castro"
  const heroLeftRef = useRef(null); // Container for the orange left block
  const heroRightRef = useRef(null); // Container for the dark right side

  /**
   * Initial Text Reveal Animation
   * Handles the staggered entrance of the "FRONTEND", "DEVELOPER", and "PORTFOLIO" text elements.
   * Logic is encapsulated in the custom hook to keep this component clean.
   */
  useHeroAnimation({
    topTitleRef,
    middleTitleRef,
    bottomTitleRef,
    bottomTitleRef2,
  });

  // ── PARALLAX EFFECT ──
  /**
   * Applies a subtle mouse-follow parallax effect to the right-side typography.
   *
   * - Calculates mouse position relative to the center of the screen.
   * - Moves the top title slightly opposite to the mouse direction.
   * - Moves the bottom titles slightly with the mouse direction.
   * - Uses GSAP for smooth interpolation (duration: 0.8s) to prevent jitter.
   */
  useEffect(() => {
    const top = topTitleRef.current;
    const bottom = bottomTitleRef.current;
    const bottom2 = bottomTitleRef2.current;

    // Safety check: Ensure elements exist before attaching listener
    if (!top || !bottom) return;

    const onMouseMove = (e) => {
      // Normalize mouse coordinates to a range of -1 to 1
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      // Move top title opposite to mouse (depth effect)
      gsap.to(top, {
        x: dx * -20,
        y: dy * -10,
        duration: 0.8,
        ease: "power2.out",
      });

      // Move bottom titles with the mouse
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

    // Cleanup listener on unmount to prevent memory leaks
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // ── ORANGE BLOCK & LAYOUT ENTRANCE ──
  /**
   * Controls the initial page load animation sequence:
   * 1. Sets initial hidden states (orange block off-screen left, right side invisible).
   * 2. Slams the orange left block into view (xPercent: 0).
   * 3. Fades in the right side content as the block settles.
   * 4. Fades up the user's name last for a polished finish.
   */
  useEffect(() => {
    const left = heroLeftRef.current;
    const right = heroRightRef.current;
    const name = nameRef.current;

    if (!left || !right) return;

    // Set initial states immediately before animation starts
    gsap.set(left, { xPercent: -100, opacity: 0 });
    gsap.set(right, { opacity: 0 });
    gsap.set(name, { opacity: 0, y: 8 });

    // Create a timeline with a slight delay for page load feel
    const tl = gsap.timeline({ delay: 0.1 });

    tl
      // 1. Orange block slams in from left
      .to(left, {
        xPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
      })
      // 2. Right side fades in as orange settles (overlaps by 0.4s)
      .to(
        right,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4",
      )
      // 3. Name fades up last (overlaps by 0.2s)
      .to(
        name,
        {
          opacity: 0.2, // Note: Intentional low opacity for stylistic subtlety? Or should be 1?
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2",
      );

    // Kill timeline on unmount to prevent state updates on unmounted components
    return () => tl.kill();
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        {/* Left Side: Orange Block with "FRONTEND" */}
        <div className="hero-left" ref={heroLeftRef}>
          <h1 className="left-big" ref={topTitleRef}>
            FRONTEND
          </h1>
        </div>

        {/* Right Side: Dark Background with Name and Stack */}
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
