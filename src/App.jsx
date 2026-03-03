import { useState } from "react";
import Navbar from "./layouts/navbar";
import Hero from "./components/Hero";
import Cursor from "./components/Cursor";
import About from "./components/About";
import Noise from "./components/Noise";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Noise />
        <Cursor />
        <Hero />
        <About />
      </main>
    </div>
  );
}

export default App;
