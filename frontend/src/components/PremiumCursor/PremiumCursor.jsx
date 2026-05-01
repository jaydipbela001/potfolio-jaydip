import React, { useEffect, useRef } from 'react';
import './PremiumCursor.css';

const PremiumCursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const isHoveringRef = useRef(false);
  
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update cursor instantly
      if (cursor) {
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
        isHoveringRef.current = true;
      }
    };

    const handleMouseOut = () => {
      isHoveringRef.current = false;
    };

    const animate = () => {
      // Ring follows with smooth delay
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (ring) {
        const scale = isHoveringRef.current ? 2 : 1;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) scale(${scale})`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
};

export default PremiumCursor;
