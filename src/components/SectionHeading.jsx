import { motion } from 'framer-motion';

const letterVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  visible: (i) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { delay: i * 0.03, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function SectionHeading({ title, subtitle }) {
  const letters = title.split('');

  return (
    <div className="text-center mb-4" style={{ perspective: '800px' }}>
      <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 flex flex-wrap justify-center gap-[1px] sm:gap-[2px]">
        {letters.map((char, i) => (
          <motion.span key={`${char}-${i}`} custom={i} variants={letterVariants}
            className="gradient-text inline-block" style={{ transformOrigin: 'bottom' }}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.7 }}
        className="text-gray-500 text-base md:text-lg mb-5">
        {subtitle}
      </motion.p>
      <motion.div initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 80, opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="section-line mx-auto" />
    </div>
  );
}
