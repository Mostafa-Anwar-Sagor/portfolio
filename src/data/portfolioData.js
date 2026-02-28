import {
  FaPython, FaHtml5, FaReact, FaDocker, FaAws, FaGitAlt, FaDatabase,
  FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaChartLine, FaShieldAlt,
  FaVideo, FaUsers, FaBrain, FaRobot, FaGamepad, FaCloud,
  FaShoppingCart, FaUtensils,
} from 'react-icons/fa';
import {
  SiDjango, SiNextdotjs, SiTensorflow, SiPytorch, SiJavascript,
  SiPostgresql, SiMysql, SiSqlite, SiMongodb, SiTailwindcss,
  SiTypescript, SiOpencv, SiScikitlearn, SiKeras, SiJupyter, SiVite,
} from 'react-icons/si';

/* ─── PROFILE ──────────────────────────────── */
export const profile = {
  name: 'Mostafa Anwar',
  title: 'Full-Stack AI Developer',
  email: 'mostafa.anwar2181@gmail.com',
  phone: '+60179591714',
  linkedin: 'https://www.linkedin.com/in/mostafa-anwar-3ab665350/',
  github: 'https://github.com/MostafaAnwar',
  location: 'Alor Setar, Kedah, Malaysia',
  resumeUrl: '/portfolio/resume/Mostafa_resume.pdf',
  bio: `Computer Science student majoring in Data Science with a strong foundation in software engineering, artificial intelligence, and full-stack development. Passionate about building scalable, production-ready systems and leveraging machine learning to solve real-world problems. A quick learner who thrives in collaborative environments and is committed to continuous growth, clean code practices, and delivering impactful solutions.`,
  typingTexts: [
    'Full-Stack AI Developer',
    'Machine Learning Engineer',
    'Data Scientist',
    'Deep Learning Specialist',
    'Python Expert',
  ],
  socials: [
    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/mostafa-anwar-3ab665350/', label: 'LinkedIn' },
    { icon: FaGithub, url: 'https://github.com/MostafaAnwar', label: 'GitHub' },
    { icon: FaEnvelope, url: 'mailto:mostafa.anwar2181@gmail.com', label: 'Email' },
    { icon: FaPhone, url: 'tel:+60179591714', label: 'Phone' },
  ],
};

/* ─── NAV LINKS ────────────────────────────── */
export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certs' },
  { id: 'contact', label: 'Contact' },
];

/* ─── SKILLS ───────────────────────────────── */
export const skillCategories = [
  {
    title: 'Languages',
    icon: '💻',
    skills: [
      { name: 'Python', level: 95, icon: FaPython },
      { name: 'JavaScript', level: 85, icon: SiJavascript },
      { name: 'TypeScript', level: 78, icon: SiTypescript },
      { name: 'SQL', level: 88, icon: FaDatabase },
      { name: 'HTML/CSS', level: 88, icon: FaHtml5 },
    ],
  },
  {
    title: 'AI / ML',
    icon: '🧠',
    skills: [
      { name: 'TensorFlow', level: 92, icon: SiTensorflow },
      { name: 'PyTorch', level: 88, icon: SiPytorch },
      { name: 'Keras', level: 90, icon: SiKeras },
      { name: 'scikit-learn', level: 93, icon: SiScikitlearn },
      { name: 'OpenCV', level: 82, icon: SiOpencv },
    ],
  },
  {
    title: 'Frameworks',
    icon: '⚙️',
    skills: [
      { name: 'Django', level: 94, icon: SiDjango },
      { name: 'React', level: 86, icon: FaReact },
      { name: 'Next.js', level: 80, icon: SiNextdotjs },
      { name: 'Tailwind CSS', level: 85, icon: SiTailwindcss },
    ],
  },
  {
    title: 'DevOps & Cloud',
    icon: '☁️',
    skills: [
      { name: 'Docker', level: 82, icon: FaDocker },
      { name: 'AWS', level: 78, icon: FaAws },
      { name: 'Azure', level: 70, icon: FaCloud },
      { name: 'Git/GitHub', level: 92, icon: FaGitAlt },
    ],
  },
  {
    title: 'Databases',
    icon: '🗄️',
    skills: [
      { name: 'PostgreSQL', level: 90, icon: SiPostgresql },
      { name: 'MySQL', level: 85, icon: SiMysql },
      { name: 'SQLite', level: 85, icon: SiSqlite },
      { name: 'MongoDB', level: 75, icon: SiMongodb },
    ],
  },
  {
    title: 'Tools',
    icon: '🛠️',
    skills: [
      { name: 'Jupyter Notebook', level: 90, icon: SiJupyter },
      { name: 'Power BI', level: 75, icon: FaChartLine },
      { name: 'GitHub Copilot', level: 92, icon: FaRobot },
      { name: 'Vite', level: 80, icon: SiVite },
    ],
  },
];

