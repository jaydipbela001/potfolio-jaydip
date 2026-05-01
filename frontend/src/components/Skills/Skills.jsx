import React, { useEffect, useRef } from 'react';
import './Skills.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
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

      // Cards stagger animation
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    {
      name: 'React JS',
      level: 'Advanced',
      percentage: 90,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="2"/>
          <path d="M12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6zm0 0c-1.66 0-3 2.69-3 6s1.34 6 3 6 3-2.69 3-6-1.34-6-3-6zm0 0c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z"/>
        </svg>
      )
    },
    {
      name: 'Node JS',
      level: 'Advanced',
      percentage: 88,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z"/>
          <path d="M12 22V12"/>
          <path d="M12 12L3 7"/>
          <path d="M12 12l9-5"/>
        </svg>
      )
    },
    {
      name: 'Express JS',
      level: 'Advanced',
      percentage: 85,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 17h6"/>
          <path d="M4 12h9"/>
          <path d="M4 7h14"/>
          <path d="M17 17h3"/>
        </svg>
      )
    },
    {
      name: 'Nest JS',
      level: 'Intermediate',
      percentage: 75,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      )
    },
    {
      name: 'HTML',
      level: 'Advanced',
      percentage: 95,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l2 16 6 3 6-3 2-16H4z"/>
          <path d="M8 8h8"/>
          <path d="M8 12l4 2 4-2"/>
        </svg>
      )
    },
    {
      name: 'CSS',
      level: 'Advanced',
      percentage: 90,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l2 16 6 3 6-3 2-16H4z"/>
          <path d="M8 8h8"/>
          <path d="M8 12l4 2 4-2"/>
          <circle cx="12" cy="17" r="1"/>
        </svg>
      )
    },
    {
      name: 'JavaScript',
      level: 'Advanced',
      percentage: 88,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="M7 8v8"/>
          <path d="M10 8v4"/>
          <path d="M13 8l-2 8"/>
          <path d="M17 8v4a2 2 0 0 0 2 2h0"/>
        </svg>
      )
    },
    {
      name: 'MongoDB',
      level: 'Advanced',
      percentage: 82,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C7 2 4 7 4 12s4 10 8 10 8-5 8-10-3-10-8-10z"/>
          <path d="M12 2v20"/>
        </svg>
      )
    },
    {
      name: 'Socket.io',
      level: 'Intermediate',
      percentage: 78,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 0 1 10 10"/>
          <path d="M12 2a10 10 0 0 0-10 10"/>
          <path d="M12 12l4-4"/>
          <path d="M12 12l-4-4"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      )
    },
    {
      name: 'Git',
      level: 'Advanced',
      percentage: 85,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 8v8"/>
          <path d="M8 12h8"/>
        </svg>
      )
    },
    {
      name: 'AWS',
      level: 'Intermediate',
      percentage: 70,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 15l4-4 4 4 4-4 4 4"/>
          <path d="M4 10l4-4 4 4 4-4 4 4"/>
        </svg>
      )
    },
    {
      name: 'Stripe',
      level: 'Intermediate',
      percentage: 72,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2"/>
          <path d="M6 10h.01"/>
          <path d="M10 10h.01"/>
          <path d="M14 10h.01"/>
        </svg>
      )
    }
  ];

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="skills-header" ref={headerRef}>
        <h2>Technical Stack</h2>
      </div>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-card" ref={el => cardsRef.current[index] = el}>
            <div className="corner-dot tl"></div>
            <div className="corner-dot tr"></div>
            <div className="corner-dot bl"></div>
            <div className="corner-dot br"></div>
            <div className="skill-top">
              <div className="skill-icon-box">
                {skill.icon}
              </div>
              <span className="skill-level">{skill.level}</span>
            </div>

            <div className="skill-info">
              <h3 className="skill-name">{skill.name}</h3>
              <span className="skill-percentage">{skill.percentage}%</span>
            </div>

            <div className="skill-progress">
              <span className="progress-label">Power Level</span>
              <div className="progress-segments">
                {[...Array(10)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`segment ${i < Math.floor(skill.percentage / 10) ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>

            <div className="skill-footer">
              <span className="skill-badge">{skill.percentage >= 85 ? 'SUPREME' : 'EXPERT'}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
