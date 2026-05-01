import React, { useEffect, useRef } from 'react';
import './Experience.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);
  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);

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

      // Timeline line animation
      gsap.fromTo('.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power3.out',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Timeline dot animation
      gsap.fromTo(centerRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Left side animation
      gsap.fromTo(leftRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Right side animation
      gsap.fromTo(rightRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experience = {
    company: 'Slash Star',
    role: 'Backend Developer',
    location: 'Surat, India',
    type: 'On-site',
    startDate: 'May 2025',
    endDate: 'Present',
    description: 'Developed scalable REST APIs using NestJS and Node.js for high-traffic platforms. Integrated AI services and third-party APIs. Built real-time features with Socket.IO improving user engagement by 30%. Implemented Stripe payment gateway and deployed containerized apps on AWS EC2. Collaborated with xR Studio team to deliver full-stack features.'
  };

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="experience-header" ref={headerRef}>
        <h2>Professional <span className="highlight">Journey</span></h2>
      </div>

      <div className="experience-timeline" ref={timelineRef}>
        {/* Timeline Line */}
        <div className="timeline-line"></div>
        
        <div className="experience-item">
          {/* Left Side - Date, Company, Location */}
          <div className="exp-left" ref={leftRef}>
            <div className="exp-date">
              {experience.startDate} <span className="date-separator">-</span> {experience.endDate}
            </div>
            <div className="exp-company">
              <span className="company-name">{experience.company}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="company-icon">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <div className="company-meta">
              <span className="meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="meta-icon">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {experience.location}
              </span>
              <span className="meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="meta-icon">
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
                {experience.type}
              </span>
            </div>
          </div>

          {/* Middle - Timeline Connector */}
          <div className="exp-connector" ref={centerRef}>
            <div className="timeline-dot">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
          </div>

          {/* Right Side - Role & Description */}
          <div className="exp-right" ref={rightRef}>
            <h3 className="exp-role">{experience.role}</h3>
            <p className="exp-description">{experience.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
