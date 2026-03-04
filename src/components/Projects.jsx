import { useRef, useEffect, useState } from "react";
import useProjectsAnimation from "../hooks/useProjectsAnimation";
import "./Projects.scss";

const projects = [
  {
    number: "001",
    title: "PRC Management System",
    meta: "2024 — Full Stack",
    tech: ["React", "PHP", "Firebase", "MySQL"],
    preview: "/images/prc-preview.jpg",
    label: "Philippine Red Cross",
  },
  {
    number: "002",
    title: "Unica's Cafe",
    meta: "2025 — Frontend",
    tech: ["React", "GSAP", "Vercel"],
    preview: "/images/unicas-preview.jpg",
    label: "Unica's Cafe Website",
  },
  {
    number: "003",
    title: "Wysteria Guild",
    meta: "2024 — Frontend",
    tech: ["HTML", "SCSS", "GSAP"],
    preview: "/images/wysteria-preview.jpg",
    label: "Wysteria Guild Site",
  },
  {
    number: "004",
    title: "Portfolio v2",
    meta: "2026 — Frontend",
    tech: ["React", "Vite", "SCSS"],
    preview: "/images/portfolio-preview.jpg",
    label: "Personal Portfolio",
  },
];

const Projects = () => {
  const previewRef = useRef(null);
  const animFrameRef = useRef(null);
  const headerRef = useRef(null);

  const row0 = useRef(null);
  const row1 = useRef(null);
  const row2 = useRef(null);
  const row3 = useRef(null);
  const rowRefs = [row0, row1, row2, row3];

  const mouse = useRef({ x: 0, y: 0 });
  const previewPos = useRef({ x: 0, y: 0 });

  const [activeProject, setActiveProject] = useState(null);

  useProjectsAnimation({ headerRef, rowRefs });

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      previewPos.current.x = lerp(previewPos.current.x, mouse.current.x, 0.08);
      previewPos.current.y = lerp(previewPos.current.y, mouse.current.y, 0.08);

      if (previewRef.current) {
        previewRef.current.style.left = previewPos.current.x + "px";
        previewRef.current.style.top = previewPos.current.y + "px";
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <section className="projects" id="projects">
      <div className="noise" />

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
        <h1 className="corner-text">02-PROJECTS</h1>

        <div className="section-header" ref={headerRef}>
          <span className="section-title">Selected Work</span>
        </div>

        <div className="project-list">
          {projects.map((project, i) => (
            <div
              key={project.number}
              className="project-row"
              ref={rowRefs[i]}
              onMouseEnter={() => setActiveProject(project)}
              onMouseLeave={() => setActiveProject(null)}
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
