import { useState } from "react";

/**
 * Custom hook for managing mobile menu state with animations
 *
 * @returns {Object} Mobile menu controls
 * @returns {boolean} isOpen - Current open state of the menu
 * @returns {boolean} isClosing - Whether menu is in closing animation
 * @returns {Function} toggle - Toggle menu open/close with animation
 * @returns {Function} close - Close menu with animation
 * @returns {Function} open - Open menu immediately
 *
 * @example
 * const { isOpen, isClosing, toggle, close } = useMobileMenu();
 */
export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  /**
   * Closes the menu with animation
   * Sets closing state, waits for animation (300ms), then removes menu
   */
  const close = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300); // Must match CSS transition duration
  };

  /**
   * Toggles menu state with proper animation handling
   * If open → close with animation
   * If closed → open immediately
   */
  const toggle = () => {
    if (isOpen) {
      close();
    } else {
      setIsOpen(true);
    }
  };

  /**
   * Opens menu immediately (no animation on open)
   */
  const open = () => setIsOpen(true);

  return { isOpen, isClosing, toggle, close, open };
};
