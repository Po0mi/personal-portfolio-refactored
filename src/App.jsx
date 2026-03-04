import { useRef } from "react";
import Navbar from "./layouts/navbar";
import Hero from "./components/Hero";
import Cursor from "./components/Cursor";
import About from "./components/About";
import Noise from "./components/Noise";
import Projects from "./components/Projects";
import Principles from "./components/Principles";
import Contact from "./components/Contact";
import "./App.css";

function App() {
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
