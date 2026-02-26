import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUsers, FaChevronDown, FaChevronUp, FaCircle, FaGlobe } from 'react-icons/fa';

const VISITOR_ID_KEY = 'portfolio_visitor_id';
const VISITOR_COUNT_CACHE = 'portfolio_visitor_count';
const COUNTER_NAMESPACE = 'mostafa-anwar-portfolio-live';
const COUNTER_API = `https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}`;

// Heartbeat interval for active presence tracking
const HEARTBEAT_INTERVAL = 30000;

// Retry fetch with exponential backoff
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch { /* retry */ }
    if (i < retries - 1) await new Promise(r => setTimeout(r, 1000 * (i + 1)));
  }
  return null;
}

export default function VisitorCounter() {
  const [uniqueVisitors, setUniqueVisitors] = useState(() => {
    // Load cached count immediately so we never show 0
    try {
      const cached = localStorage.getItem(VISITOR_COUNT_CACHE);
      return cached ? parseInt(cached, 10) : null;
    } catch { return null; }
  });
  const [activeNow, setActiveNow] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [pulse, setPulse] = useState(false);
  const heartbeatRef = useRef(null);
  const visitorRefreshRef = useRef(null);

  // Save visitor count to localStorage cache
  const cacheCount = useCallback((count) => {
    if (count != null && count > 0) {
      try { localStorage.setItem(VISITOR_COUNT_CACHE, String(count)); } catch {}
    }
  }, []);

  // Send heartbeat to track active presence
  const sendHeartbeat = useCallback(async () => {
    try {
      const minuteKey = Math.floor(Date.now() / 60000);
      const prevMinuteKey = minuteKey - 1;

      // Always increment heartbeat
      await fetchWithRetry(`${COUNTER_API}/active_${minuteKey}/up`);

      // Read current + previous minute for active count
      let currentCount = 0;
      let prevCount = 0;

      const currentData = await fetchWithRetry(`${COUNTER_API}/active_${minuteKey}`);
      if (currentData) currentCount = currentData.count || 0;

      const prevData = await fetchWithRetry(`${COUNTER_API}/active_${prevMinuteKey}`);
      if (prevData) prevCount = prevData.count || 0;

      // Estimate unique active users (each user sends ~2 heartbeats per minute)
      const totalHeartbeats = currentCount + Math.floor(prevCount * 0.5);
      const estimated = Math.max(1, Math.ceil(totalHeartbeats / 3));
      setActiveNow(estimated);
    } catch {
      setActiveNow(1);
    }
  }, []);

  // Fetch and/or increment unique visitors
  const fetchCounts = useCallback(async () => {
    try {
      const existingId = localStorage.getItem(VISITOR_ID_KEY);
      const isNewVisitor = !existingId;

      if (isNewVisitor) {
        // New visitor — increment counter
        localStorage.setItem(VISITOR_ID_KEY, `v_${Date.now()}_${Math.random().toString(36).slice(2)}`);
        const data = await fetchWithRetry(`${COUNTER_API}/unique/up`);
        if (data && data.count > 0) {
          setUniqueVisitors(data.count);
          cacheCount(data.count);
        } else {
          // Increment failed, try reading
          const readData = await fetchWithRetry(`${COUNTER_API}/unique`);
          if (readData && readData.count > 0) {
            setUniqueVisitors(readData.count);
            cacheCount(readData.count);
          }
        }
      } else {
        // Returning visitor — just read the count
        const data = await fetchWithRetry(`${COUNTER_API}/unique`);
        if (data && data.count > 0) {
          setUniqueVisitors(data.count);
          cacheCount(data.count);
        }
        // If fetch fails, keep the cached value (already loaded from state init)
      }
    } catch {
      // Keep whatever cached value we have — do NOT set to 0
    }
    setLoaded(true);
  }, [cacheCount]);

  useEffect(() => {
    fetchCounts();
    sendHeartbeat();

    // Heartbeat interval for active tracking
    heartbeatRef.current = setInterval(() => {
      sendHeartbeat();
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, HEARTBEAT_INTERVAL);

    // Refresh unique visitors every 60s
    visitorRefreshRef.current = setInterval(async () => {
      const data = await fetchWithRetry(`${COUNTER_API}/unique`);
      if (data && data.count > 0) {
        setUniqueVisitors(data.count);
        cacheCount(data.count);
      }
    }, 60000);

    const onUnload = () => {
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
    };
    window.addEventListener('beforeunload', onUnload);

    return () => {
      clearInterval(heartbeatRef.current);
      clearInterval(visitorRefreshRef.current);
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [fetchCounts, sendHeartbeat, cacheCount]);

  if (!loaded && uniqueVisitors == null) return null;

  const displayCount = uniqueVisitors != null && uniqueVisitors > 0 ? uniqueVisitors : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.5, duration: 0.6 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
    >
      {/* Main pill */}
      <motion.button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 sm:gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl glass border border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer group shadow-lg shadow-black/30"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Live indicator dot */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>

        <span className="text-[10px] sm:text-xs font-semibold text-gray-400 tabular-nums">
          {activeNow} active
        </span>

        <span className="text-gray-600 text-[10px]">·</span>

        <FaUsers className="text-[10px] text-gray-500" />
        <span className="text-[10px] sm:text-xs font-semibold text-gray-400 tabular-nums">
          {displayCount != null ? displayCount.toLocaleString() : '—'} visitors
        </span>

        {expanded ? (
          <FaChevronDown className="text-[10px] text-gray-600 ml-0.5" />
        ) : (
          <FaChevronUp className="text-[10px] text-gray-600 ml-0.5" />
        )}
      </motion.button>

      {/* Expanded panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-14 right-0 w-56 sm:w-64 glass rounded-2xl p-4 sm:p-5 border border-primary/15 shadow-2xl shadow-black/40"
          >
            <h4 className="text-xs font-bold text-gray-200 mb-4 flex items-center gap-2 uppercase tracking-wider">
              <FaGlobe className="text-primary text-[10px]" />
              Live Analytics
            </h4>

            <div className="space-y-3.5">
              {/* Active Now */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-green-500/5 border border-green-500/15">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center relative">
                    <FaCircle className="text-[8px] text-green-500" />
                    <motion.div
                      className="absolute inset-0 rounded-lg border border-green-500/30"
                      animate={pulse ? { scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] } : {}}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <div>
                    <span className="text-xs text-gray-300 font-medium block leading-tight">Active Now</span>
                    <span className="text-[10px] text-green-400/60">Real-time</span>
                  </div>
                </div>
                <motion.span
                  key={activeNow}
                  initial={{ scale: 1.3, color: '#4ade80' }}
                  animate={{ scale: 1, color: '#22c55e' }}
                  className="text-lg font-black tabular-nums"
                >
                  {activeNow}
                </motion.span>
              </div>

              {/* Unique Visitors */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                    <FaUsers className="text-xs text-secondary" />
                  </div>
                  <span className="text-xs text-gray-400 font-medium">Total Visitors</span>
                </div>
                <motion.span
                  key={displayCount}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-sm font-bold text-secondary tabular-nums"
                >
                  {displayCount != null ? displayCount.toLocaleString() : '—'}
                </motion.span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              <p className="text-[10px] text-gray-500 font-medium">
                Updating every 30s
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
