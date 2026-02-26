import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #6C63FF, #00D4FF, #FF6584)',
        boxShadow: '0 0 10px rgba(108, 99, 255, 0.5), 0 0 20px rgba(0, 212, 255, 0.3)',
      }}
    />
  );
}
