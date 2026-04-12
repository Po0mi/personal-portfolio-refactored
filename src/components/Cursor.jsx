import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Cursor.scss";

/**
 * CustomCursor Component
 *
 * A React component that creates a custom GSAP-powered cursor.
 * Features:
 * - Smooth lagged follow using GSAP quickTo
 * - Dot + ring dual cursor
 * - Hover state expansion on interactive elements
 * - Text cursor state on text elements
 * - Hidden on mobile devices
 *
 * @component
 * @returns {JSX.Element}
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // hide native cursor
    document.body.style.cursor = "none";

    // GSAP quickTo for performant cursor following
    const moveDotX = gsap.quickTo(dot, "x", {
      duration: 0.1,
      ease: "power3.out",
    });
    const moveDotY = gsap.quickTo(dot, "y", {
      duration: 0.1,
      ease: "power3.out",
    });
    const moveRingX = gsap.quickTo(ring, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    const moveRingY = gsap.quickTo(ring, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const onMouseMove = (e) => {
      moveDotX(e.clientX);
      moveDotY(e.clientY);
      moveRingX(e.clientX);
      moveRingY(e.clientY);
    };

    // hover targets — links, buttons, anything clickable
    const hoverTargets = document.querySelectorAll(
      "a, button, [data-cursor='hover'], .project-row, .principle-row",
    );

    // text targets — paragraphs, headings
    const textTargets = document.querySelectorAll(
      "p, h1, h2, h3, h4, span, .row-desc",
    );

    const onEnterHover = () => {
      gsap.to(dot, { scale: 0, duration: 0.2, ease: "power3.out" });
      gsap.to(ring, {
        scale: 2.5,
        borderColor: "var(--main-text)",
        backgroundColor: "rgba(255, 158, 0, 0.08)",
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const onLeaveHover = () => {
      gsap.to(dot, { scale: 1, duration: 0.2, ease: "power3.out" });
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(244, 243, 238, 0.5)",
        backgroundColor: "transparent",
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const hoverSelector =
      "a, button, [data-cursor='hover'], .project-row, .principle-row";

    const isInsideHoverTarget = (el) => !!el.closest(hoverSelector);

    const onEnterText = (e) => {
      if (isInsideHoverTarget(e.currentTarget)) return;
      gsap.to(dot, { scale: 0, duration: 0.2 });
      gsap.to(ring, {
        scaleX: 0.04,
        scaleY: 1.2,
        borderColor: "var(--main-text)",
        duration: 0.2,
        ease: "power3.out",
      });
    };

    const onLeaveText = (e) => {
      if (isInsideHoverTarget(e.currentTarget)) return;
      gsap.to(dot, { scale: 1, duration: 0.2 });
      gsap.to(ring, {
        scaleX: 1,
        scaleY: 1,
        borderColor: "rgba(244, 243, 238, 0.5)",
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.8, duration: 0.1, ease: "power3.out" });
      gsap.to(dot, { scale: 1.5, duration: 0.1, ease: "power3.out" });
    };

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.15, ease: "power3.out" });
      gsap.to(dot, { scale: 1, duration: 0.15, ease: "power3.out" });
    };

    // hide cursor when leaving window
    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    const onMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", onEnterHover);
      el.addEventListener("mouseleave", onLeaveHover);
    });

    textTargets.forEach((el) => {
      el.addEventListener("mouseenter", onEnterText);
      el.addEventListener("mouseleave", onLeaveText);
    });

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterHover);
        el.removeEventListener("mouseleave", onLeaveHover);
      });
      textTargets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterText);
        el.removeEventListener("mouseleave", onLeaveText);
      });
    };
  }, []);

  return (
    <>
      {/* small fast dot */}
      <div className="cursor-dot" ref={dotRef} />
      {/* lagged ring */}
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
};

export default CustomCursor;
