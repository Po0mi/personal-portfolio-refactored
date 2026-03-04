// layouts/navbar.jsx
import React from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import { useActiveLink } from "../hooks/useActiveLink";
import { useMobileMenu } from "../hooks/useMobileMenu";
import useNavAnimation from "../hooks/useNavAnimation";
import "./navbar.scss";

const Navbar = () => {
  useNavAnimation();

  const sections = ["home", "about", "projects", "contact"];
  const activeSection = useActiveLink(sections);
  const { isOpen, isClosing, toggle, close } = useMobileMenu();

  const handleLinkClick = (section) => {
    if (isOpen) {
      close();
      setTimeout(() => {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: `#${section}`, offsetY: 0 },
          ease: "power3.inOut",
        });
      }, 450);
    } else {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: `#${section}`, offsetY: 0 },
        ease: "power3.inOut",
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Desktop Menu */}
        <div className="desktop-menu">
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={activeSection === section ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(section);
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Mobile Menu */}
        {(isOpen || isClosing) && (
          <div className={`mobile-menu ${isClosing ? "closing" : ""}`}>
            <button className="close-btn" onClick={close}>
              ✕
            </button>
            <div className="mobile-links">
              {sections.map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={activeSection === section ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(section);
                  }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
