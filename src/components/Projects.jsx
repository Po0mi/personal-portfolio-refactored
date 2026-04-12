import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import useProjectsAnimation from "../hooks/useProjectsAnimation";
import PRC from "../assets/project.png";
import Cafe from "../assets/project2.png";
import Game from "../assets/project3.png";
import portfolio from "../assets/project4.png";
import CafeV2 from "../assets/project5.png";
import CareHome from "../assets/project6.png";
import "./Projects.scss";

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
    title: "Pinas Guide",
    meta: "2026 — Frontend",
    tech: ["React", "Vite", "SCSS", "GSAP"],
    preview: Game,
    label: "Wysteria Guild Site",
    url: "https://tourism-website-eta-nine.vercel.app",
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

const Projects = () => {
  const previewRef = useRef(null);
  const animFrameRef = useRef(null);
  const headerRef = useRef(null);
  const gutterLabelRef = useRef(null); // ← add

  const row0 = useRef(null);
  const row1 = useRef(null);
  const row2 = useRef(null);
  const row3 = useRef(null);
  const row4 = useRef(null);
  const row5 = useRef(null);
  const rowRefs = [row0, row1, row2, row3, row4, row5];

  const mouse = useRef({ x: 0, y: 0 });
  const previewPos = useRef({ x: 0, y: 0 });

  const [activeProject, setActiveProject] = useState(null);

  useProjectsAnimation({ headerRef, rowRefs });

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

  const handleRowClick = (url) => {
    window.open(url, "_blank", "noopener noreferrer");
  };

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
        <h1 className="corner-text">02</h1>

        <div className="projects-gutter">
          <span className="gutter-label" ref={gutterLabelRef}>
            Projects
          </span>
        </div>

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
              onClick={() => handleRowClick(project.url)}
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
