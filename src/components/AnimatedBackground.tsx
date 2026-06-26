import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function AnimatedBackground() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const springConfig = { damping: 40, stiffness: 200, mass: 0.5 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half of spotlight size (400px width/height = 200px offset)
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-slate-50 gradient-mesh w-full h-full">
      {/* Floating Blob 1 - Indigo */}
      <motion.div
        className="absolute w-[45vw] h-[45vw] md:w-[35rem] md:h-[35rem] rounded-full bg-indigo-200/40 blur-[80px]"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ top: '10%', left: '5%' }}
      />

      {/* Floating Blob 2 - Cyan */}
      <motion.div
        className="absolute w-[50vw] h-[50vw] md:w-[40rem] md:h-[40rem] rounded-full bg-cyan-200/30 blur-[90px]"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 40, -50, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ top: '40%', right: '5%' }}
      />

      {/* Floating Blob 3 - Pink */}
      <motion.div
        className="absolute w-[40vw] h-[40vw] md:w-[30rem] md:h-[30rem] rounded-full bg-pink-200/30 blur-[80px]"
        animate={{
          x: [0, 30, -30, 0],
          y: [0, 50, -40, 0],
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ bottom: '10%', left: '20%' }}
      />

      {/* Floating Blob 4 - Warm Yellow/Orange */}
      <motion.div
        className="absolute w-[35vw] h-[35vw] md:w-[25rem] md:h-[25rem] rounded-full bg-amber-100/30 blur-[70px]"
        animate={{
          x: [0, -30, 20, 0],
          y: [0, -30, 40, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ top: '25%', left: '45%' }}
      />

      {/* Interactive Cursor Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute hidden md:block w-[400px] h-[400px] rounded-full bg-gradient-to-r from-indigo-300/15 via-purple-300/10 to-transparent blur-[60px]"
        style={{
          x: glowX,
          y: glowY,
        }}
      />

      {/* Subtle floating particles (Simulated decoration) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_60%,_rgba(255,255,255,0.8)_100%)]" />
    </div>
  );
}
