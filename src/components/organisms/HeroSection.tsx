import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity }}
      className="relative min-h-screen w-full flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460]" />

      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 blur-3xl"
          style={{
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
            rotate: scrollY
          }}
        />
        <motion.div
          className="absolute right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-red-400/20 to-pink-400/20 blur-3xl"
          style={{
            x: mousePosition.x * -2,
            y: mousePosition.y * -2,
            rotate: scrollY
          }}
        />
      </div>

      <div className="relative z-10 text-center text-white max-w-[90vw] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative mb-2">
            <motion.h1
              style={{ y }}
              className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tighter bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent"
            >
              Studio110
            </motion.h1>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm text-yellow-300 tracking-widest uppercase"
            >
              Welcome to
            </motion.span>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light"
          >
            <span className="block">
              Capturing moments, creating memories, and telling your story through visual excellence
            </span>
            <span className="block text-lg text-yellow-200/80 mt-2">
              Where every frame tells a story, every shot captures an emotion
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-2 items-center text-sm text-yellow-200/60 mt-1"
          >
            <span>✧ Professional Photography</span>
            <span className="hidden sm:block">•</span>
            <span>✧ Creative Direction</span>
            <span className="hidden sm:block">•</span>
            <span>✧ Visual Storytelling</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex gap-4 mt-6"
          >
            <motion.a
              href="#services"
              className="group relative px-6 py-3 rounded-full bg-white text-black font-medium overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Explore Our Work</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ mixBlendMode: 'overlay' }}
              />
            </motion.a>
            <motion.a
              href="#contact"
              className="group px-6 py-3 rounded-full border border-white/30 text-white font-medium transition-all hover:border-white/60"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
