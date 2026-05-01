import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';
import heroImg from '../../assets/hero.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Detect mobile device
const isMobile = () => window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

const stats = [
  { label: 'Experience', value: '1+ Year' },
  { label: 'Projects', value: '12+' },
  { label: 'Location', value: 'India' },
];

const expertise = ['Node.js APIs', 'NestJS Architecture', 'Socket.IO Systems'];

const socials = [
  {
    href: 'https://github.com',
    label: 'GitHub',
    className: 'social-top-left',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.53 11.53 0 0112 6.844c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.798 24 17.302 24 12 24 5.373 18.627 0 12 0Z" />
      </svg>
    ),
  },
  {
    href: 'https://linkedin.com',
    label: 'LinkedIn',
    className: 'social-top-right',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433A2.064 2.064 0 1 1 5.337 3.305a2.064 2.064 0 0 1 0 4.128Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771A1.77 1.77 0 0 0 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729A1.77 1.77 0 0 0 22.222 0h.003Z" />
      </svg>
    ),
  },
  {
    href: 'https://twitter.com',
    label: 'Twitter',
    className: 'social-mid-right',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.953 4.57a10.01 10.01 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723 10.027 10.027 0 0 1-3.127 1.184 4.92 4.92 0 0 0-8.384 4.482A13.957 13.957 0 0 1 1.64 3.162a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.06a4.923 4.923 0 0 0 3.946 4.84 4.996 4.996 0 0 1-2.212.085 4.936 4.936 0 0 0 4.604 3.417A9.867 9.867 0 0 1 .96 19.624a13.995 13.995 0 0 0 7.557 2.209c9.053 0 13.998-7.496 13.998-13.986 0-.21 0-.42-.015-.63A9.935 9.935 0 0 0 24 4.59l-.047-.02Z" />
      </svg>
    ),
  },
  {
    href: 'https://instagram.com',
    label: 'Instagram',
    className: 'social-bottom-right',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92C2.174 15.584 2.162 15.205 2.162 12c0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.667.014 15.259 0 12 0Zm0 5.838A6.162 6.162 0 1 0 12 18.163a6.162 6.162 0 0 0 0-12.325Zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
      </svg>
    ),
  },
  {
    href: 'mailto:jaydipbela@gmail.com',
    label: 'Email',
    className: 'social-bottom-left',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20 4H4a2 2 0 0 0-1.99 2L2 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
      </svg>
    ),
  },
];

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const highlightsRef = useRef(null);
  const statsRef = useRef(null);
  const imageRef = useRef(null);
  const socialsRef = useRef([]);
  const cardsRef = useRef([]);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mobileCheck = isMobile();
    setMobile(mobileCheck);

    const ctx = gsap.context(() => {
      // Use simpler easing for mobile
      const easeType = mobileCheck ? 'power2.out' : 'power3.out';

      // Initial hero entrance animation
      const tl = gsap.timeline({ defaults: { ease: easeType, force3D: true } });

      // Badge animation
      tl.fromTo(badgeRef.current,
        { y: mobileCheck ? -20 : -30, opacity: 0 },
        { y: 0, opacity: 1, duration: mobileCheck ? 0.5 : 0.6 }
      );

      // Title animation
      tl.fromTo(titleRef.current,
        { y: mobileCheck ? 30 : 50, opacity: 0 },
        { y: 0, opacity: 1, duration: mobileCheck ? 0.6 : 0.8 },
        '-=0.3'
      );

      // Description animation
      tl.fromTo(descRef.current,
        { y: mobileCheck ? 20 : 30, opacity: 0 },
        { y: 0, opacity: 1, duration: mobileCheck ? 0.5 : 0.6 },
        '-=0.4'
      );

      // Buttons animation
      tl.fromTo(buttonsRef.current,
        { y: mobileCheck ? 20 : 30, opacity: 0 },
        { y: 0, opacity: 1, duration: mobileCheck ? 0.5 : 0.6 },
        '-=0.3'
      );

      // Highlights animation - reduce stagger on mobile
      tl.fromTo(highlightsRef.current?.children || [],
        { y: mobileCheck ? 15 : 20, opacity: 0, scale: mobileCheck ? 0.95 : 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: mobileCheck ? 0.35 : 0.4, stagger: mobileCheck ? 0.05 : 0.1 },
        '-=0.2'
      );

      // Stats animation
      tl.fromTo(statsRef.current?.children || [],
        { y: mobileCheck ? 20 : 30, opacity: 0 },
        { y: 0, opacity: 1, duration: mobileCheck ? 0.4 : 0.5, stagger: mobileCheck ? 0.05 : 0.1 },
        '-=0.2'
      );

      // Image container animation - skip back.out on mobile
      tl.fromTo(imageRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: mobileCheck ? 0.6 : 0.8, ease: mobileCheck ? easeType : 'back.out(1.7)' },
        '-=0.6'
      );

      // Floating social icons animation
      tl.fromTo(socialsRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: mobileCheck ? 0.35 : 0.4, stagger: mobileCheck ? 0.05 : 0.1, ease: mobileCheck ? easeType : 'back.out(2)' },
        '-=0.4'
      );

      // Hero cards animation
      tl.fromTo(cardsRef.current,
        { x: mobileCheck ? 30 : 50, opacity: 0 },
        { x: 0, opacity: 1, duration: mobileCheck ? 0.5 : 0.6, stagger: mobileCheck ? 0.1 : 0.15 },
        '-=0.3'
      );

      // Only run floating animation on desktop
      if (!mobileCheck) {
        gsap.to(socialsRef.current, {
          y: 'random(-10, 10)',
          x: 'random(-5, 5)',
          duration: 'random(2, 3)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: {
            each: 0.2,
            from: 'random'
          }
        });
      }

      // Parallax effect - disabled on mobile for performance
      if (!mobileCheck) {
        gsap.to(visualRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="hero-section" ref={heroRef}>
      <div className="hero-content" ref={contentRef}>
        <div className="hero-badge" ref={badgeRef}>
          <span className="badge-dot"></span>
          <span className="badge-text">Backend Developer</span>
        </div>

        <div className="hero-copy">
          <p className="hero-kicker">Building reliable backend systems for modern products</p>

          <h1 className="hero-title" ref={titleRef}>
            <span className="title-prefix">Hi, I&apos;m</span>
            <span className="title-name">Jaydip Bela</span>
          </h1>

          <p className="hero-description" ref={descRef}>
            I design and build scalable APIs, real-time applications, and cloud-ready backend
            platforms using Node.js, NestJS, Socket.IO, and modern deployment workflows.
          </p>
        </div>

        <div className="hero-buttons" ref={buttonsRef}>
          <a href="#" className="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon" aria-hidden="true">
              <path d="M12 10v6m0 0-3-3m3 3 3-3m2 8H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z" />
            </svg>
            Download CV
          </a>
          <a href="#contact" className="btn-secondary">Let&apos;s Talk</a>
        </div>

        <div className="hero-highlights" ref={highlightsRef}>
          {expertise.map((item) => (
            <span key={item} className="highlight-chip">
              {item}
            </span>
          ))}
        </div>

        <div className="hero-info-grid" ref={statsRef}>
          {stats.map((item) => (
            <div key={item.label} className="info-box">
              <span className="info-label">{item.label}</span>
              <span className="info-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-visual" ref={visualRef}>
        <div className="hero-image-shell">
          <div className="hero-orbit hero-orbit-one"></div>
          <div className="hero-orbit hero-orbit-two"></div>

          <div className="hero-image-container" ref={imageRef}>
            <div className="hero-image-backdrop"></div>
            <div className="hero-image-main">
              <img src={heroImg} alt="Jaydip Bela" />
            </div>

            {socials.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`floating-social ${social.className}`}
                aria-label={social.label}
                ref={el => socialsRef.current[index] = el}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="hero-card hero-card-top" ref={el => cardsRef.current[0] = el}>
            <span className="hero-card-label">Current Focus</span>
            <strong>Clean architecture for APIs</strong>
            <p>Structured backend systems with performance and maintainability in mind.</p>
          </div>

          <div className="hero-card hero-card-bottom" ref={el => cardsRef.current[1] = el}>
            <span className="hero-card-label">Availability</span>
            <strong>Open for freelance and full-time roles</strong>
            <div className="hero-card-status">
              <span className="status-dot"></span>
              <span>Active and ready to collaborate</span>
            </div>
          </div>
        </div>

        <div className="profile-card" ref={el => cardsRef.current[2] = el}>
          <div className="profile-card-header">JAYDIP.DEV</div>
          <div className="profile-card-name">Backend Developer</div>
          <div className="profile-card-role">Node.js • NestJS • Socket.IO • Cloud Deployment</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
