import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorFollower() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"], .cursor-pointer, input, textarea').forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    addHoverListeners();

    // Re-add hover listeners on DOM changes
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovered ? 48 : 12,
          height: hovered ? 48 : 12,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <div className={`w-full h-full rounded-full ${hovered ? 'bg-white/20 backdrop-blur-sm border border-white/30' : 'bg-white'}`} />
      </motion.div>

      {/* Trailing glow ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: useSpring(cursorX, { damping: 35, stiffness: 120, mass: 0.8 }),
          y: useSpring(cursorY, { damping: 35, stiffness: 120, mass: 0.8 }),
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? 64 : 36,
          height: hovered ? 64 : 36,
          opacity: visible ? 0.4 : 0,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        <div className="w-full h-full rounded-full border border-primary/40" />
      </motion.div>
    </>
  );
}
