// hooks/useMobileMenu.js
import { useState, useRef } from "react";

export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const timeoutRef = useRef(null);

  const close = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsClosing(true);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 400);
  };

  const toggle = () => {
    if (isOpen) {
      close();
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsClosing(false);
      setIsOpen(true);
    }
  };

  const open = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsClosing(false);
    setIsOpen(true);
  };

  return { isOpen, isClosing, toggle, close, open };
};
