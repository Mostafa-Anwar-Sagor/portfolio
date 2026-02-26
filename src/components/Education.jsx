import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaBook, FaStar, FaUniversity, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { education } from '../data/portfolioData';
import SectionHeading from './SectionHeading';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6 } },
};

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="py-32 px-4 relative scroll-mt-24">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <SectionHeading title="Education" subtitle="Academic background" />

        <motion.div variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="mt-16 space-y-8">
          {education.map((edu) => (
            <motion.div key={edu.institution} variants={item}
              className="glass rounded-3xl p-8 md:p-10 glass-hover card-shine relative overflow-hidden group"
              whileHover={{ y: -5 }}>

              {/* Gradient top border */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

              {/* Decorative background glow */}
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700"
                style={{ background: 'radial-gradient(circle, #6C63FF 0%, transparent 70%)' }} />

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: Icon & CGPA */}
                <div className="flex flex-col items-center gap-4 flex-shrink-0">
                  <motion.div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center border border-primary/10"
                    whileHover={{ scale: 1.1, rotate: 5 }}>
                    <FaGraduationCap className="text-primary text-3xl" />
                  </motion.div>
                  <motion.div className="flex flex-col items-center gap-1 px-5 py-3 rounded-2xl bg-gradient-to-br from-primary/[0.08] to-secondary/[0.08] border border-primary/15"
                    whileHover={{ scale: 1.05 }}>
                    <FaStar className="text-yellow-400 text-sm" />
                    <span className="text-xl font-black gradient-text">{edu.cgpa}</span>
                    <span className="text-[9px] text-gray-500 uppercase tracking-wider font-bold">CGPA</span>
                  </motion.div>
                </div>

                {/* Right: Details */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{edu.degree}</h3>
                  <p className="text-secondary font-semibold text-sm mb-4">{edu.major}</p>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8">
                    <span className="flex items-center gap-2 text-sm text-gray-400">
                      <FaUniversity className="text-primary text-xs" /> {edu.institution}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-gray-400">
                      <FaMapMarkerAlt className="text-accent text-xs" /> {edu.location}
                    </span>
                    <span className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                      <FaCalendarAlt className="text-secondary text-[10px]" /> {edu.period}
                    </span>
                  </div>

                  {/* Coursework */}
                  <div className="glass rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-secondary via-primary to-transparent" />
                    <div className="flex items-center gap-2 mb-4">
                      <FaBook className="text-secondary text-xs" />
                      <span className="text-xs font-bold text-gray-300 uppercase tracking-[0.2em]">
                        Relevant Coursework
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, j) => (
                        <motion.span key={course}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.4 + j * 0.04 }}
                          className="px-4 py-2 rounded-xl text-xs font-medium cursor-default bg-white/[0.03] border border-white/[0.06] text-gray-400 hover:text-white hover:border-primary/30 hover:bg-primary/[0.08] transition-all duration-300"
                          whileHover={{ scale: 1.05, y: -2 }}>
                          {course}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