/* ─── PROJECTS ─────────────────────────────── */
export const projects = [
  {
    title: 'IoT Security Monitoring & Threat Detection',
    subtitle: 'Enterprise Security Platform for ALTEL',
    description:
      'Enterprise IoT security platform with ML-based threat prediction, anomaly detection, and automated vulnerability scanning using Nmap and OpenVAS. Real-time monitoring dashboard with multi-channel alerting and automated incident response with device quarantine.',
    techs: ['Python', 'Django', 'React', 'TypeScript', 'ML', 'Redis', 'Celery', 'Docker', 'PostgreSQL'],
    icon: FaShieldAlt,
    color: '#6C63FF',
    gradient: 'from-[#6C63FF] to-[#4F46E5]',
    github: 'https://github.com/MostafaAnwar',
    live: null,
    highlights: [
      'ML-based threat prediction with real-time alerting',
      'Automated vulnerability scanning using Nmap & OpenVAS',
      'Multi-channel incident response with device quarantine',
      'Real-time monitoring dashboard with analytics',
    ],
    category: 'Full-Stack AI',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
  },
  {
    title: 'Deepfake Detection System',
    subtitle: 'CNN & ResNet50 Detection Engine',
    description:
      'Deepfake detection system using CNN and ResNet50 achieving 94% accuracy with real-time video analysis. Django web app with authentication, video upload, detection dashboard, and frame extraction pipeline.',
    techs: ['Python', 'Django', 'TensorFlow', 'Keras', 'OpenCV', 'ResNet50', 'SQLite'],
    icon: FaBrain,
    color: '#00D4FF',
    gradient: 'from-[#00D4FF] to-[#0891B2]',
    github: 'https://github.com/MostafaAnwar',
    live: null,
    highlights: [
      '94% deepfake detection accuracy',
      'Real-time video analysis pipeline',
      'ResNet50 transfer learning architecture',
      'Frame-by-frame extraction & classification',
    ],
    category: 'Deep Learning',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
  },
  {
    title: 'Playground Booking & Management',
    subtitle: 'Start-up Project',
    description:
      'Full-stack booking platform with real-time availability, dynamic slot scheduling, payment processing, owner dashboards with analytics, and location-based search with automated notifications.',
    techs: ['Django', 'React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Redis', 'REST APIs'],
    icon: FaGamepad,
    color: '#FF6584',
    gradient: 'from-[#FF6584] to-[#EC4899]',
    github: 'https://github.com/MostafaAnwar',
    live: null,
    highlights: [
      'Real-time availability tracking',
      'Integrated payment processing system',
      'Owner analytics dashboard with reports',
      'Location-based search with map integration',
    ],
    category: 'Full-Stack',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
  },
  {
    title: 'AI Algorithmic Trading Platform',
    subtitle: 'RL Agents & Deep Learning Models',
    description:
      'Trading platform with RL agents (PPO, DQN, A3C) and LSTM/Transformer models achieving 95%+ backtesting accuracy. Real-time market data pipeline with risk management, portfolio optimization, and paper trading.',
    techs: ['Python', 'Django', 'TensorFlow', 'PyTorch', 'Ray RLlib', 'PostgreSQL', 'Alpha Vantage'],
    icon: FaChartLine,
    color: '#FFD93D',
    gradient: 'from-[#FFD93D] to-[#F59E0B]',
    github: 'https://github.com/MostafaAnwar',
    live: null,
    highlights: [
      '95%+ backtesting accuracy',
      'RL agents: PPO, DQN, A3C implementations',
      'LSTM & Transformer prediction models',
      'Real-time paper trading system',
    ],
    category: 'AI / ML',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
  },
  {
    title: 'Video Streaming Platform',
    subtitle: 'Netflix-Style Adaptive Streaming',
    description:
      'Netflix-style platform with adaptive streaming (360p–4K), CDN integration, and AI recommendation engine. Video transcoding with FFmpeg, real-time search via Elasticsearch, and WebSocket live streaming.',
    techs: ['Python', 'Django', 'React', 'TensorFlow', 'FFmpeg', 'PostgreSQL', 'Redis', 'Elasticsearch', 'AWS S3'],
    icon: FaVideo,
    color: '#E50914',
    gradient: 'from-[#E50914] to-[#DC2626]',
    github: 'https://github.com/MostafaAnwar',
    live: null,
    highlights: [
      'Adaptive streaming from 360p to 4K',
      'AI-powered recommendation engine',
      'FFmpeg video transcoding pipeline',
      'WebSocket-based live streaming',
    ],
    category: 'Full-Stack AI',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop',
  },
  {
    title: 'Enterprise CRM & Project Management SaaS',
    subtitle: 'Multi-Tenant ML Platform',
    description:
      'Multi-tenant CRM with AI lead scoring (87% accuracy), sales forecasting, and agile project management. Churn prediction (84% accuracy), sentiment analysis, and automated task assignment using ML models.',
    techs: ['Python', 'Django', 'PostgreSQL', 'TensorFlow', 'XGBoost', 'Celery', 'Redis', 'Docker'],
    icon: FaUsers,
    color: '#10B981',
    gradient: 'from-[#10B981] to-[#059669]',
    github: 'https://github.com/MostafaAnwar',
    live: null,
    highlights: [
      '87% AI lead scoring accuracy',
      '84% churn prediction accuracy',
      'NLP-based sentiment analysis',
      'Multi-tenant SaaS architecture',
    ],
    category: 'ML Application',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
  },
  {
    title: 'NexMart — AI E-Commerce Platform',
    subtitle: '7+ AI Features · Multi-Seller Marketplace',
    description:
      'Full-stack AI-powered e-commerce marketplace with NexBot shopping assistant, AI image search (GPT-4 Vision), smart price prediction, review sentiment analysis, personalized recommendations, Stripe checkout, real-time buyer–seller chat, flash sales, and voucher system.',
    techs: ['React', 'TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Redis', 'OpenAI GPT-4o', 'Stripe', 'Socket.io', 'Docker'],
    icon: FaShoppingCart,
    color: '#8B5CF6',
    gradient: 'from-[#8B5CF6] to-[#7C3AED]',
    github: 'https://github.com/Mostafa-Anwar-Sagor/ecommerce-website-Nexmart',
    live: null,
    highlights: [
      '7 AI modules: chatbot, image search, price prediction, sentiment analysis, recommendations, description generator, smart search',
      'Multi-seller marketplace with buyer, seller & admin roles',
      'Stripe payment integration with 3D Secure & webhooks',
      'Real-time chat with Socket.io & typing indicators',
      'Seller analytics dashboard with revenue charts (Recharts)',
      'Flash sales with real-time countdown & voucher/coupon system',
    ],
    category: 'Full-Stack AI',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
  },
  {
    title: 'SmartDine AI — Restaurant Platform',
    subtitle: 'Gemini AI · Smart Ordering & Management',
    description:
      'AI-powered restaurant management and online ordering platform with Google Gemini chatbot, natural-language menu search, personalized food recommendations, real-time order tracking, table reservations with AI suggestions, and a full admin dashboard with revenue analytics.',
    techs: ['React', 'Vite', 'Django', 'DRF', 'Google Gemini 2.0', 'JWT', 'Google OAuth', 'SQLite'],
    icon: FaUtensils,
    color: '#F97316',
    gradient: 'from-[#F97316] to-[#EA580C]',
    github: 'https://github.com/Mostafa-Anwar-Sagor/-SmartDine-AI-restaurant-Management',
    live: null,
    highlights: [
      'AI chatbot powered by Google Gemini 2.0 Flash with menu context',
      'Natural-language smart search — "spicy seafood under $30" parsed to structured filters',
      'Personalized recommendations using hybrid scoring (popularity, dietary, time-of-day)',
      'Real-time order tracking with 8-step status progression',
      'Admin dashboard with 5 tabs: overview, orders, menu CRUD, reservations, revenue charts',
      'Review sentiment analysis with automatic scoring (-1.0 to 1.0)',
    ],
    category: 'Full-Stack AI',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
  },
];

