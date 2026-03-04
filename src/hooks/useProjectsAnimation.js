// hooks/useProjectsAnimation.js
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useProjectsAnimation = ({ headerRef, rowRefs }) => {
  useEffect(() => {
    const header = headerRef.current;
    const rows = rowRefs.map((r) => r.current).filter(Boolean);
    if (!header || !rows.length) return;

    // header slams in from left
    gsap.fromTo(
      header,
      { x: -60, opacity: 0, skewX: -10 },
      {
        x: 0,
        opacity: 1,
        skewX: 0,
        duration: 0.6,
        ease: "power4.out",
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
        },
      },
    );

    // each row snaps in with stagger
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
          delay: i * 0.08,
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
          },
        },
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);
};

export default useProjectsAnimation;
