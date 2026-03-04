import { useRef } from "react";
import useContactAnimation from "../hooks/useContactAnimation";
import "./Contact.scss";

const Contact = () => {
  const headingRef = useRef(null);
  const emailRef = useRef(null);
  const footerNameRef = useRef(null);
  const footerNavRef = useRef(null);
  const footerSocialsRef = useRef(null);
  const footerCopyRef = useRef(null);

  useContactAnimation({
    headingRef,
    emailRef,
    footerNameRef,
    footerNavRef,
    footerSocialsRef,
    footerCopyRef,
  });
  return (
    <section className="contact" id="contact">
      <div className="noise" />

      <div className="contact-cta">
        <h1
          className="cta-heading"
          ref={headingRef}
          onClick={() => (window.location = "mailto:dangabrielle@email.com")}
        >
          LET'S
          <br />
          TALK
        </h1>

        <a
          className="cta-email"
          ref={emailRef}
          href="mailto:dangabrielle@email.com"
        >
          decastrogab21@gmail.com
        </a>
      </div>
      <div class="tape-wrapper">
        <div class="tape-text">
          CONTACT ✦ CONTACT ✦ CONTACT ✦ CONTACT ✦ CONTACT ✦ CONTACT CONTACT ✦
          CONTACT ✦ CONTACT ✦ CONTACT ✦ CONTACT ✦ CONTACT CONTACT ✦ CONTACT ✦
          CONTACT ✦ CONTACT ✦ CONTACT ✦ CONTACT
        </div>
      </div>
      <div className="contact-footer">
        <div className="footer-name" ref={footerNameRef}>
          <h2>DAN GABRIELLE DE CASTRO</h2>
          <p>Frontend Developer · 2026</p>
        </div>

        <ul className="footer-nav" ref={footerNavRef}>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>

        <div className="footer-socials" ref={footerSocialsRef}>
          <a href="https://github.com/Po0mi" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://www.facebook.com/dangabrielle.decastro.5"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </div>

        <div className="footer-copy" ref={footerCopyRef}>
          <p>© 2026 Dan Gabrielle De Castro. All rights reserved.</p>
          <p>Design by Dan · Built with React + Vite</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
