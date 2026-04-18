import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrinciplesAnimation from "../hooks/usePrinciplesAnimation";
import "./Principles.scss";

// Register ScrollTrigger with GSAP to enable scroll-based animations
gsap.registerPlugin(ScrollTrigger);

/**
 * Data: Professional Principles
 *
 * An array of objects defining the core values of the developer.
 * Used to render both the "Interrupt" summary block and the detailed list below.
 */
const principles = [
  {
    number: "01",
    title: "CLEAN CODE",
    tag: "Development",
    highlight: "I try to write code that actually makes sense.",
    desc: " Meaningful names, modular structure, and clear indentation, lifesavers when projects grow. I'd rather be clear than show off.",
  },
  {
    number: "02",
    title: "USER FIRST",
    tag: "Design",
    highlight: "I build with real users in mind.",
    desc: " Natural, easy to use on any device. From buttons to animations, I try to think like someone actually using the site. No sneaky tricks.",
  },
  {
    number: "03",
    title: "PERFORMANCE",
    tag: "Optimization",
    highlight: "I care about speed and smoothness.",
    desc: " Pages shouldn't take forever to load. Lightweigh and efficient, whether that's images, code, or animations. Lazy loading isn't a buzzword.",
  },
  {
    number: "04",
    title: "COMMUNICATION",
    tag: "Collaboration",
    highlight: "I try to be clear and open.",
    desc: " Comments in code, pull requests, and chats with teammates matter because misunderstandings waste time. Documenting things is like leaving a breadcrumb trail for future me.",
  },
  {
    number: "05",
    title: "LEARNING",
    tag: "Growth",
    highlight: "I'm always trying to learn something new. ",
    desc: "CSS tricks, JavaScript frameworks, and AI tools, the web changes fast. I like to explore, try things out, and even break stuff sometimes just to see how it works. Staying curious is what keeps me learning and improving.",
  },
];

/**
 * Principles Component
 *
 * Showcases the developer's core professional values.
 *
 * Structure:
 * 1. Interrupt Block: A high-contrast summary section (Orange/Dark split)
 *    that breaks the visual flow to highlight key stats and principle titles.
 * 2. Detailed List: A vertical list of principles that animate in as the
 *    user scrolls down.
 *
 * Animations:
 * - Complex entrance animations for the interrupt block (handled by custom hook).
 * - Staggered, scroll-triggered reveal for each principle row using GSAP ScrollTrigger.
 */
const Principles = () => {
  // -- Refs for Dynamic Elements --
  // Using an array ref to store references to each .principle-row div
  const rowRefs = useRef([]);

  // Refs for the "Interrupt" block elements (passed to custom hook)
  const gutterLabelRef = useRef(null);
  const interruptOrangeRef = useRef(null);
  const interruptDarkRef = useRef(null);

  /**
   * Interrupt & Gutter Animation
   * Handles the initial reveal of the split-screen interrupt block and the side label.
   */
  usePrinciplesAnimation({
    interruptOrangeRef,
    interruptDarkRef,
    gutterLabelRef,
  });

  // ── SCROLL-TRIGGERED ROW ANIMATIONS ──
  /**
   * Animates each principle row as it enters the viewport.
   *
   * - Uses GSAP ScrollTrigger to link animation progress to scroll position.
   * - Each row starts slightly left (x: -40), invisible, and skewed.
   * - As the row hits 90% of the viewport height, it slides into place.
   * - Includes a small delay based on index (i * 0.07) for a cascading effect
   *   if multiple rows are visible at once.
   */
  useEffect(() => {
    // Filter out any null refs (React may populate these asynchronously)
    const rows = rowRefs.current.filter(Boolean);
    if (!rows.length) return;

    rows.forEach((row, i) => {
      gsap.fromTo(
        row,
        // From State: Hidden, shifted left, skewed
        { x: -40, opacity: 0, skewX: -8 },
        // To State: Visible, original position, no skew
        {
          x: 0,
          opacity: 1,
          skewX: 0,
          duration: 0.5,
          ease: "power4.out",
          delay: i * 0.07, // Stagger effect based on index
          scrollTrigger: {
            trigger: row, // The element that triggers the animation
            start: "top 90%", // Start when top of row hits 90% of viewport height
            // toggleActions: "play none none none" is default for fromTo
          },
        },
      );
    });

    // Cleanup: Kill all ScrollTrigger instances associated with this component
    // to prevent memory leaks and duplicate triggers on re-renders
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="principles" id="principles">
      {/* Background Noise Texture */}
      <div className="noise" />

      {/* ── INTERRUPT BLOCK ── 
          A visually distinct section that breaks the layout to grab attention.
      */}
      <div className="interrupt">
        <div className="interrupt-orange" ref={interruptOrangeRef}>
          <div>
            <div className="interrupt-stat">
              05
              <br />
              PROJ.
            </div>
            <div className="interrupt-stat-label">Shipped · 2024–2026</div>
          </div>
          <div className="interrupt-types">
            Full Stack · Frontend · Commissioned · Build · Design
          </div>
        </div>
        <div className="interrupt-dark" ref={interruptDarkRef}>
          {principles.map((p) => (
            <div key={p.number} className="interrupt-item">
              <span className="interrupt-num">{p.number}</span>
              <span className="interrupt-name">{p.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="principles-container">
        {/* Left Gutter Label */}
        <div className="principles-gutter">
          <span className="gutter-label" ref={gutterLabelRef}>
            Principles
          </span>
        </div>

        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">Principles</span>
        </div>

        {/* Principle Rows List */}
        <div className="principles-list">
          {principles.map((p, i) => (
            <div
              key={p.number}
              className="principle-row"
              // Callback ref to populate the rowRefs array
              ref={(el) => (rowRefs.current[i] = el)}
            >
              <span className="row-number">{p.number}</span>
              <span className="row-title">{p.title}</span>
              <p className="row-desc">
                <span className="highlight">{p.highlight}</span>
                {p.desc}
              </p>
              <span className="row-tag">{p.tag}</span>
            </div>
          ))}
        </div>

        {/* Background Watermark for Section Numbering */}
        <h1 className="corner-text">03</h1>
      </div>
    </section>
  );
};

export default Principles;
