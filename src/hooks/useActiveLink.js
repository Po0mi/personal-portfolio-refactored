import { useState, useEffect } from "react";

/**
 * Custom hook that tracks which section is currently visible in the viewport
 *
 * @param {string[]} sectionIds - Array of section IDs to track
 * @returns {string} The ID of the currently active section
 *
 * @example
 * const activeSection = useActiveLink(['home', 'about', 'contact']);
 * // Returns 'home' when home section is in view
 */
export const useActiveLink = (sectionIds) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    /**
     * Checks each section's position and sets the active one
     * A section is considered "active" when:
     * - Its top is above 100px from viewport top
     * - Its bottom is below 100px from viewport top
     */
    const handleScroll = () => {
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in the "active zone" (around 100px from top)
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break; // Stop once we find the first visible section
          }
        }
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);
    // Check initial position on mount
    handleScroll();

    // Cleanup: remove listener when component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]); // Re-run if sectionIds changes

  return activeSection;
};
