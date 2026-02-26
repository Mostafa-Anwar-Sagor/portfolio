import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaFlask, FaSpinner, FaCheckCircle, FaFileAlt, FaMicroscope, FaArrowRight } from 'react-icons/fa';
import { research } from '../data/portfolioData';
import SectionHeading from './SectionHeading';

const statusConfig = {
  ongoing: { icon: FaSpinner, color: '#00D4FF', bg: 'from-cyan-500/10 to-blue-500/10', label: 'In Progress', spin: true },
  default: { icon: FaFileAlt, color: '#6C63FF', bg: 'from-primary/10 to-indigo-500/10', label: 'Preparing', spin: false },
  completed: { icon: FaCheckCircle, color: '#10B981', bg: 'from-emerald-500/10 to-green-500/10', label: 'Completed', spin: false },
};

function getStatus(s) {
  const lower = s.toLowerCase();
  if (lower.includes('ongoing')) return statusConfig.ongoing;
  if (lower.includes('completed') || lower.includes('published')) return statusConfig.completed;
  return statusConfig.default;
}

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Research() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 relative scroll-mt-24">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <SectionHeading title="Research" subtitle="Academic research contributions" />

        <motion.div variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="mt-12 sm:mt-16 space-y-6">
          {research.map((r, i) => {
            const st = getStatus(r.status);
            return (
              <motion.div key={r.title} variants={item}
                className="glass rounded-3xl p-5 sm:p-7 md:p-8 glass-hover card-shine group relative overflow-hidden cursor-default"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}>

                {/* Top accent */}
                <div className="absolute top-0 left-0 w-full h-1"
                  style={{ background: `linear-gradient(90deg, ${st.color}, transparent)` }} />

                {/* Background glow */}
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700"
                  style={{ background: `radial-gradient(circle, ${st.color} 0%, transparent 70%)` }} />

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Icon */}
                  <motion.div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${st.bg} flex items-center justify-center flex-shrink-0 border border-white/5 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}>
                    <FaMicroscope className="text-2xl" style={{ color: st.color }} />
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{r.title}</h3>
                      <motion.div className="flex items-center gap-2 px-4 py-2 rounded-xl border flex-shrink-0"
                        style={{ background: `${st.color}08`, borderColor: `${st.color}20`, color: st.color }}
                        whileHover={{ scale: 1.05 }}>
                        <st.icon className={`text-xs ${st.spin ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
                        <span className="text-xs font-bold">{r.status}</span>
                      </motion.div>
                    </div>

                    <p className="text-sm font-semibold mb-3" style={{ color: st.color }}>
                      <FaArrowRight className="inline text-[10px] mr-1.5" />
                      {r.role}
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed">{r.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Research stats mini-bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 glass rounded-2xl p-5 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-center">
          <div>
            <div className="text-2xl font-black gradient-text">{research.length}</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Papers</div>
          </div>
          <div className="w-px h-8 bg-white/10 hidden md:block" />
          <div>
            <div className="text-2xl font-black text-secondary">{research.filter(r => r.status.toLowerCase().includes('ongoing')).length}</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Ongoing</div>
          </div>
          <div className="w-px h-8 bg-white/10 hidden md:block" />
          <div>
            <div className="text-2xl font-black text-emerald-400">{research.filter(r => !r.status.toLowerCase().includes('ongoing')).length}</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">In Preparation</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
