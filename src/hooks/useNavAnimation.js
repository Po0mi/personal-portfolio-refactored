// hooks/useNavAnimation.js
import { useEffect } from "react";
import { gsap } from "gsap";

const useNavAnimation = () => {
  useEffect(() => {
    const nav = document.querySelector(".navbar");
    const links = document.querySelectorAll(".navbar .desktop-menu a");

    if (!nav || !links.length) return;

    gsap.fromTo(
      nav,
      { x: 60, opacity: 0, skewY: 10 },
      {
        x: 0,
        opacity: 1,
        skewY: 0,
        duration: 0.6,
        ease: "power4.out",
        delay: 0.8,
      },
    );

    gsap.fromTo(
      links,
      { x: 40, opacity: 0, skewX: -10 },
      {
        x: 0,
        opacity: 1,
        skewX: 0,
        duration: 0.4,
        ease: "power4.out",
        stagger: 0.06,
        delay: 1,
      },
    );
  }, []);
};

export default useNavAnimation;
