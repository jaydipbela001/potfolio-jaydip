import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const triggersRef = useRef([]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const {
      from = { y: 50, opacity: 0 },
      to = { y: 0, opacity: 1 },
      duration = 0.8,
      delay = 0,
      stagger = 0.1,
      start = 'top 80%',
      markers = false
    } = options;

    const animation = gsap.fromTo(
      element,
      from,
      {
        ...to,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start,
          markers,
          toggleActions: 'play none none reverse'
        }
      }
    );

    triggersRef.current.push(animation.scrollTrigger);

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, [options]);

  return ref;
};

export const useStaggerAnimation = (selector, options = {}) => {
  const containerRef = useRef(null);
  const triggersRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    if (elements.length === 0) return;

    const {
      from = { y: 60, opacity: 0 },
      to = { y: 0, opacity: 1 },
      duration = 0.6,
      stagger = 0.1,
      start = 'top 75%'
    } = options;

    const animation = gsap.fromTo(
      elements,
      from,
      {
        ...to,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: 'play none none reverse'
        }
      }
    );

    triggersRef.current.push(animation.scrollTrigger);

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, [selector, options]);

  return containerRef;
};

export default useScrollAnimation;
