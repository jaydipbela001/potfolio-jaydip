import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import IdentityArchive from './components/IdentityArchive/IdentityArchive';
import Education from './components/Education/Education';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';
import PremiumCursor from './components/PremiumCursor/PremiumCursor';
import BackgroundDecorations from './components/BackgroundDecorations/BackgroundDecorations';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = () => {
    setLoading(false); 
  };

  return (
    <div className="app-container">
      {loading && <Loader onComplete={handleLoaderComplete} />}
      {!loading && <PremiumCursor />}
      {!loading && <BackgroundDecorations />}
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>
      <Navbar />
      <main>
        <Hero />
        <IdentityArchive />
        <Education />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
