import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimationConfig {
  duration?: number;
  ease?: string;
  delay?: number;
}

interface AnimationProps {
  target: string;
  config?: AnimationConfig;
  scrollTrigger?: boolean;
}

export const useGSAPAnimation = ({
  target,
  config = { duration: 1, ease: 'power2.out' },
  scrollTrigger = false,
}: AnimationProps) => {
  const element = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!element.current) return;

    const animation = {
      opacity: 0,
      y: 50,
      duration: config.duration,
      ease: config.ease,
      delay: config.delay,
    };

    if (scrollTrigger) {
      gsap.from(element.current, {
        ...animation,
        scrollTrigger: {
          trigger: element.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse',
        },
      });
    } else {
      gsap.from(element.current, animation);
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [config, scrollTrigger]);

  return element;
};
