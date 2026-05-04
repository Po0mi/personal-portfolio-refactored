import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useProjectsAnimation = ({ headerRef, gridRef, gutterLabelRef, activeTab }) => {
  const isFirstRender = useRef(true);

  // Gutter label — fade up when it scrolls into view
  useEffect(() => {
    const label = gutterLabelRef?.current;
    if (!label) return;

    gsap.set(label, { opacity: 0, y: 20 });

    const trigger = ScrollTrigger.create({
      trigger: label,
      start: "top 85%",
      once: true,
      onEnter: () =>
        gsap.to(label, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power4.out",
          delay: 0.2,
        }),
    });

    return () => trigger.kill();
  }, []);

  // Header — slide in from left when it scrolls into view
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.fromTo(
      header,
      { x: -60, opacity: 0, skewX: -10 },
      {
        x: 0,
        opacity: 1,
        skewX: 0,
        duration: 0.6,
        ease: "power4.out",
        scrollTrigger: { trigger: header, start: "top 85%", once: true },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // Cards — stagger in when the grid scrolls into view (initial load)
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".project-card");
    if (!cards.length) return;

    gsap.set(cards, { y: 32, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: grid,
      start: "top 85%",
      once: true,
      onEnter: () =>
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power4.out",
          stagger: 0.07,
        }),
    });

    return () => trigger.kill();
  }, []);

  // Cards — re-animate on tab switch (grid is already in the viewport)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const cards = gridRef.current?.querySelectorAll(".project-card");
    if (!cards?.length) return;

    gsap.fromTo(
      cards,
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: "power4.out", stagger: 0.07 }
    );
  }, [activeTab]);
};

export default useProjectsAnimation;
