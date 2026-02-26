import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCertificate, FaCalendarAlt, FaAward, FaCheckCircle } from 'react-icons/fa';
import { certifications } from '../data/portfolioData';
import SectionHeading from './SectionHeading';

const certColors = ['#6C63FF', '#00D4FF', '#FF6584', '#FFD93D'];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Certifications() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="certifications" className="py-32 px-4 relative scroll-mt-24">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <SectionHeading title="Certifications" subtitle="Professional credentials" />

        <motion.div variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 gap-6 mt-16">
          {certifications.map((cert, i) => {
            const color = certColors[i % certColors.length];
            return (
              <motion.div key={cert.title} variants={item}
                className="glass rounded-3xl p-7 glass-hover card-shine group relative overflow-hidden cursor-default"
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}>

                {/* Gradient top accent */}
                <div className="absolute top-0 left-0 w-full h-1"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

                {/* Background decorative glow */}
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-[0.04] group-hover:opacity-[0.08] transition-all duration-700"
                  style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }} />

                {/* Verified badge */}
                <div className="absolute top-4 right-4">
                  <motion.div className="flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider"
                    style={{ background: `${color}12`, color, border: `1px solid ${color}20` }}
                    whileHover={{ scale: 1.1 }}>
                    <FaCheckCircle className="text-[8px]" /> Verified
                  </motion.div>
                </div>

                <div className="flex items-start gap-5">
                  <motion.div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `${color}10`, border: `1px solid ${color}20` }}>
                    <FaAward className="text-2xl" style={{ color }} />
                  </motion.div>

                  <div className="flex-1 pt-1">
                    <h3 className="text-base font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors pr-16">
                      {cert.title}
                    </h3>
                    <p className="text-sm font-semibold mb-3" style={{ color }}>{cert.issuer}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FaCalendarAlt className="text-[10px]" style={{ color }} />
                      <span>Issued: {cert.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
