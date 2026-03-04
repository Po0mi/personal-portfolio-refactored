import React from "react";
import { useActiveLink } from "../hooks/useActiveLink";
import { useMobileMenu } from "../hooks/useMobileMenu";
import useNavAnimation from "../hooks/useNavAnimation";
// import Logo from "./assets/code-block-svgrepo-com.svg";
import "./navbar.scss";

/**
 * Navbar Component
 *
 * A responsive navigation bar that provides:
 * - Desktop horizontal menu for larger screens
 * - Animated mobile hamburger menu for smaller screens
 * - Active link highlighting based on scroll position
 * - Smooth scrolling to page sections
 *
 * @component
 * @example
 * return (
 *   <Navbar />
 * )
 */
const Navbar = () => {
  useNavAnimation();
  // Define the navigation sections/links
  const sections = ["home", "about", "projects", "contact"];

  /**
   * Custom hook that tracks which section is currently in view
   * Returns the ID of the active section (e.g., "home", "about")
   */
  const activeSection = useActiveLink(sections);

  /**
   * Custom hook that manages mobile menu state and animations
   * @returns {Object} Mobile menu state and controls
   * @property {boolean} isOpen - Whether menu is currently open
   * @property {boolean} isClosing - Whether menu is in closing animation
   * @property {Function} toggle - Toggles menu open/close
   * @property {Function} close - Closes menu with animation
   */
  const { isOpen, isClosing, toggle, close } = useMobileMenu();

  /**
   * Handles clicking on a navigation link
   * Closes mobile menu (if open) and smoothly scrolls to target section
   *
   * @param {string} section - The ID of the section to scroll to
   */
  const handleLinkClick = (section) => {
    close(); // Close mobile menu first
    // Find the section element and smoothly scroll to it
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand - Always visible, links to home */}
        {/* <a
          href="#home"
          className="logo"
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            handleLinkClick("home");
          }}
        >
          <img src={Logo} alt="logo " />
        </a> */}

        {/* Desktop Menu - Hidden on mobile devices (CSS media query) */}
        <div className="desktop-menu">
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              // Apply 'active' class if this section is currently in view
              className={activeSection === section ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(section);
              }}
            >
              {/* Capitalize first letter: home → Home, about → About */}
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button (Hamburger) - Only visible on mobile */}
        <button
          className="mobile-menu-btn"
          onClick={toggle}
          aria-label="Toggle menu" // Accessibility: screen readers
        >
          ☰ {/* Hamburger icon */}
        </button>

        {/* 
          Mobile Menu with Animation 
          - Rendered if menu is open OR in closing animation
          - This prevents the menu from disappearing before animation completes
        */}
        {(isOpen || isClosing) && (
          <div className={`mobile-menu ${isClosing ? "closing" : ""}`}>
            {/* Close button */}
            <button className="close-btn" onClick={close}>
              ✕ {/* X icon */}
            </button>

            {/* Mobile navigation links */}
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
