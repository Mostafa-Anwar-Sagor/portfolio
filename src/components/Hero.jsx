import { motion, useMotionValue, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { HiDownload } from 'react-icons/hi';
import { FaCode, FaRocket } from 'react-icons/fa';
import { profile, stats } from '../data/portfolioData';

const codeSnippets = [
  { text: 'model.fit(X, y)', x: '8%', y: '18%', delay: 0 },
  { text: 'npm run build', x: '85%', y: '22%', delay: 1.5 },
  { text: 'docker compose up', x: '12%', y: '75%', delay: 3 },
  { text: 'git push origin main', x: '78%', y: '80%', delay: 2.5 },
  { text: 'SELECT * FROM ai', x: '70%', y: '45%', delay: 4 },
  { text: 'import torch', x: '5%', y: '50%', delay: 1 },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const child = {
  hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Hero() {
  const seq = profile.typingTexts.flatMap((t) => [t, 2000]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(my, [-300, 300], [4, -4]);
  const ry = useTransform(mx, [-300, 300], [-4, 4]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-8 overflow-hidden" onMouseMove={onMove}>
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #6C63FF 0%, transparent 70%)' }}
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
        <motion.div className="absolute -bottom-1/3 -right-1/4 w-[600px] h-[600px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)' }}
          animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} />
        <motion.div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FF6584 0%, transparent 70%)' }}
          animate={{ x: [0, 50, 0], y: [0, -80, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />
        {/* Additional ambient glow */}
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #FFD93D 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      </div>

      {/* Code snippets */}
      {codeSnippets.map((s, i) => (
        <motion.div key={i} className="absolute hidden lg:block font-mono text-[11px] text-primary/20 select-none pointer-events-none"
          style={{ left: s.x, top: s.y }}
          animate={{ y: [0, -15, 0], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 4, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}>
          {s.text}
        </motion.div>
      ))}

      <div className="absolute inset-0 dot-grid opacity-40" />

      <motion.div className="max-w-5xl mx-auto text-center z-10 flex flex-col items-center justify-center" variants={container} initial="hidden" animate="visible"
        style={{ perspective: 1200 }}>

        {/* Name */}
        <motion.div variants={child} style={{ rotateX: rx, rotateY: ry }}>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 font-medium mb-3 tracking-wide">Hi, I'm</p>
          <h1 className="hero-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-5 tracking-tight">
            <span className="name-gradient">MOSTAFA ANWAR</span>
          </h1>
        </motion.div>

        {/* Typing */}
        <motion.div variants={child} className="mb-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl glass border border-primary/20">
            <FaCode className="text-secondary text-sm" />
            <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-200">
              <TypeAnimation sequence={seq} wrapper="span" speed={40} repeat={Infinity} cursor />
            </span>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p variants={child} className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed px-2 sm:px-0">
          Building production-ready AI systems — from deep learning models to full-stack applications.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={child} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 px-2 sm:px-0">
          <motion.a href="#projects" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.preventDefault(); const el = document.getElementById('projects'); if(el){ window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' }); } }}
            className="group relative px-5 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold btn-glow text-sm sm:text-base">
            <span className="relative z-10 flex items-center gap-2">
              <FaRocket className="text-xs group-hover:animate-bounce" /> View My Work
            </span>
          </motion.a>
          <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.preventDefault(); const el = document.getElementById('contact'); if(el){ window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' }); } }}
            className="px-5 py-3 sm:px-7 sm:py-3.5 rounded-xl glass border border-primary/30 text-gray-300 font-bold hover:border-primary/60 hover:text-white transition-all text-sm sm:text-base hover:shadow-lg hover:shadow-primary/10">
            Get In Touch
          </motion.a>
          <motion.a href={profile.resumeUrl} download target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-3.5 rounded-xl text-gray-400 hover:text-white transition-all text-sm sm:text-base hover:bg-white/5">
            <HiDownload className="text-base" /> Resume
          </motion.a>
        </motion.div>

        {/* Socials */}
        <motion.div variants={child} className="flex items-center justify-center gap-2.5 sm:gap-3 mb-8">
          {profile.socials.map((s) => (
            <motion.a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl glass border border-primary/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              whileHover={{ scale: 1.15, y: -4, rotate: 5 }} whileTap={{ scale: 0.9 }} title={s.label}>
              <s.icon className="text-sm" />
            </motion.a>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div variants={child} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-2xl mx-auto mb-8 px-2 sm:px-0">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} className="glass rounded-xl p-3 sm:p-4 text-center cursor-default group hover:border-primary/40 transition-all duration-300"
              whileHover={{ y: -4, scale: 1.02 }}>
              <motion.div className="text-2xl sm:text-3xl font-black gradient-text mb-1"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 1.2 + i * 0.15, type: 'spring', stiffness: 200 }}>
                {stat.value}
              </motion.div>
              <div className="text-[10px] sm:text-xs text-gray-500 font-medium group-hover:text-gray-400 transition-colors">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator - minimal */}
        <motion.div variants={child} className="flex flex-col items-center gap-1">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-gray-700/50 flex items-start justify-center p-1">
            <motion.div className="w-1 h-1 rounded-full bg-primary"
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
