import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaBrain, FaServer, FaRocket, FaPython, FaReact, FaAws, FaGraduationCap, FaMapMarkerAlt } from 'react-icons/fa';
import { SiDjango, SiTensorflow, SiPytorch } from 'react-icons/si';
import { profile } from '../data/portfolioData';
import SectionHeading from './SectionHeading';

const highlights = [
  { icon: FaBrain, title: 'AI / ML Expert', desc: 'TensorFlow, PyTorch, scikit-learn – built 15+ production models', color: '#6C63FF' },
  { icon: FaCode, title: 'Full-Stack Dev', desc: 'Django, React, TypeScript – end-to-end web applications', color: '#00D4FF' },
  { icon: FaServer, title: 'Cloud & DevOps', desc: 'AWS, Docker, CI/CD – scalable infrastructure', color: '#FF6584' },
  { icon: FaRocket, title: 'Rapid Delivery', desc: 'AI-assisted development for fast, high-quality output', color: '#FFD93D' },
];

const techStack = [
  { icon: FaPython, name: 'Python', color: '#3776AB' },
  { icon: SiDjango, name: 'Django', color: '#092E20' },
  { icon: FaReact, name: 'React', color: '#61DAFB' },
  { icon: SiTensorflow, name: 'TensorFlow', color: '#FF6F00' },
  { icon: SiPytorch, name: 'PyTorch', color: '#EE4C2C' },
  { icon: FaAws, name: 'AWS', color: '#FF9900' },
];

const softSkills = [
  { name: 'Problem-Solving', icon: '🧩' },
  { name: 'Communication', icon: '💬' },
  { name: 'Teamwork', icon: '🤝' },
  { name: 'Critical Thinking', icon: '🎯' },
  { name: 'Time Management', icon: '⏱️' },
  { name: 'Leadership', icon: '🚀' },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 px-4 relative scroll-mt-24">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <SectionHeading title="About Me" subtitle="Who I am and what I do" />


        {/* Profile Image - Right after title */}
        <motion.div initial={{ opacity: 0, scale: 0.8, filter: 'blur(15px)' }} animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1, type: 'spring', stiffness: 80 }}
          className="mt-12 flex justify-center">
          <div className="relative group">
            {/* Decorative rings */}
            <div className="absolute -inset-6 rounded-full border border-primary/10 animate-spin" style={{ animationDuration: '25s' }} />
            <div className="absolute -inset-12 rounded-full border border-secondary/5 animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
            {/* Glow ring */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-full opacity-40 blur-lg group-hover:opacity-60 transition-opacity duration-500" />
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-[3px] border-dark-800 shadow-2xl shadow-primary/20">
              <img
                src="/portfolio/images/profileimage.png"
                alt="Mostafa Anwar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-primary to-secondary items-center justify-center text-5xl md:text-6xl font-black text-white hidden">
                MA
              </div>
            </div>
            {/* Status badge */}
            <motion.div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-green-500 border-4 border-dark-900 flex items-center justify-center shadow-lg shadow-green-500/30"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}>
              <span className="text-[10px] text-white font-bold">✓</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Bio Card - Full Width */}
        <motion.div initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, delay: 0.15 }} className="mt-10 glass rounded-3xl p-5 sm:p-8 md:p-10 relative overflow-hidden card-shine border-glow">
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, #6C63FF, #00D4FF, #FF6584)' }} />

          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">Mostafa Anwar</h3>
            <p className="text-secondary font-semibold text-sm sm:text-base mb-4">{profile.title}</p>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-6 max-w-3xl">{profile.bio}</p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <FaGraduationCap className="text-primary" />
                Bachelor of Computer Science (Data Science)
              </span>
              <span className="flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-accent" />
                Albukhary International University, Malaysia
              </span>
            </div>
          </div>
        </motion.div>

        {/* What I Do - Highlight Cards */}
        <motion.div variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mt-12">
          <motion.h3 variants={item} className="text-lg font-semibold text-gray-300 mb-6 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-gradient-to-r from-primary to-secondary rounded-full" />
            What I Do
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {highlights.map((h, i) => (
              <motion.div key={h.title} variants={item}
                className="glass rounded-2xl p-5 sm:p-6 glass-hover card-shine group cursor-default relative overflow-hidden"
                whileHover={{ y: -6, scale: 1.02 }}>
                <div className="absolute top-0 left-0 w-full h-1 opacity-70" style={{ background: `linear-gradient(90deg, ${h.color}, transparent)` }} />
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${h.color}15`, border: `1px solid ${h.color}30` }}>
                  <h.icon className="text-lg" style={{ color: h.color }} />
                </div>
                <h4 className="font-bold text-white text-sm mb-1.5">{h.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack & Soft Skills in 2 columns */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {/* Tech Stack */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass rounded-2xl p-5 sm:p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-secondary to-transparent" />
            <h3 className="text-sm font-semibold text-gray-300 mb-5 flex items-center gap-2 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Core Technologies
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {techStack.map((t, i) => (
                <motion.div key={t.name}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary/30 hover:bg-white/[0.06] transition-all duration-300 cursor-default group"
                  initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.08 }} whileHover={{ y: -4, scale: 1.05 }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${t.color}12`, border: `1px solid ${t.color}25` }}>
                    <t.icon style={{ color: t.color }} className="text-lg" />
                  </div>
                  <span className="text-[11px] font-medium text-gray-400 group-hover:text-gray-200 transition-colors">{t.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="glass rounded-2xl p-5 sm:p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent via-primary to-transparent" />
            <h3 className="text-sm font-semibold text-gray-300 mb-5 flex items-center gap-2 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Soft Skills
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {softSkills.map((s, i) => (
                <motion.div key={s.name} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.06 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary/30 hover:bg-white/[0.06] transition-all duration-300 cursor-default group"
                  whileHover={{ x: 4 }}>
                  <span className="text-lg">{s.icon}</span>
                  <span className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors">{s.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
