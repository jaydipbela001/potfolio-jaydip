import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const modalRef = useRef(null);
  const scrollPositionRef = useRef(0);
  
  const [selectedProject, setSelectedProject] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const projects = [
    {
      title: 'Task Management API',
      shortDescription: 'A robust RESTful API built with NestJS and PostgreSQL for managing complex task workflows.',
      fullDescription: 'A comprehensive RESTful API built with NestJS and PostgreSQL for managing complex task workflows. Features include JWT authentication with refresh tokens, role-based access control (RBAC), automated email notifications using SendGrid, comprehensive API documentation with Swagger, database migrations with TypeORM, and Redis caching for improved performance.',
      tech: ['NestJS', 'PostgreSQL', 'TypeORM', 'Redis', 'Swagger'],
      github: 'https://github.com/jaydip-bela',
      link: '#',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      features: ['JWT Authentication', 'RBAC', 'Email Notifications', 'API Documentation', 'Redis Caching']
    },
    {
      title: 'E-commerce Backend Service',
      shortDescription: 'Microservices-based backend for an e-commerce platform using Node.js and MongoDB.',
      fullDescription: 'A scalable microservices-based backend for an e-commerce platform built with Node.js and MongoDB. Implemented order processing with state machine pattern, real-time inventory management, payment gateway integration with Stripe, Docker containerization for deployment, and comprehensive unit testing with Jest.',
      tech: ['Node.js', 'Express', 'MongoDB', 'Docker', 'Stripe'],
      github: 'https://github.com/jaydip-bela',
      link: '#',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      features: ['Order Processing', 'Inventory Management', 'Stripe Integration', 'Docker', 'Unit Testing']
    },
    {
      title: 'Real-time Chat Engine',
      shortDescription: 'A scalable real-time chat server using Socket.io and Node.js.',
      fullDescription: 'A high-performance real-time chat server built with Socket.io and Node.js. Supports private messaging with end-to-end encryption, group chats with moderation tools, message persistence with MongoDB, file sharing capabilities, typing indicators, and read receipts.',
      tech: ['Node.js', 'Socket.io', 'MongoDB', 'Redis'],
      github: 'https://github.com/jaydip-bela',
      link: '#',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
      features: ['Private Messaging', 'Group Chats', 'File Sharing', 'Typing Indicators', 'Read Receipts']
    }
  ];

  const closeModal = () => setSelectedProject(null);

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
          stagger: 0.15,
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

  // Modal animation
  useEffect(() => {
    if (selectedProject && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [selectedProject]);

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="projects-header" ref={headerRef}>
        <h2>Selected Works</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card" ref={el => cardsRef.current[index] = el} onClick={() => setSelectedProject(project)}>
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <span className="view-details">View Details</span>
              </div>
            </div>
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.shortDescription}</p>
              <ul className="project-tech">
                {project.tech.map((tech, tIndex) => (
                  <li key={tIndex}>{tech}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" ref={modalRef} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <div className="modal-header">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>
            <div className="modal-body">
              <h3>{selectedProject.title}</h3>
              <p className="modal-description">{selectedProject.fullDescription}</p>
              <div className="modal-section">
                <h4>Key Features</h4>
                <ul className="feature-list">
                  {selectedProject.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-section">
                <h4>Technologies</h4>
                <ul className="tech-list">
                  {selectedProject.tech.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-links">
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="modal-btn primary">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Code
                </a>
                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="modal-btn secondary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
