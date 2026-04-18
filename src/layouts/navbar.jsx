// layouts/navbar.jsx
import React from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins required for smooth scrolling
gsap.registerPlugin(ScrollToPlugin);

import { useActiveLink } from "../hooks/useActiveLink";
import { useMobileMenu } from "../hooks/useMobileMenu";
import useNavAnimation from "../hooks/useNavAnimation";
import "./navbar.scss";

/**
 * Navbar Component
 *
 * The primary navigation interface for the portfolio.
 *
 * Features:
 * - Smooth scrolling to sections using GSAP ScrollToPlugin.
 * - Active state tracking to highlight the current section in view.
 * - Responsive design with a dedicated mobile overlay menu.
 * - Coordinated animations for menu opening/closing and link interactions.
 */
const Navbar = () => {
  // Initialize entrance animations for navbar elements
  useNavAnimation();

  // Define the sequence of page sections for navigation
  const sections = ["home", "about", "projects", "principles", "contact"];

  // Track which section is currently visible in the viewport
  const activeSection = useActiveLink(sections);

  // Manage mobile menu state (open, closing, toggle, close)
  const { isOpen, isClosing, toggle, close } = useMobileMenu();

  /**
   * Handles navigation link clicks.
   *
   * - Prevents default anchor jump behavior.
   * - If the mobile menu is open, it closes the menu first, waits for the
   *   exit animation (450ms), and then scrolls to the target section.
   * - If the menu is closed, it scrolls immediately.
   * - Uses GSAP ScrollToPlugin for a smooth, eased transition.
   *
   * @param {string} section - The ID of the target section (e.g., 'about').
   */
  const handleLinkClick = (section) => {
    if (isOpen) {
      close();
      // Delay scroll until the mobile menu exit animation completes
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
        {/* ── DESKTOP MENU ── */}
        <div className="desktop-menu">
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              // Apply 'active' class if this section is currently in view
              className={activeSection === section ? "active" : ""}
              onClick={(e) => {
                e.preventDefault(); // Prevent default hash jump
                handleLinkClick(section);
              }}
            >
              {/* Capitalize first letter for display (e.g., "home" -> "Home") */}
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>

        {/* ── MOBILE MENU TOGGLE ── */}
        <button
          className="mobile-menu-btn"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            toggle();
          }}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* ── MOBILE OVERLAY MENU ── */}
        {/* Render menu if it's open or currently closing (to allow exit animation) */}
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
