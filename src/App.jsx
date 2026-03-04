import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./layouts/navbar";
import Hero from "./components/Hero";
import Cursor from "./components/Cursor";
import About from "./components/About";
import Noise from "./components/Noise";
import Projects from "./components/Projects";
import Principles from "./components/Principles";
import Contact from "./components/Contact";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // init Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false, // keep native touch scrolling on mobile
    });

    lenisRef.current = lenis;

    // sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Noise />
      <main>
        <Cursor />
        <Hero />
        <About />
        <Projects />
        <Principles />
        <Contact />
      </main>
    </div>
  );
}

export default App;
