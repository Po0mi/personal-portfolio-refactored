import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import useProjectsAnimation from "../hooks/useProjectsAnimation";
// Project Assets
import PRC from "../assets/project.webp";
import Headphones from "../assets/project7.webp";
import Game from "../assets/project3.webp";
import portfolio from "../assets/project4.webp";
import CafeV2 from "../assets/project5.webp";
import CareHome from "../assets/project6.webp";
import "./Projects.scss";

/**
 * Data: Selected Projects
 *
 * An array of objects containing project details, tech stacks, and assets.
 * Used to render the interactive project list and the floating preview image.
 */
const projects = [
  {
    number: "01",
    title: "PRC Management System",
    meta: "2024 — Full Stack",
    tech: ["React", "PHP", "Firebase", "MySQL", "Leaflet", "EmailJS"],
    preview: PRC,
    label: "Philippine Red Cross",
    url: "https://philippineredcross-iloilochapter.org",
  },
  {
    number: "02",
    title: "AeroPulse",
    meta: "2026 — Frontend",
    tech: ["React", "Vite", "SCSS", "GSAP", "Lenis"],
    preview: Headphones,
    label: "AeroPulse Website",
    url: "https://aero-pulse-eight.vercel.app",
  },
  {
    number: "03",
    title: "Portfolio v2",
    meta: "2026 — Frontend",
    tech: ["React", "Vite", "SCSS", "GSAP"],
    preview: portfolio,
    label: "Personal Portfolio",
    url: "https://dandev.online",
  },
  {
    number: "04",
    title: "Unica's Cafe v2",
    meta: "2026 — Frontend",
    tech: ["React", "Vite", "SCSS", "GSAP", "Leaflet", "EmailJS"],
    preview: CafeV2,
    label: "Unica's Cafe Website",
    url: "https://unicascafe.shop",
  },
  {
    number: "05",
    title: "Sycamore Care Home",
    meta: "2026 — Frontend",
    tech: [
      "NextJS",
      "Vite",
      "SCSS",
      "GSAP",
      "Leaflet",
      "EmailJS",
      "Sanity Studio",
    ],
    preview: CareHome,
    label: "Care Home Website",
    url: "https://www.sycamorecottageresthome.com",
  },
];

/**
 * Projects Component
 *
 * Displays a list of selected works with an interactive "hover-reveal" effect.
 *
 * Features:
 * - A floating preview image that follows the cursor with a smooth "lag" effect.
 * - Dynamic content switching in the preview based on the hovered row.
 * - Scroll-triggered entrance animations for the header and rows (via custom hook).
 * - Accessible click handlers to open project links in new tabs.
 */
const Projects = () => {
  // -- Refs for Animation & Layout --
  const previewRef = useRef(null); // The floating image container
  const animFrameRef = useRef(null); // Stores the requestAnimationFrame ID for cleanup
  const headerRef = useRef(null); // "Selected Work" header
  const gutterLabelRef = useRef(null); // Vertical "Projects" label

  // Array of refs for each project row, used by the custom animation hook
  const row0 = useRef(null);
  const row1 = useRef(null);
  const row2 = useRef(null);
  const row3 = useRef(null);
  const row4 = useRef(null);
  const row5 = useRef(null);
  const rowRefs = [row0, row1, row2, row3, row4, row5];

  // -- Mouse Tracking State --
  // Using refs instead of state for mouse coordinates to avoid re-renders on every pixel move
  const mouse = useRef({ x: 0, y: 0 });
  const previewPos = useRef({ x: 0, y: 0 });

  // -- Active Project State --
  // Controls which project's image and label are currently visible in the preview
  const [activeProject, setActiveProject] = useState(null);

  /**
   * Row & Header Entrance Animation
   * Handles the staggered reveal of the project list items and the section header.
   */
  useProjectsAnimation({ headerRef, rowRefs });

  // ── GUTTER LABEL ANIMATION ──
  /**
   * Animates the vertical "Projects" label in the left gutter.
   * Uses IntersectionObserver to trigger a fade-up effect when the label enters the viewport.
   */
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

  // ── SMOOTH CURSOR FOLLOWER (LERP) ──
  /**
   * Implements a custom animation loop to make the preview image follow the mouse.
   *
   * Why not just use CSS or GSAP?
   * - We need high-performance updates (60fps) without triggering React re-renders.
   * - We use Linear Interpolation (Lerp) to create a "smooth lag" effect.
   *
   * The Math:
   * current = current + (target - current) * factor
   * - factor (0.08) determines the "heaviness" or lag of the movement.
   */
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Update target mouse position
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // The Animation Loop
    const animate = () => {
      // Calculate the new position based on the lerp formula
      previewPos.current.x = lerp(previewPos.current.x, mouse.current.x, 0.08);
      previewPos.current.y = lerp(previewPos.current.y, mouse.current.y, 0.08);

      // Directly manipulate the DOM for performance (bypassing React render cycle)
      if (previewRef.current) {
        previewRef.current.style.left = `${previewPos.current.x}px`;
        previewRef.current.style.top = `${previewPos.current.y}px`;
      }

      // Request the next frame
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // Cleanup: Remove listener and stop the animation loop
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  /**
   * Handles opening the project URL in a new tab.
   * Includes security attributes (noopener noreferrer) to prevent tabnabbing.
   */
  const handleRowClick = (url) => {
    window.open(url, "_blank", "noopener noreferrer");
  };

  return (
    <section className="projects" id="projects">
      <div className="noise" />

      {/* Floating Preview Image */}
      <div
        className={`project-preview ${activeProject ? "visible" : ""}`}
        ref={previewRef}
      >
        {activeProject && (
          <>
            <img src={activeProject.preview} alt={activeProject.title} />
            <span className="preview-label">{activeProject.label}</span>
          </>
        )}
      </div>

      <div className="projects-container">
        {/* Background Watermark */}
        <h1 className="corner-text">02</h1>

        {/* Left Gutter Label */}
        <div className="projects-gutter">
          <span className="gutter-label" ref={gutterLabelRef}>
            Projects
          </span>
        </div>

        {/* Section Header */}
        <div className="section-header" ref={headerRef}>
          <span className="section-title">Selected Work</span>
        </div>

        {/* Interactive Project List */}
        <div className="project-list">
          {projects.map((project, i) => (
            <div
              key={project.number}
              className="project-row"
              ref={rowRefs[i]}
              // Hover events control the visibility and content of the preview
              onMouseEnter={() => setActiveProject(project)}
              onMouseLeave={() => setActiveProject(null)}
              // Click event opens the project link
              onClick={() => handleRowClick(project.url)}
              // Accessibility: Make the div act like a link
              role="link"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === "Enter" && handleRowClick(project.url)
              }
            >
              <span className="project-number">{project.number}</span>
              <span className="project-title">{project.title}</span>

              <div className="project-right">
                <span className="project-meta">{project.meta}</span>
                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="project-arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
