import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const usePrinciplesAnimation = ({
  interruptOrangeRef,
  interruptDarkRef,
  gutterLabelRef,
}) => {
  useEffect(() => {
    const orange = interruptOrangeRef.current;
    const dark = interruptDarkRef.current;
    const label = gutterLabelRef.current;

    if (!orange || !dark) return;

    // ── INTERRUPT ORANGE — slams in from left ──
    gsap.fromTo(
      orange,
      { x: -80, opacity: 0, skewX: -6 },
      {
        x: 0,
        opacity: 1,
        skewX: 0,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: orange,
          start: "top 85%",
        },
      },
    );

    // ── INTERRUPT STAT — number counts up feel ──
    const stat = orange.querySelector(".interrupt-stat");
    if (stat) {
      gsap.fromTo(
        stat,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power4.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: orange,
            start: "top 85%",
          },
        },
      );
    }

    // ── INTERRUPT DARK ITEMS — stagger in from right ──
    const items = dark.querySelectorAll(".interrupt-item");
    if (items.length) {
      gsap.fromTo(
        items,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power4.out",
          stagger: 0.08,
          delay: 0.3,
          scrollTrigger: {
            trigger: dark,
            start: "top 85%",
          },
        },
      );
    }

    // ── GUTTER LABEL ──
    if (label) {
      gsap.set(label, { opacity: 0, y: 20 });
      gsap.to(label, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power4.out",
        delay: 0.4,
        scrollTrigger: {
          trigger: orange,
          start: "top 85%",
        },
      });
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);
};

export default usePrinciplesAnimation;
