import React, { useEffect, useRef, useState } from 'react';
import './Loader.css';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const imageGlowRef = useRef(null);
  const ringsRef = useRef([]);
  const orbitRef = useRef(null);
  const textRef = useRef(null);
  const glitchRef = useRef(null);
  const progressRef = useRef(null);
  const codeLinesRef = useRef([]);
  const [count, setCount] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING');

  const loadingTexts = ['INITIALIZING', 'LOADING ASSETS', 'COMPILING', 'OPTIMIZING', 'READY'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Master timeline
      const masterTl = gsap.timeline({
        onComplete: () => {
          gsap.to(loaderRef.current, {
            clipPath: 'circle(0% at 50% 50%)',
            duration: 1,
            ease: 'power4.inOut',
            onComplete: () => {
              if (onComplete) onComplete();
            }
          });
        }
      });

      // Counter animation
      const counterObj = { val: 0 };
      gsap.to(counterObj, {
        val: 100,
        duration: 3.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          const val = Math.floor(counterObj.val);
          setCount(val);
          
          // Update loading text based on progress
          const textIndex = Math.min(Math.floor(val / 20), 4);
          setLoadingText(loadingTexts[textIndex]);
        }
      });

      // Progress bar
      masterTl.to(progressRef.current, {
        '--progress': '100%',
        duration: 3.5,
        ease: 'power2.inOut'
      }, 0);

      // Multiple rotating rings with different speeds
      ringsRef.current.forEach((ring, i) => {
        if (ring) {
          gsap.to(ring, {
            rotation: i % 2 === 0 ? 360 : -360,
            duration: 2 + i * 1.5,
            ease: 'none',
            repeat: -1
          });

          // Scale pulse
          gsap.to(ring, {
            scale: 1 + (i * 0.1),
            duration: 1 + i * 0.3,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1
          });
        }
      });

      // Image entrance
      masterTl.fromTo(imageRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.7)' },
        0.3
      );

      // Image glow pulse
      gsap.to(imageGlowRef.current, {
        opacity: 0.3,
        scale: 1.2,
        duration: 1.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
      });

      // Glitch effect
      const glitchTimeline = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      for (let i = 0; i < 5; i++) {
        glitchTimeline.to(glitchRef.current, {
          x: gsap.utils.random(-5, 5),
          y: gsap.utils.random(-3, 3),
          skewX: gsap.utils.random(-2, 2),
          duration: 0.05,
          ease: 'none'
        });
      }
      glitchTimeline.to(glitchRef.current, { x: 0, y: 0, skewX: 0, duration: 0.1 });

      // Code lines animation
      codeLinesRef.current.forEach((line, i) => {
        if (line) {
          gsap.fromTo(line,
            { width: 0, opacity: 0 },
            { 
              width: '100%', 
              opacity: 1, 
              duration: 0.8, 
              delay: 0.5 + i * 0.15,
              ease: 'power2.out'
            }
          );
        }
      });

      // Text reveal
      masterTl.fromTo(textRef.current?.children || [],
        { y: 30, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        { 
          y: 0, 
          opacity: 1, 
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.6, 
          stagger: 0.1, 
          ease: 'power3.out' 
        },
        0.5
      );

      // Floating orbit icons
      if (orbitRef.current) {
        const icons = orbitRef.current.children;
        gsap.to(icons, {
          rotation: 360,
          duration: 20,
          ease: 'none',
          repeat: -1,
          transformOrigin: '50% 150px'
        });
      }

    }, loaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="loader-overlay" ref={loaderRef}>
      {/* Matrix rain background */}
      <div className="matrix-bg">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="matrix-column"
            style={{
              left: `${i * 3.5}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            {[...Array(15)].map((_, j) => (
              <span key={j} className="matrix-char">
                {String.fromCharCode(0x30A0 + Math.random() * 96)}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Main container */}
      <div className="loader-container" ref={containerRef}>
        {/* Rotating rings */}
        <div className="loader-rings-advanced">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`advanced-ring ring-adv-${i + 1}`}
              ref={(el) => (ringsRef.current[i] = el)}
            />
          ))}
        </div>

        {/* Center image with glitch */}
        <div className="image-container" ref={glitchRef}>
          <div className="image-glow" ref={imageGlowRef} />
          <div className="image-wrapper" ref={imageRef}>
            <img 
              src="/icons.svg" 
              alt="Logo"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback icon */}
            <div className="fallback-avatar">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Orbiting tech icons */}
        <div className="orbit-container" ref={orbitRef}>
          {['react', 'node', 'database', 'cloud'].map((tech, i) => (
            <div key={tech} className={`orbit-icon orbit-pos-${i}`}>
              {tech === 'react' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6zm0 0c-1.66 0-3 2.69-3 6s1.34 6 3 6 3-2.69 3-6-1.34-6-3-6zm0 0c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z"/>
                </svg>
              )}
              {tech === 'node' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z"/>
                  <path d="M12 22V12"/>
                  <path d="M12 12L3 7"/>
                  <path d="M12 12l9-5"/>
                </svg>
              )}
              {tech === 'database' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <ellipse cx="12" cy="5" rx="9" ry="3"/>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                  <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
                </svg>
              )}
              {tech === 'cloud' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* Code lines decoration */}
        <div className="code-lines left">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="code-line"
              ref={(el) => (codeLinesRef.current[i] = el)}
              style={{ width: `${60 + Math.random() * 40}%` }}
            />
          ))}
        </div>
        <div className="code-lines right">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="code-line"
              ref={(el) => (codeLinesRef.current[i + 5] = el)}
              style={{ width: `${60 + Math.random() * 40}%` }}
            />
          ))}
        </div>

        {/* Loading info */}
        <div className="loader-info" ref={textRef}>
          <div className="glitch-text" data-text={loadingText}>
            {loadingText}
          </div>
          <p className="loader-subtitle">Backend Developer Portfolio</p>
        </div>

        {/* Advanced progress */}
        <div className="advanced-progress">
          <div className="progress-bg">
            <div className="progress-fill-advanced" ref={progressRef} />
          </div>
          <div className="progress-info">
            <span className="progress-percent">{count}%</span>
            <span className="progress-status">{count < 100 ? 'Loading...' : 'Complete'}</span>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="corner-decor tl" />
      <div className="corner-decor tr" />
      <div className="corner-decor bl" />
      <div className="corner-decor br" />
    </div>
  );
};

export default Loader;
