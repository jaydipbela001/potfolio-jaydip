import React, { useEffect, useRef } from 'react';
import './Education.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
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
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.2,
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

  const educationData = [
    {
      id: 1,
      degree: 'BCA',
      school: 'Sutex Bank College of Computer Applications',
      year: '2022 - 2025',
      description: 'Pursued a BCA, building a strong foundation in programming, data structures, and backend development. Gained hands-on project experience and strengthened problem-solving and teamwork skills.',
      score: '8.1 / 10 CGPA',
      percentage: '81%'
    },
    {
      id: 2,
      degree: '12TH - COMMERCE',
      school: 'Bhakti International School',
      year: '2021 - 2022',
      description: 'Completed 12th in Commerce, developing strong skills in calculation, critical thinking, and problem-solving, along with effective communication and time management.',
      score: '81.18 / 100 %',
      percentage: '81.18%'
    }
  ];

  return (
    <section id="education" className="education-section" ref={sectionRef}>
      {/* Section Header */}
      <div className="education-header" ref={headerRef}>
        <h2>Education Archive</h2>
      </div>

      <div className="education-container">
        {educationData.map((edu, index) => (
          <div key={edu.id} className="education-card" ref={el => cardsRef.current[index] = el}>
            <div className="card-top">
              <div className="edu-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <div className="edu-year">{edu.year}</div>
            </div>

            <h3 className="edu-degree">{edu.degree}</h3>
            
            <div className="edu-school">
              <span className="school-icon">📍</span>
              <span>{edu.school}</span>
            </div>

            <p className="edu-description">{edu.description}</p>

            <div className="edu-performance">
              <span className="performance-label">Academic Performance</span>
              <div className="score-row">
                <span className="score-text">{edu.score}</span>
                <span className="percentage">{edu.percentage}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: edu.percentage }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
