// hooks/useContactAnimation.js
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useContactAnimation = ({
  headingRef,
  emailRef,
  footerNameRef,
  footerNavRef,
  footerSocialsRef,
  footerCopyRef,
}) => {
  useEffect(() => {
    const heading = headingRef.current;
    const email = emailRef.current;
    const footerName = footerNameRef.current;
    const footerNav = footerNavRef.current;
    const footerSocials = footerSocialsRef.current;
    const footerCopy = footerCopyRef.current;

    if (!heading) return;

    // heading — slams up from below, overshoots then snaps
    gsap.fromTo(
      heading,
      { y: 200, opacity: 0, skewY: 12, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        scale: 1,
        duration: 0.7,
        ease: "power4.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 90%",
        },
      },
    );

    // email — flickers in like a glitch
    gsap.set(email, { opacity: 0 });
    ScrollTrigger.create({
      trigger: email,
      start: "top 92%",
      onEnter: () => {
        let iter = 0;
        const original = email.innerText;
        const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@.";
        clearInterval(email._interval);
        gsap.set(email, { opacity: 1 });

        email._interval = setInterval(() => {
          email.innerText = original
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < iter) return original[i];
              return alpha[Math.floor(Math.random() * alpha.length)];
            })
            .join("");

          if (iter >= original.length) {
            clearInterval(email._interval);
            email.innerText = original;
          }
          iter += original.length / 30;
        }, 30);
      },
    });

    // footer name — snaps in from left hard
    gsap.fromTo(
      footerName,
      { x: -80, opacity: 0, skewX: -12 },
      {
        x: 0,
        opacity: 1,
        skewX: 0,
        duration: 0.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footerName,
          start: "top 95%",
        },
      },
    );

    // footer nav — each link snaps in from bottom with tight stagger
    gsap.fromTo(
      footerNav?.querySelectorAll("a"),
      { y: 20, opacity: 0, skewY: 5 },
      {
        y: 0,
        opacity: 0.3,
        skewY: 0,
        duration: 0.3,
        ease: "power4.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: footerNav,
          start: "top 95%",
        },
      },
    );

    // footer socials — snaps in from right
    gsap.fromTo(
      footerSocials?.querySelectorAll("a"),
      { x: 30, opacity: 0, skewX: 8 },
      {
        x: 0,
        opacity: 0.3,
        skewX: 0,
        duration: 0.3,
        ease: "power4.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: footerSocials,
          start: "top 95%",
        },
      },
    );

    // footer copy — snaps in with no ease, hard cut
    gsap.fromTo(
      footerCopy,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: footerCopy,
          start: "top 98%",
        },
      },
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);
};

export default useContactAnimation;
