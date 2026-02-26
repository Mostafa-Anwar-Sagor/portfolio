import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { experience } from '../data/portfolioData';
import SectionHeading from './SectionHeading';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="py-32 px-4 relative scroll-mt-24">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <SectionHeading title="Experience" subtitle="Professional journey so far" />

        <motion.div variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="mt-16 space-y-8">
          {experience.map((exp, i) => (
            <motion.div key={exp.company} variants={item}
              className="relative pl-8 md:pl-14 group">

              {/* Timeline line */}
              <div className="absolute left-0 md:left-4 top-0 bottom-0 w-[2px]">
                <motion.div className="w-full h-full"
                  initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 1, delay: i * 0.3 }}
                  style={{ transformOrigin: 'top', background: 'linear-gradient(180deg, #6C63FF, #00D4FF, transparent)' }} />
              </div>

              {/* Timeline dot */}
              <motion.div className="absolute left-[-6px] md:left-[10px] top-8 z-10"
                initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.2, type: 'spring', stiffness: 300 }}>
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/40">
                  <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" style={{ animationDuration: '3s' }} />
                </div>
              </motion.div>

              <motion.div className="glass rounded-3xl p-7 md:p-9 glass-hover card-shine relative overflow-hidden"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}>

                {/* Top gradient accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-transparent" />

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <motion.div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center flex-shrink-0 border border-primary/10"
                      whileHover={{ scale: 1.1, rotate: 5 }}>
                      <FaBriefcase className="text-primary text-lg" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-0.5">{exp.role}</h3>
                      <div className="text-sm text-secondary font-semibold">{exp.company}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-primary/10 text-xs text-gray-400">
                      <FaCalendarAlt className="text-primary text-[10px]" /> {exp.period}
                    </span>
                    <span className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-secondary/10 text-xs text-gray-400">
                      <FaMapMarkerAlt className="text-secondary text-[10px]" /> {exp.location}
                    </span>
                  </div>
                </div>

                {/* Bullet points */}
                <div className="space-y-3 mb-7">
                  {exp.bullets.map((b, j) => (
                    <motion.div key={j} initial={{ opacity: 0, x: -15 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + j * 0.1 }}
                      className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed group/item">
                      <FaArrowRight className="text-[10px] text-primary mt-1.5 flex-shrink-0 group-hover/item:translate-x-1 transition-transform" />
                      <span>{b}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {exp.techs.map((t) => (
                    <span key={t} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-primary/[0.06] border border-primary/10 text-primary/80 hover:bg-primary/[0.12] hover:border-primary/25 transition-all cursor-default">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
