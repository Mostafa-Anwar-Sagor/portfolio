import { motion } from 'framer-motion';
import { FaHeart, FaLinkedin, FaGithub, FaEnvelope, FaArrowUp, FaCode } from 'react-icons/fa';
import { profile } from '../data/portfolioData';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/5">
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
        <div className="grid md:grid-cols-3 gap-10 items-center">
          {/* Left: Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-primary/20">
                MA
              </div>
              <span className="text-lg font-bold gradient-text">{profile.name}</span>
            </div>
            <p className="text-xs text-gray-500 text-center md:text-left max-w-xs">
              Full-Stack AI Developer passionate about building intelligent systems that solve real-world challenges.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="flex flex-col items-center gap-3">
            <h4 className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">Navigate</h4>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link) => (
                <button key={link}
                  onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-xs text-gray-500 hover:text-primary transition-colors font-medium">
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Socials */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <h4 className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">Connect</h4>
            <div className="flex items-center gap-2.5">
              {[
                { icon: FaLinkedin, href: profile.linkedin, color: '#0A66C2' },
                { icon: FaGithub, href: profile.github, color: '#fff' },
                { icon: FaEnvelope, href: `mailto:${profile.email}`, color: '#6C63FF' },
              ].map((s, i) => (
                <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:border-primary/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3, color: s.color }}
                  aria-label="Social">
                  <s.icon className="text-sm" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span>© {year}</span>
            <span className="gradient-text font-bold">{profile.name}</span>
            <span className="mx-1">·</span>
            <span>Built with</span>
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <FaHeart className="text-accent text-[10px]" />
            </motion.span>
            <span>&</span>
            <FaCode className="text-primary text-[10px]" />
            <span>React</span>
          </div>

          <motion.button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 text-[10px] text-gray-600 hover:text-primary transition-colors uppercase tracking-wider font-bold"
            whileHover={{ y: -2 }}>
            <FaArrowUp className="text-[8px]" /> Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
