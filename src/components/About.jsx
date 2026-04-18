import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import useMaskAnimation from "../hooks/useMaskAnimation";
import "./About.scss";

/**
 * About Component
 *
 * Displays the user's professional summary and technical stack.
 *
 * Features:
 * - Word-by-word mask reveal animation for the introductory paragraph.
 * - Scroll-triggered entrance for the "About" gutter label.
 * - Staggered, scroll-triggered entrance for technology badges (Frontend, Backend, Tools).
 * - Responsive grid layout for skill categorization.
 */
const About = () => {
  // -- Refs for Content Elements --
  const paragraphRef = useRef(null); // Introductory text
  const frontendRef = useRef(null); // Container for Frontend badges
  const backendRef = useRef(null); // Container for Backend badges
  const toolsRef = useRef(null); // Container for Tool badges
  const gutterLabelRef = useRef(null); // The vertical "About" label on the left

  /**
   * Paragraph Reveal Animation
   * Uses a custom hook to apply a masking effect to the words in the paragraph.
   * This creates a sophisticated "reveal" effect as the user scrolls or on load.
   */
  useMaskAnimation([paragraphRef], "word");

  // ── GUTTER LABEL ANIMATION ──
  /**
   * Animates the vertical "About" label in the left gutter.
   *
   * - Uses IntersectionObserver to trigger only when the label is 50% visible.
   * - Fades in and slides up using GSAP.
   * - Unobserves after triggering to ensure the animation plays only once.
   */
  useEffect(() => {
    const label = gutterLabelRef.current;
    if (!label) return;

    // Set initial hidden state
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
            // Stop observing once animated
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }, // Trigger when 50% of the element is visible
    );

    observer.observe(label);

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, []);

  // ── TECH BADGES STAGGERED ENTRANCE ──
  /**
   * Handles the entrance animation for the technology badges.
   *
   * - Groups badges by category (Frontend, Backend, Tools).
   * - Uses IntersectionObserver with a negative rootMargin to trigger
   *   slightly before the element fully enters the viewport.
   * - Animates badges with a stagger effect, including a subtle skew
   *   for a dynamic "sliding into place" feel.
   */
  useEffect(() => {
    const groups = [
      frontendRef.current,
      backendRef.current,
      toolsRef.current,
    ].filter(Boolean); // Ensure refs are resolved

    groups.forEach((group) => {
      const badges = group.querySelectorAll(".badge");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(
                badges,
                // From state: invisible, slightly down, skewed left
                { opacity: 0, y: 10, skewX: -10 },
                // To state: visible, original position, no skew
                {
                  opacity: 1,
                  y: 0,
                  skewX: 0,
                  duration: 0.4,
                  ease: "power4.out",
                  stagger: 0.04, // Delay between each badge
                },
              );
              // Stop observing this group once animated
              observer.unobserve(entry.target);
            }
          });
        },
        // Trigger when the top of the group hits the bottom of the viewport minus 80px
        { threshold: 0, rootMargin: "0px 0px -80px 0px" },
      );

      observer.observe(group);
    });

    // Note: Cleanup for multiple observers is handled by disconnecting
    // when the component unmounts if we stored them, but here each
    // observer is local to the loop iteration. In strict mode,
    // React may cleanup effects aggressively.
    // For production, consider storing observers in a ref array if cleanup issues arise.
  }, []);

  return (
    <section className="about" id="about">
      <div className="about-container">
        {/* Left Gutter: Vertical Label */}
        <div className="about-gutter">
          <span className="gutter-label" ref={gutterLabelRef}>
            About
          </span>
        </div>

        {/* Main Content: Intro Paragraph */}
        <p className="first-paragraph" ref={paragraphRef}>
          I'm, Dan Gabrielle De Castro, a 4th-year IT student at Central
          Philippine University, building real-world experience in web
          development, networking, and system design. Passionate about
          problem-solving and creating user-friendly interfaces, eager to apply
          my skills beyond the classroom.
        </p>

        {/* Technical Skills Section */}
        <div className="tech-section">
          <div className="tech-divider">
            <span className="tech-label">Technologies</span>
          </div>

          <div className="tech-grid">
            {/* Frontend Stack */}
            <div className="tech-group" ref={frontendRef}>
              <span className="group-label">Frontend</span>
              <div className="tech-badges">
                <span className="badge">React</span>
                <span className="badge">Next.js</span>
                <span className="badge">Vite</span>
                <span className="badge">TypeScript</span>
                <span className="badge">JavaScript</span>
                <span className="badge">HTML5</span>
                <span className="badge">CSS3</span>
                <span className="badge">SCSS</span>
                <span className="badge">Tailwind CSS</span>
                <span className="badge">GSAP</span>
                <span className="badge">Three.js</span>
                <span className="badge">Leaflet.js</span>
              </div>
            </div>

            {/* Backend Stack */}
            <div className="tech-group" ref={backendRef}>
              <span className="group-label">Backend</span>
              <div className="tech-badges">
                <span className="badge">PHP</span>
                <span className="badge">MySQL</span>
                <span className="badge">Firebase</span>
                <span className="badge">REST API</span>
                <span className="badge">EmailJS</span>
                <span className="badge">Sanity Studio</span>
              </div>
            </div>

            {/* Tools & Software */}
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

        {/* Background Watermark for Section Numbering */}
        <span className="watermark">01</span>
      </div>
    </section>
  );
};

export default About;
