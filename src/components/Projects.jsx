import { useRef, useState } from "react";
import useProjectsAnimation from "../hooks/useProjectsAnimation";
// Project Assets
import PRC from "../assets/project.webp";
import Headphones from "../assets/project7.webp";
import portfolio from "../assets/project4.webp";
import CafeV2 from "../assets/project5.webp";
import CareHome from "../assets/project6.webp";
import Ebook from "../assets/project8.webp";
import Retrolume from "../assets/project9.webp";
import WhatMenCrave from "../assets/project10.webp";
import Lumiere from "../assets/project11.webp";
import "./Projects.scss";

const TABS = ["All", "Frontend", "Full Stack"];

const projects = [
  {
    number: "01",
    title: "PRC Management System",
    meta: "2024 — Full Stack",
    category: "Full Stack",
    tech: ["React", "PHP", "Firebase", "MySQL", "Leaflet", "EmailJS"],
    preview: PRC,
    url: "https://philippineredcross-iloilochapter.org",
  },
  {
    number: "02",
    title: "AeroPulse",
    meta: "2026 — Frontend",
    category: "Frontend",
    tech: ["React", "Vite", "SCSS", "GSAP", "Lenis"],
    preview: Headphones,
    url: "https://aero-pulse-eight.vercel.app",
  },
  {
    number: "03",
    title: "Portfolio v2",
    meta: "2026 — Frontend",
    category: "Frontend",
    tech: ["React", "Vite", "SCSS", "GSAP"],
    preview: portfolio,
    url: "https://dandev.online",
  },
  {
    number: "04",
    title: "Unica's Cafe v2",
    meta: "2026 — Frontend",
    category: "Frontend",
    tech: ["React", "SCSS", "GSAP", "Leaflet", "EmailJS"],
    preview: CafeV2,
    url: "https://unicascafe.shop",
  },
  {
    number: "05",
    title: "Sycamore Care Home",
    meta: "2026 — Frontend",
    category: "Frontend",
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
    url: "https://www.sycamorecottageresthome.com",
  },
  {
    number: "06",
    title: "E-book Landing Page",
    meta: "2026 — Frontend",
    category: "Frontend",
    tech: ["NextJS", "SCSS", "GSAP", "Lenis"],
    preview: Ebook,
    url: "https://e-book-landing-page-indol.vercel.app",
  },
  {
    number: "07",
    title: "Retrolume",
    meta: "2026 — Frontend",
    category: "Frontend",
    tech: ["NextJS", "SCSS", "GSAP", "Lenis"],
    preview: Retrolume,
    url: "https://retrolume-nu.vercel.app",
  },
  {
    number: "09",
    title: "What Men Crave",
    meta: "2026 — Funnel Website",
    category: "Frontend",
    tech: ["NextJS", "SCSS", "GSAP"],
    preview: WhatMenCrave,
    url: " https://getwhatmencrave.com",
  },
  {
    number: "10",
    title: "Lumiere Library",
    meta: "2026 — Frontend",
    category: "Frontend",
    tech: ["NextJS", "SCSS", "GSAP"],
    preview: Lumiere,
    url: "https://lumier-library.vercel.app",
  },
];

const Projects = () => {
  const headerRef = useRef(null);
  const gutterLabelRef = useRef(null);
  const gridRef = useRef(null);
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  useProjectsAnimation({ headerRef, gridRef, gutterLabelRef, activeTab });

  const handleCardClick = (url) => {
    window.open(url, "_blank", "noopener noreferrer");
  };

  return (
    <section className="projects" id="projects">
      <div className="noise" />

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

        <div className="project-content">
          {/* Filter Tabs */}
          <div className="project-tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`tab-btn${activeTab === tab ? " active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="project-grid" ref={gridRef}>
            {filtered.map((project) => (
              <div
                key={project.number}
                className="project-card"
                onClick={() => handleCardClick(project.url)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleCardClick(project.url)
                }
              >
                <div className="card-image">
                  <img src={project.preview} alt={project.title} />
                  <div className="card-overlay">
                    <span className="card-arrow">↗</span>
                  </div>
                </div>

                <div className="card-body">
                  <div className="card-meta-row">
                    <span className="card-number">{project.number}</span>
                    <span className="card-meta">{project.meta}</span>
                  </div>
                  <h3 className="card-title">{project.title}</h3>
                  <div className="card-tech">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