/* ─── EXPERIENCE ───────────────────────────── */
export const experience = [
  {
    role: 'Junior Data Scientist Intern',
    company: 'Phitron Academy',
    period: 'Jan 2024 – Apr 2024',
    location: 'Remote',
    bullets: [
      'Applied predictive modeling and machine learning for data analysis and forecasting.',
      'Built data pipelines, integrated ML models into web applications, and deployed using Django and AWS.',
    ],
    techs: ['Python', 'SQL', 'Pandas', 'NumPy', 'scikit-learn', 'TensorFlow', 'Django', 'AWS'],
  },
];

/* ─── EDUCATION ────────────────────────────── */
export const education = [
  {
    degree: 'Bachelor of Computer Science (Honours)',
    major: 'Major in Data Science',
    institution: 'Albukhary International University',
    location: 'Alor Setar, Kedah',
    period: 'Expected Graduation: December 2026',
    cgpa: '3.40',
    coursework: [
      'Artificial Intelligence', 'Machine Learning', 'Deep Learning',
      'Database Management System', 'Software Engineering',
      'Statistical Programming', 'Cloud Computing', 'IoT',
      'Data Mining & Analytics', 'NLP', 'Information Visualization',
      'Parallel & Distributed Databases',
    ],
  },
];

/* ─── CERTIFICATIONS ───────────────────────── */
export const certifications = [
  {
    title: 'Fundamentals of Computer Science & Data Science',
    issuer: 'Phitron Academy',
    date: 'August 5, 2024',
  },
  {
    title: 'Google Cloud Computing Foundations',
    issuer: 'Google Cloud Skill Boost',
    date: 'October 1, 2025',
  },
];

/* ─── RESEARCH ─────────────────────────────── */
export const research = [
  {
    title: 'Load Trust AI',
    role: 'Research Assistant',
    description: 'Developed AI models for improving system trustworthiness.',
    status: 'Manuscript in preparation',
  },
  {
    title: 'Violation Detection Using NLP and Deep Learning',
    role: 'Researcher',
    description: 'Real-time violation detection system using NLP and deep learning.',
    status: 'Ongoing',
  },
  {
    title: 'MediAI: AI Agent for Medical Diagnosis',
    role: 'Researcher',
    description: 'Automated diagnosis and treatment planning system.',
    status: 'Ongoing',
  },
];

/* ─── STATS ────────────────────────────────── */
export const stats = [
  { label: 'Projects Built', value: '6+' },
  { label: 'AI Models Trained', value: '15+' },
  { label: 'Technologies', value: '30+' },
  { label: 'Research Papers', value: '3' },
];
