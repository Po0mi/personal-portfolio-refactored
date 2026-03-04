import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Principles.scss";

const principles = [
  {
    number: "01",
    title: "CLEAN CODE",
    tag: "Development",
    highlight: "I try to write code that actually makes sense.",
    desc: " Meaningful names, modular structure, and clear indentation — lifesavers when projects grow. I'd rather be clear than show off.",
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
    desc: " Pages shouldn't take forever to load. Lightweight, efficient — whether that's images, code, or animations. Lazy loading isn't a buzzword.",
  },
  {
    number: "04",
    title: "COMMUNICATION",
    tag: "Collaboration",
    highlight: "I try to be clear and open.",
    desc: " Comments in code, pull requests, chatting with teammates — misunderstandings waste time. Documenting stuff is leaving a breadcrumb trail for future me.",
  },
  {
    number: "05",
    title: "LEARNING",
    tag: "Growth",
    highlight: "I'm always trying to learn something new.",
    desc: " CSS tricks, JS frameworks, AI tools — the web moves fast. Experiment, break things, see what sticks. Staying curious helps me grow.",
  },
];

const Principles = () => {
  const rowRefs = useRef([]);

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean);
    if (!rows.length) return;

    rows.forEach((row, i) => {
      gsap.fromTo(
        row,
        { x: -40, opacity: 0, skewX: -8 },
        {
          x: 0,
          opacity: 1,
          skewX: 0,
          duration: 0.5,
          ease: "power4.out",
          delay: i * 0.07,
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
          },
        },
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="principles" id="principles">
      <div className="noise" />

      <div className="principles-container">
        <div className="section-header">
          <span className="section-count">05 TOTAL</span>
        </div>

        <div className="principles-list">
          {principles.map((p, i) => (
            <div
              key={p.number}
              className="principle-row"
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

        <h1 className="corner-text">03-PRINCIPLES</h1>
      </div>
    </section>
  );
};

export default Principles;
