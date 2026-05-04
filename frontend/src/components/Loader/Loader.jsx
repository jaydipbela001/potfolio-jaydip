import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const canvasRef = useRef(null);
  const progressBeamRef = useRef(null);
  const percentRef = useRef(null);
  const glitchTextRef = useRef(null);
  const loadDescRef = useRef(null);
  const avatarRef = useRef(null);
  const satOrbitRef = useRef(null);
  const ringPrimeRef = useRef(null);
  const ringSecRef = useRef(null);
  const ringTertRef = useRef(null);
  const codeStrokesRef = useRef([]);
  const avatarImgRef = useRef(null);

  const [count, setCount] = useState(0);
  const [loadingText, setLoadingText] = useState('BOOT');

  const textStages = ['BOOT', 'LOAD ASSETS', 'COMPILE CORE', 'OPTIMIZE', 'READY'];
  const loadMessages = ['spooling hyperloop', 'compiling neural interface', 'stabilizing quantum field', 'calibrating systems', 'launching...'];

  // Lock body scroll when loader is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.touchAction = 'none';

    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.touchAction = '';
    };
  }, []);

  // Particle System
  const initParticles = useCallback((ctx, width, height) => {
    const particles = [];
    const particleCount = Math.min(120, Math.floor(width * height / 9000));

    class FlowParticle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.3 + 0.15;
        this.size = Math.random() * 1.8 + 0.6;
        this.alpha = Math.random() * 0.3 + 0.15;
        this.color = `hsl(${160 + Math.random() * 30}, 85%, 65%)`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -20) this.x = width + 10;
        if (this.x > width + 20) this.x = -10;
        if (this.y < -20) this.y = height + 10;
        if (this.y > height + 20) this.y = -20;
        this.alpha = 0.25 + Math.sin(Date.now() * 0.0015 + this.x * 0.01) * 0.15;
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new FlowParticle());
    }

    return particles;
  }, []);

  // Smooth Counter Animation
  useEffect(() => {
    let progress = 0;
    let animationId;
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= 60) {
        if (progress >= 100) {
          setCount(100);
          if (loadDescRef.current) loadDescRef.current.innerText = 'SYNC COMPLETE';

          // Exit animation
          setTimeout(() => {
            if (loaderRef.current) {
              loaderRef.current.style.clipPath = 'circle(0% at 50% 50%)';
              setTimeout(() => {
                if (onComplete) onComplete();
              }, 1100);
            }
          }, 400);
          return;
        }

        progress += Math.random() * 2.5 + 1.2;
        if (progress > 100) progress = 100;

        const pct = Math.floor(progress);
        setCount(pct);

        if (progressBeamRef.current) {
          progressBeamRef.current.style.width = `${progress}%`;
        }

        // Update text based on progress
        let idx = 0;
        if (pct >= 95) idx = 4;
        else if (pct >= 70) idx = 3;
        else if (pct >= 40) idx = 2;
        else if (pct >= 15) idx = 1;

        const label = textStages[idx];
        setLoadingText(label);

        if (loadDescRef.current) {
          loadDescRef.current.innerText = loadMessages[idx] || loadMessages[0];
        }

        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [onComplete]);

  // Particle Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particles = initParticles(ctx, width, height);
    let animationId;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particles = initParticles(ctx, width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [initParticles]);

  // Orbital Satellites Animation
  useEffect(() => {
    const satellites = satOrbitRef.current?.querySelectorAll('.sat');
    if (!satellites) return;

    let orbitAngle = 0;
    let animationId;
    const baseRadius = 24;

    const animateOrbit = () => {
      orbitAngle += 0.008;
      satellites.forEach((sat, idx) => {
        const angleOffset = idx * Math.PI / 2;
        const xOff = Math.cos(orbitAngle + angleOffset) * baseRadius * 0.7;
        const yOff = Math.sin(orbitAngle + angleOffset) * baseRadius * 0.5;
        const scale = 1 + Math.sin(orbitAngle * 2 + idx) * 0.05;
        sat.style.transform = `translate(${xOff}px, ${yOff}px) scale(${scale})`;
      });
      animationId = requestAnimationFrame(animateOrbit);
    };

    animateOrbit();

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Ring Wave Animations
  useEffect(() => {
    let waveTime = 0;
    let animationId;

    const animateWaves = () => {
      waveTime += 0.015;
      if (ringPrimeRef.current) {
        ringPrimeRef.current.style.transform = `rotate(${waveTime * 35}deg) scale(${1 + Math.sin(waveTime) * 0.02})`;
      }
      if (ringSecRef.current) {
        ringSecRef.current.style.transform = `rotate(${-waveTime * 28}deg) scale(${1 + Math.cos(waveTime * 0.9) * 0.015})`;
      }
      if (ringTertRef.current) {
        ringTertRef.current.style.transform = `rotate(${waveTime * 22}deg) scale(${1 + Math.sin(waveTime * 1.2) * 0.025})`;
      }
      animationId = requestAnimationFrame(animateWaves);
    };

    animateWaves();

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Avatar Pulse
  useEffect(() => {
    let scaleDir = 1;
    let scaleVal = 1;
    let animationId;

    const pulseAvatar = () => {
      if (!avatarImgRef.current) {
        animationId = requestAnimationFrame(pulseAvatar);
        return;
      }
      scaleVal += scaleDir * 0.002;
      if (scaleVal >= 1.04) scaleDir = -1;
      if (scaleVal <= 0.97) scaleDir = 1;
      avatarImgRef.current.style.transform = `scale(${scaleVal})`;
      animationId = requestAnimationFrame(pulseAvatar);
    };

    pulseAvatar();

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Glitch Micro-Shake
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.65 && avatarRef.current) {
        avatarRef.current.style.transform = `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`;
        setTimeout(() => {
          if (avatarRef.current) avatarRef.current.style.transform = '';
        }, 65);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Dynamic Code Strokes
  useEffect(() => {
    const interval = setInterval(() => {
      codeStrokesRef.current.forEach((stroke, idx) => {
        if (stroke && Math.random() > 0.6) {
          stroke.style.opacity = '1';
          stroke.style.width = '100px';
          setTimeout(() => {
            if (stroke) stroke.style.width = idx % 2 === 0 ? '75px' : '95px';
          }, 150);
        }
      });
    }, 550);

    return () => clearInterval(interval);
  }, []);

  // Avatar image error handling
  const handleAvatarError = () => {
    if (avatarImgRef.current) {
      avatarImgRef.current.style.display = 'none';
    }
    const fallback = document.getElementById('fallbackAvatarIcon');
    if (fallback) fallback.style.display = 'flex';
  };

  return (
    <div className="hyperspace-loader" ref={loaderRef}>
      <canvas ref={canvasRef} className="particle-canvas" />
      <div className="grid-cyber" />

      <div className="loader-core">
        {/* Hyper-dimensional rings */}
        <div className="hyper-rings">
          <div className="h-ring ring-pulse-orb" />
          <div className="h-ring ring-prime" ref={ringPrimeRef} />
          <div className="h-ring ring-secondary" ref={ringSecRef} />
          <div className="h-ring ring-tertiary" ref={ringTertRef} />
          <div className="h-ring ring-quantum" />

          {/* Orbiting satellites */}
          <div className="satellite-orbit" ref={satOrbitRef}>
            <div className="sat s0">
              <svg viewBox="0 0 24 24">
                <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
                <path d="M12 22V12" />
                <path d="M12 12L3 7" />
                <path d="M12 12l9-5" />
              </svg>
            </div>
            <div className="sat s1">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z" />
              </svg>
            </div>
            <div className="sat s2">
              <svg viewBox="0 0 24 24">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
              </svg>
            </div>
            <div className="sat s3">
              <svg viewBox="0 0 24 24">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Avatar */}
        <div className="avatar-neo">
          <div className="glitch-wrapper" ref={avatarRef}>
            <div className="avatar-core">
              <img
                ref={avatarImgRef}
                className="avatar-image"
                src="/icons.svg"
                alt="avatar"
                onError={handleAvatarError}
              />
              <div id="fallbackAvatarIcon" className="fallback-svg" style={{ display: 'none' }}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
            <div className="glow-radial" />
          </div>
        </div>

        {/* Code streams */}
        <div className="code-stream stream-left">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="code-stroke" ref={(el) => (codeStrokesRef.current[i] = el)} />
          ))}
        </div>
        <div className="code-stream stream-right">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="code-stroke right-stroke" ref={(el) => (codeStrokesRef.current[i + 4] = el)} />
          ))}
        </div>

        {/* Status */}
        <div className="status-glow">
          <div className="glitch-word" ref={glitchTextRef} data-text={loadingText}>
            {loadingText}
          </div>
          <div className="sub-status">Jaydip Bela · Backend Developer</div>
        </div>

        {/* Progress */}
        <div className="hyper-progress">
          <div className="progress-track-sleek">
            <div className="progress-beam" ref={progressBeamRef} />
          </div>
          <div className="progress-stats">
            <span className="percent-digit" ref={percentRef}>{count}%</span>
            <span className="load-message" ref={loadDescRef}>initializing core...</span>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="corner-neo corner-tl" />
      <div className="corner-neo corner-tr" />
      <div className="corner-neo corner-bl" />
      <div className="corner-neo corner-br" />
    </div>
  );
};

export default Loader;
