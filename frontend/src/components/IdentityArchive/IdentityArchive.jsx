import React, { useEffect, useRef } from 'react';
import './IdentityArchive.css';
import aboutImg from '../../assets/img/about.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IdentityArchive = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Left side (photo) animation
      gsap.fromTo(leftRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards stagger animation
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cards = [
    {
      id: 1,
      title: 'ORIGIN STORY',
      subtitle: 'BACKEND',
      content: 'Passionate backend developer forged in the digital landscape. I specialize in designing high-throughput REST & GraphQL APIs, engineered to facilitate seamless user journeys and robust data orchestration.'
    },
    {
      id: 2,
      title: 'DESIGN PHILOSOPHY',
      subtitle: 'METHODOLOGY',
      content: 'I believe great design starts with understanding the problem at its core. Every pixel, every interaction, and every line of code serves a purpose. Clean architecture, optimal performance, and maintainable codebases.'
    },
    {
      id: 3,
      title: 'CORE DIRECTIVES',
      subtitle: 'PRINCIPLES',
      content: 'Priority 01: Server-side code design. Priority 02: Database optimization. Priority 03: API security. Priority 04: System scalability. I bridge the gap between user and machine.'
    },
    {
      id: 4,
      title: 'SYSTEM ARCHITECTURE',
      subtitle: 'TECH STACK',
      content: 'Specialization in microservices architecture. Deployment of Node.js, Express.js frameworks. Database integration with MongoDB and PostgreSQL. Redis caching layer implementation.'
    }
  ];

  return (
    <section id="identity" className="identity-section" ref={sectionRef}>  
      {/* Section Header */}
      <div className="identity-header" ref={headerRef}>
        <h2>Identity Archive</h2>
      </div>

      <div className="identity-container">
        {/* Left Side - Photo & Contact */}
        <div className="identity-left" ref={leftRef}>
          <div className="photo-wrapper">
            <div className="photo-frame">
              <div className="corner-accent tl"></div>
              <div className="corner-accent tr"></div>
              <div className="corner-accent bl"></div>
              <div className="corner-accent br"></div>
              <div className="photo-image">
                <img src={aboutImg} alt="Jaydip Bela" />
                <div className="photo-overlay"></div>
              </div>
            </div>
            <div className="photo-glow"></div>
          </div>

          <div className="contact-box">
            <div className="contact-header-box">
              <span className="contact-label">CONTACT_</span>
            </div>
            <div className="contact-details">
              <a href="mailto:jaydipbela1625@gmail.com" className="contact-row">
                <span className="contact-icon">@</span>
                <span className="contact-text">jaydipbela1625@gmail.com</span>
              </a>
              <a href="tel:+919876543210" className="contact-row">
                <span className="contact-icon">#</span>
                <span className="contact-text">+91 98765 43210</span>
              </a>
              <div className="contact-row">
                <span className="contact-icon">📍</span>
                <span className="contact-text">Surat, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Content Grid */}
        <div className="identity-right" ref={rightRef}>
          <div className="info-grid">
            {cards.map((card, index) => (
              <div key={card.id} className="info-card" ref={el => cardsRef.current[index] = el}>
                <div className="card-header">
                  <span className="card-badge">[{card.id}]</span>
                  <span className="card-category">{card.subtitle}</span>
                </div>
                <h3 className="card-heading">{card.title}</h3>
                <p className="card-description">{card.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


export default IdentityArchive;
