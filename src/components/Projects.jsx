import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaChevronRight, FaTimes, FaArrowRight } from 'react-icons/fa';
import { projects } from '../data/portfolioData';
import SectionHeading from './SectionHeading';

const categories = ['All', ...new Set(projects.map((p) => p.category))];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32 px-4 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <SectionHeading title="Featured Projects" subtitle="Production-ready systems I've built" />

        {/* Filter tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mt-10 sm:mt-12 mb-10 sm:mb-12">
          {categories.map((cat) => (
            <motion.button key={cat} onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                filter === cat
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25'
                  : 'glass text-gray-400 hover:text-white'}`}>
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div layout key={project.title}
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="project-card glass rounded-3xl overflow-hidden group cursor-pointer relative tilt-card"
                onClick={() => setModal(project)}
                whileHover={{ y: -10 }}>

                {/* Image section */}
                <div className="relative h-48 overflow-hidden">
                  <img src={project.image} alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy" />
                  <div className="absolute inset-0 img-overlay" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />

                  {/* Floating category badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 rounded-full glass text-[11px] font-semibold text-white/80 backdrop-blur-xl">
                      {project.category}
                    </span>
                  </div>

                  {/* Floating icon */}
                  <motion.div className="absolute bottom-4 left-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-xl"
                      style={{ background: `${project.color}20`, border: `1px solid ${project.color}40` }}>
                      <project.icon className="text-xl" style={{ color: project.color }} />
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-secondary font-medium mb-3">{project.subtitle}</p>
                  <p className="text-sm text-gray-400 leading-relaxed mb-5 line-clamp-2">{project.description}</p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.techs.slice(0, 4).map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-dark-700/80 text-gray-400 border border-dark-600/50">
                        {t}
                      </span>
                    ))}
                    {project.techs.length > 4 && (
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-semibold text-primary/70">
                        +{project.techs.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary transition-colors font-medium"
                        onClick={(e) => e.stopPropagation()}>
                        <FaGithub className="text-sm" /> GitHub
                      </a>
                    )}
                    <span className="flex items-center gap-1 text-xs text-primary/70 font-medium group-hover:text-primary transition-colors">
                      View Details <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Color accent top */}
                <div className="absolute top-0 left-0 w-full h-1"
                  style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}50)` }} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {modal && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            {/* Backdrop */}
            <motion.div className="absolute inset-0 modal-overlay" onClick={() => setModal(null)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

            {/* Modal content */}
            <motion.div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl glass border border-primary/20 shadow-2xl shadow-black/50"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}>

              {/* Close button */}
              <button onClick={() => setModal(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/40 transition-all">
                <FaTimes />
              </button>

              {/* Hero image */}
              <div className="relative h-56 sm:h-72 overflow-hidden rounded-t-3xl">
                <img src={modal.image} alt={modal.title}
                  className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-xl"
                      style={{ background: `${modal.color}20`, border: `1px solid ${modal.color}40` }}>
                      <modal.icon className="text-2xl" style={{ color: modal.color }} />
                    </div>
                    <div>
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold"
                        style={{ background: `${modal.color}20`, color: modal.color }}>
                        {modal.category}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">{modal.title}</h2>
                  <p className="text-sm text-secondary font-medium mt-1">{modal.subtitle}</p>
                </div>
                {/* Top accent */}
                <div className="absolute top-0 left-0 w-full h-1"
                  style={{ background: `linear-gradient(90deg, ${modal.color}, ${modal.color}50)` }} />
              </div>

              {/* Body */}
              <div className="p-4 sm:p-6 md:p-8">
                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-8">{modal.description}</p>

                {/* Highlights */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-8 h-0.5 rounded-full" style={{ background: modal.color }} />
                    Key Features
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {modal.highlights.map((h) => (
                      <motion.div key={h} className="flex items-start gap-3 p-3 rounded-xl glass-hover"
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                        <FaChevronRight className="text-[10px] mt-1.5 flex-shrink-0" style={{ color: modal.color }} />
                        <span className="text-sm text-gray-300">{h}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-8 h-0.5 rounded-full" style={{ background: modal.color }} />
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {modal.techs.map((t) => (
                      <span key={t} className="tech-tag px-4 py-2 rounded-xl text-xs font-semibold text-gray-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
                  {modal.github && (
                    <a href={modal.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 hover:border-primary/30 transition-all">
                      <FaGithub className="text-base" /> View on GitHub
                    </a>
                  )}
                  {modal.live && (
                    <a href={modal.live} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold btn-glow">
                      <FaExternalLinkAlt className="text-xs" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
