import { useRef } from "react";
import useContactAnimation from "../hooks/useContactAnimation";
import "./Contact.scss";

/**
 * Contact Component
 *
 * The final section of the portfolio. It serves two main purposes:
 * 1. Call to Action (CTA): A large, interactive "LET'S TALK" heading that triggers the user's email client.
 * 2. Footer: Contains navigation links, social media connections, and copyright information.
 *
 * Features:
 * - Large-scale typography for high visual impact.
 * - Marquee/Tape animation (handled via CSS/SCSS).
 * - Staggered entrance animations for footer elements (handled by custom hook).
 */
const Contact = () => {
  // -- Refs for Animation Targets --
  // These refs are passed to the custom hook to orchestrate the reveal sequence
  const headingRef = useRef(null); // "LET'S TALK" CTA
  const emailRef = useRef(null); // Email address link
  const footerNameRef = useRef(null); // Developer name in footer
  const footerNavRef = useRef(null); // Navigation list
  const footerSocialsRef = useRef(null); // Social media links
  const footerCopyRef = useRef(null); // Copyright and build info

  /**
   * Contact Section Entrance Animation
   * Triggers the staggered reveal of the CTA and footer elements when the section comes into view.
   * Logic is encapsulated in the custom hook to maintain separation of concerns.
   */
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
      {/* Background Noise Texture for consistency with other sections */}
      <div className="noise" />

      {/* ── CALL TO ACTION (CTA) ── */}
      <div className="contact-cta">
        {/* 
          Interactive Heading: 
          Clicking this triggers the default mail client. 
          Using window.location provides a direct fallback if the anchor tag fails.
        */}
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
          href="mailto:decastrogab21@gmail.com"
        >
          decastrogab21@gmail.com
        </a>
      </div>

      {/* ── MARQUEE TAPE ── */}
      {/* 
        A decorative infinite-scrolling text strip. 
        Typically animated using CSS keyframes in Contact.scss.
      */}
      <div className="tape-wrapper">
        <div className="tape-text">
          CONTACT ✦ CONTACT ✦ CONTACT ✦ CONTACT ✦ CONTACT ✦ CONTACT CONTACT ✦
          CONTACT ✦ CONTACT ✦ CONTACT ✦ CONTACT ✦ CONTACT CONTACT ✦ CONTACT ✦
          CONTACT ✦ CONTACT ✦ CONTACT ✦ CONTACT
        </div>
      </div>

      {/* ── FOOTER SECTION ── */}
      <div className="contact-footer">
        {/* Identity Block */}
        <div className="footer-name" ref={footerNameRef}>
          <h2>DAN GABRIELLE DE CASTRO</h2>
          <p>Frontend Developer · 2026</p>
        </div>

        {/* Navigation Links */}
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
            <a href="#principles">Principles</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>

        {/* Social Media Links */}
        <div className="footer-socials" ref={footerSocialsRef}>
          <a
            href="https://github.com/Po0mi"
            target="_blank"
            rel="noreferrer" // Security best practice for external links
          >
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

        {/* Copyright & Tech Stack Credit */}
        <div className="footer-copy" ref={footerCopyRef}>
          <p>© 2026 Dan Gabrielle De Castro. All rights reserved.</p>
          <p>Design by Dan · Built with React + Vite</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
