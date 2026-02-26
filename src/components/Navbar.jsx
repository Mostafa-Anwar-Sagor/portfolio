import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { navLinks, profile } from '../data/portfolioData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => document.getElementById(l.id));
      let current = '';
      for (const sec of sections) {
        if (sec && sec.getBoundingClientRect().top <= 150) current = sec.id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const navH = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-blur shadow-lg shadow-black/20 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.a href="#" className="flex items-center gap-3 group" whileHover={{ scale: 1.05 }}
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm shadow-lg shadow-primary/30" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800 }}>
                MA
              </div>
              <span className="hidden sm:flex flex-col leading-none">
                <span className="text-[17px] tracking-wider name-gradient" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800 }}>MOSTAFA</span>
                <span className="text-[10px] tracking-[0.35em] text-gray-400 uppercase" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 500 }}>Anwar</span>
              </span>
            </motion.a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => go(link.id)}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-xl transition-colors ${
                    activeSection === link.id ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                  {activeSection === link.id && (
                    <motion.div layoutId="nav-active"
                      className="absolute inset-0 bg-primary/15 border border-primary/25 rounded-xl"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              ))}
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer"
                className="ml-3 px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary to-secondary text-white btn-glow">
                Resume
              </a>
            </div>

            <button className="md:hidden text-2xl text-gray-300 hover:text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-dark-800/95 border-l border-primary/15 p-6 pt-20 flex flex-col gap-2 backdrop-blur-xl">
              {navLinks.map((link, i) => (
                <motion.button key={link.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }} onClick={() => go(link.id)}
                  className={`text-left px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                    activeSection === link.id ? 'bg-primary/15 text-white border border-primary/25' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                  {link.label}
                </motion.button>
              ))}
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer"
                className="mt-4 text-center px-4 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold">
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
