import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaMapMarkerAlt, FaPaperPlane, FaCheck, FaArrowRight, FaExclamationTriangle } from 'react-icons/fa';
import { profile } from '../data/portfolioData';
import SectionHeading from './SectionHeading';

// Formspree endpoint - sends submissions directly to your email
const FORMSPREE_URL = 'https://formspree.io/f/xdalbdvo';

const contactInfo = [
  { icon: FaEnvelope, label: 'Email', value: profile.email, href: `mailto:${profile.email}`, color: '#6C63FF' },
  { icon: FaPhone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}`, color: '#00D4FF' },
  { icon: FaLinkedin, label: 'LinkedIn', value: 'Mostafa Anwar', href: profile.linkedin, color: '#0A66C2' },
  { icon: FaGithub, label: 'GitHub', value: 'MostafaAnwar', href: profile.github, color: '#fff' },
  { icon: FaMapMarkerAlt, label: 'Location', value: profile.location, href: null, color: '#FF6584' },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5 } },
};

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject || 'Portfolio Contact',
          message: form.message,
          _replyto: form.email,
        }),
      });

      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Failed');
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputClass = 'w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 focus:bg-white/[0.05] transition-all duration-500 hover:border-white/10';

  return (
    <section id="contact" className="py-32 px-4 relative scroll-mt-24">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <SectionHeading title="Get In Touch" subtitle="Let's work together" />

        <div className="grid lg:grid-cols-5 gap-10 mt-16">
          {/* Left: Contact Info */}
          <motion.div variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-2">

            <motion.p variants={item} className="text-gray-400 text-sm leading-relaxed mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your team.
              Feel free to reach out through any channel below.
            </motion.p>

            <div className="space-y-2">
              {contactInfo.map((c, i) => {
                const Inner = (
                  <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/[0.03] transition-all group/c cursor-default">
                    <motion.div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover/c:scale-110"
                      style={{ background: `${c.color}10`, border: `1px solid ${c.color}15` }}
                      whileHover={{ rotate: 5 }}>
                      <c.icon className="text-base" style={{ color: c.color }} />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-gray-600 uppercase tracking-wider font-bold mb-0.5">{c.label}</div>
                      <div className="text-sm text-gray-300 group-hover/c:text-white transition-colors font-medium truncate">{c.value}</div>
                    </div>
                    {c.href && <FaArrowRight className="text-[10px] text-gray-700 group-hover/c:text-primary group-hover/c:translate-x-1 transition-all flex-shrink-0" />}
                  </div>
                );
                return (
                  <motion.div key={c.label} variants={item}>
                    {c.href ? (
                      <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                        {Inner}
                      </a>
                    ) : Inner}
                  </motion.div>
                );
              })}
            </div>

            {/* CTA text */}
            <motion.div variants={item} className="mt-8 glass rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-secondary to-transparent" />
              <p className="text-sm text-gray-300 font-medium leading-relaxed">
                🚀 Currently available for <span className="text-primary font-bold">internship opportunities</span> and <span className="text-secondary font-bold">collaborative projects</span> in AI & Full-Stack development.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.form initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }} animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, delay: 0.2 }} onSubmit={handleSubmit}
            className="lg:col-span-3 glass rounded-3xl p-8 md:p-10 relative overflow-hidden border-glow">

            {/* Top gradient accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

            {/* Background subtle glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-[0.03]"
              style={{ background: 'radial-gradient(circle, #6C63FF 0%, transparent 70%)' }} />

            <h3 className="text-lg font-bold text-white mb-1">Send a Message</h3>
            <p className="text-xs text-gray-500 mb-7">I'll get back to you as soon as possible</p>

            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-2.5">Your Name</label>
                <input type="text" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass} placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-2.5">Email</label>
                <input type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass} placeholder="john@example.com" />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-2.5">Subject</label>
              <input type="text" value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={inputClass} placeholder="Project Collaboration" />
            </div>

            <div className="mb-8">
              <label className="block text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-2.5">Message</label>
              <textarea required rows={5} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
                placeholder="Tell me about your project..." />
            </div>

            <motion.button type="submit" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
              className={`w-full py-4 rounded-2xl font-bold text-white text-sm flex items-center justify-center gap-2.5 btn-glow transition-all duration-300 ${
                status === 'sent' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' :
                status === 'error' ? 'bg-red-500 shadow-lg shadow-red-500/20' :
                status === 'sending' ? 'bg-gray-600 cursor-wait' :
                'bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/20'}`}
              disabled={status === 'sending' || status === 'sent'}>
              {status === 'sent' ? (<><FaCheck /> Message Sent!</>) :
               status === 'error' ? (<><FaExclamationTriangle /> Failed — Try Again</>) :
               status === 'sending' ? (<><span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Sending...</>) :
               (<><FaPaperPlane className="text-xs" /> Send Message</>)}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
