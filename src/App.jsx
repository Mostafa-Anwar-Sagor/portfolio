import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Research from './components/Research';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VisitorCounter from './components/VisitorCounter';
import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import FloatingParticles from './components/FloatingParticles';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.1 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function GlowSeparator() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="section-separator-glow"
    />
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Loader key="loader" />
      ) : (
        <motion.div key="app" className="relative noise-overlay"
          variants={pageVariants} initial="hidden" animate="visible">
          <FloatingParticles />
          <div className="particles-bg" />
          <ScrollProgress />
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <GlowSeparator />
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <About />
            </motion.div>
            <GlowSeparator />
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <Skills />
            </motion.div>
            <GlowSeparator />
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <Projects />
            </motion.div>
            <GlowSeparator />
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <Experience />
            </motion.div>
            <GlowSeparator />
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <Education />
            </motion.div>
            <GlowSeparator />
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <Certifications />
            </motion.div>
            <GlowSeparator />
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <Research />
            </motion.div>
            <GlowSeparator />
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <Contact />
            </motion.div>
          </main>
          <Footer />
          <VisitorCounter />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
