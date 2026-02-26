import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaFire } from 'react-icons/fa';
import { skillCategories } from '../data/portfolioData';
import SectionHeading from './SectionHeading';

const allTechs = [
  'Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS', 'R',
  'Django', 'Next.js', 'React', 'TensorFlow', 'PyTorch', 'Keras',
  'OpenCV', 'scikit-learn', 'XGBoost', 'Ray RLlib',
  'PostgreSQL', 'MySQL', 'SQLite', 'MongoDB',
  'AWS', 'Azure', 'Docker', 'Git', 'Celery', 'FFmpeg',
  'Tailwind CSS', 'REST APIs', 'WebSocket', 'Nmap',
];

function getLevelLabel(level) {
  if (level >= 90) return { text: 'Expert', color: '#10B981' };
  if (level >= 80) return { text: 'Advanced', color: '#6C63FF' };
  if (level >= 70) return { text: 'Proficient', color: '#00D4FF' };
  return { text: 'Familiar', color: '#FFD93D' };
}

function getBarColor(level) {
  if (level >= 90) return 'from-emerald-400 to-emerald-600';
  if (level >= 80) return 'from-primary to-indigo-500';
  if (level >= 70) return 'from-secondary to-cyan-600';
  return 'from-yellow-400 to-amber-500';
}

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-16 sm:py-24 md:py-32 px-4 relative scroll-mt-24">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <SectionHeading title="Skills & Expertise" subtitle="Technologies I work with daily" />

        {/* Category Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mt-10 sm:mt-12 mb-10 sm:mb-14">
          {skillCategories.map((cat, i) => (
            <motion.button key={cat.title} onClick={() => setActiveTab(i)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 overflow-hidden ${
                activeTab === i
                  ? 'text-white shadow-lg shadow-primary/25'
                  : 'glass text-gray-400 hover:text-white hover:border-primary/30'}`}>
              {activeTab === i && (
                <motion.div layoutId="skills-tab-bg"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span>{cat.icon}</span> {cat.title}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Display */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} variants={container} initial="hidden" animate="visible" exit={{ opacity: 0, y: -15, transition: { duration: 0.2 } }}
            className="max-w-4xl mx-auto">

            {/* Category header */}
            <motion.div variants={item} className="flex items-center justify-between mb-8 px-1">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{skillCategories[activeTab].icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{skillCategories[activeTab].title}</h3>
                  <p className="text-xs text-gray-500">{skillCategories[activeTab].skills.length} technologies</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-[10px] text-gray-600">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Expert</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Advanced</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary" /> Proficient</span>
              </div>
            </motion.div>

            {/* Skill cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {skillCategories[activeTab].skills.map((skill, i) => {
                const level = getLevelLabel(skill.level);
                const barColor = getBarColor(skill.level);
                return (
                  <motion.div key={skill.name} variants={item}
                    className="glass rounded-2xl p-5 glass-hover card-shine group relative overflow-hidden cursor-default"
                    whileHover={{ y: -4, scale: 1.01 }}>

                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 h-[2px] transition-all duration-700 group-hover:w-full w-0"
                      style={{ background: `linear-gradient(90deg, ${level.color}, transparent)` }} />

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                          style={{ background: `${level.color}12`, border: `1px solid ${level.color}25` }}>
                          <skill.icon className="text-lg" style={{ color: level.color }} />
                        </div>
                        <div>
                          <span className="font-bold text-white text-sm block">{skill.name}</span>
                          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: level.color }}>{level.text}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {skill.level >= 90 && <FaFire className="text-amber-400 text-xs animate-pulse" />}
                        <motion.span className="text-sm font-mono font-bold tabular-nums" style={{ color: level.color }}
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.08 }}>
                          {skill.level}%
                        </motion.span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                      <motion.div className={`h-full rounded-full bg-gradient-to-r ${barColor} relative`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.2, delay: 0.15 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* All Technologies Cloud */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }} className="mt-20">

          <div className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <div className="text-center mb-8">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-[0.3em] mb-2">Complete Technology Stack</h3>
              <p className="text-xs text-gray-600">30+ technologies across AI, web development, cloud & DevOps</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2.5">
              {allTechs.map((tech, i) => (
                <motion.span key={tech}
                  className="px-4 py-2 rounded-xl text-xs font-medium cursor-default bg-white/[0.03] border border-white/[0.06] text-gray-400 hover:text-white hover:border-primary/30 hover:bg-primary/[0.08] hover:shadow-sm hover:shadow-primary/10 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.02 }}
                  whileHover={{ scale: 1.08, y: -3 }}>
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
