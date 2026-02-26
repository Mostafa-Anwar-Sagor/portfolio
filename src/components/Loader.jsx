import { motion } from 'framer-motion';
import { FaLaptopCode } from 'react-icons/fa';

export default function Loader() {
  return (
    <motion.div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark-900"
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(12px)' }} transition={{ duration: 0.6, ease: 'easeInOut' }}>

      {/* Animated logo */}
      <div className="relative w-48 h-48 mb-10">
        {[0, 0.3, 0.6].map((delay, i) => (
          <motion.div key={i}
            className={`absolute rounded-full border-2 ${
              i === 0 ? 'inset-0 border-primary/30' : i === 1 ? 'inset-2 border-secondary/40' : 'inset-4 border-accent/30'}`}
            animate={{ scale: [1, 1.5 - i * 0.1, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay }} />
        ))}
        <motion.div className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/50" />
        </motion.div>

        {/* Center tech icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <FaLaptopCode className="text-5xl gradient-text text-primary" />
          </motion.div>
        </div>
      </div>

      <motion.h1 className="text-4xl font-bold gradient-text mb-3"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        Mostafa Anwar
      </motion.h1>
      <motion.p className="text-base text-gray-500 tracking-[0.3em] uppercase"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        Loading Portfolio
      </motion.p>

      <motion.div className="w-64 h-1.5 bg-dark-700 rounded-full mt-8 overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
          initial={{ width: 0 }} animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }} />
      </motion.div>
    </motion.div>
  );
}
