import { useEffect } from "react";
import { gsap } from "gsap";

const useHeroAnimation = (refs) => {
  const { topTitleRef, middleTitleRef, bottomTitleRef, bottomTitleRef2 } = refs;

  const scramble = (el, finalText, duration = 800) => {
    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iter = 0;
    const totalFrames = duration / 30;
    clearInterval(el._interval);

    el._interval = setInterval(() => {
      el.innerText = finalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < iter) return finalText[i];
          return alpha[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iter >= finalText.length) {
        clearInterval(el._interval);
        el.innerText = finalText;
      }
      iter += finalText.length / totalFrames;
    }, 30);
  };

  useEffect(() => {
    const top = topTitleRef.current;
    const middle = middleTitleRef.current;
    const bottom = bottomTitleRef.current;
    const bottom2 = bottomTitleRef2?.current;

    if (!top || !middle || !bottom) return;

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.fromTo(
      top,
      { x: -200, opacity: 0, skewX: -15 },
      {
        x: 0,
        opacity: 1,
        skewX: 0,
        duration: 0.8,
        onComplete: () => scramble(top, "FRONTEND", 600),
      },
    )
      .fromTo(
        bottom,
        { x: 200, opacity: 0, skewX: 15 },
        {
          x: 0,
          opacity: 1,
          skewX: 0,
          duration: 0.8,
          onComplete: () => scramble(bottom, "DEVELOPER", 600),
        },
        "<",
      )
      // bottom2 — slams in from right simultaneously with bottom
      .fromTo(
        bottom2 || {},
        { x: 200, opacity: 0, skewX: 15 },
        {
          x: 0,
          opacity: 1,
          skewX: 0,
          duration: 0.8,
          onComplete: () => bottom2 && scramble(bottom2, "DEVELOPER", 600),
        },
        "<",
      )
      .fromTo(
        middle,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.1,
          ease: "none",
          onComplete: () => scramble(middle, "PORTFOLIO", 800),
        },
        "-=0.2",
      )
      .fromTo(
        document.querySelector(".hero-name"),
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 1, ease: "none" },
        "-=0.1",
      );

    return () => {
      tl.kill();
      clearInterval(top._interval);
      clearInterval(middle._interval);
      clearInterval(bottom._interval);
      if (bottom2) clearInterval(bottom2._interval);
    };
  }, []);
};

export default useHeroAnimation;
