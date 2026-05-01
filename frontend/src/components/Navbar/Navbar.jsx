import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import gsap from 'gsap';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const hireRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial navbar entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Logo animation
      tl.fromTo(logoRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );

      // Nav links stagger animation
      tl.fromTo(linksRef.current?.querySelectorAll('li') || [],
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
        '-=0.2'
      );

      // Hire button animation
      tl.fromTo(hireRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
        '-=0.3'
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
      <div className="nav-content">
        <div className="nav-logo" ref={logoRef}>
          <a href="/"><span className="accent-text">JB.</span></a>
        </div>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`} ref={linksRef}>
          <ol>
            {navLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.name}
                </a>
              </li>
            ))}
          </ol>
          <a href="#contact" className="hire-button" ref={hireRef} onClick={() => setMenuOpen(false)}>Hire Me</a>
        </div>

        <div className={`nav-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <div className="ham-box">
            <div className="ham-box-inner"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
