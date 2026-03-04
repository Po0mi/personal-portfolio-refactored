// hooks/useMaskAnimation.js
import { useEffect } from "react";
import { gsap } from "gsap";

const useMaskAnimation = (refs, method = "word") => {
  useEffect(() => {
    const elements = refs.map((r) => r.current).filter(Boolean);
    if (!elements.length) return;

    // 1. Split text and wrap in mask-inner spans
    const splitText = (el, _method) => {
      const splitted =
        _method === "word" ? el.textContent.split(" ") : [el.innerHTML];

      el.innerHTML = "";
      const fragment = document.createDocumentFragment();

      splitted.forEach((part) => {
        const span = document.createElement("span");
        span.classList.add("mask-inner");
        span.appendChild(document.createTextNode(part));
        fragment.appendChild(span);
        if (_method === "word") {
          fragment.appendChild(document.createTextNode(" "));
        }
      });

      el.appendChild(fragment);
    };

    // 2. Append js-mask span inside each mask-inner
    const appendMasks = (el) => {
      el.querySelectorAll(".mask-inner").forEach((inner) => {
        const mask = document.createElement("span");
        mask.classList.add("js-mask");
        inner.appendChild(mask);
      });
    };

    // 3. Animate
    const animate = (el) => {
      const masks = el.querySelectorAll(".js-mask");
      gsap.to(masks, {
        duration: 0.6,
        scaleX: 0,
        transformOrigin: "0 50%",
        ease: "circ.inOut",
        stagger: {
          amount: masks.length === 1 ? 0.4 : 0.7,
        },
      });
    };

    // 4. Setup each element
    elements.forEach((el) => {
      splitText(el, method);
      appendMasks(el);
    });

    // 5. IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -120px 0px",
        threshold: 1,
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

export default useMaskAnimation;
