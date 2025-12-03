import React, { useState, useEffect, } from 'react';

import { 
  FaCube, FaSignInAlt, FaUserPlus, 
  FaFont, FaCloudUploadAlt, FaTextHeight, FaPalette,
  FaIcons, FaImage, FaCode, FaPlug,
  FaRobot, FaSearch, FaCopy, FaSpellCheck,
  FaLanguage, FaShareAlt, FaChartLine, FaDatabase,
  FaShieldAlt, FaBolt,  FaTools,
  FaEnvelope, FaServer, FaPaintRoller, FaMagic,
  FaUsers, FaGlobe,  FaLock,
  FaTwitter, FaFacebook, FaLinkedin, FaGithub,
  FaGoogle, FaWordpress,  FaChartBar
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

type Category = 'mega-tools' | 'mega-service' | 'marketplace';
// type AuthTab = 'login' | 'signup';
type Filter = 'all' | 'gmail' | 'hosting' | 'themes' | 'tools';

interface ToolItem {
  name: string;
  icon: React.ReactNode;
  url: string;
}

interface MarketplaceItem {
  id: string;
  category: Filter;
  title: string;
  icon: React.ReactNode;
  description: string;
  price: string;
  badge: string;
}

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
}

interface StatItem {
  value: string;
  label: string;
  icon: React.ReactNode;
}

// const particleConfig = {
//   particles: {
//     number: {
//       value: 30,
//       density: {
//         enable: true,
//         value_area: 800
//       }
//     },
//     color: {
//       value: "#3b82f6"
//     },
//     shape: {
//       type: "circle",
//       stroke: {
//         width: 0,
//         color: "#000000"
//       },
//       polygon: {
//         nb_sides: 5
//       }
//     },
//     opacity: {
//       value: 0.5,
//       random: false,
//       anim: {
//         enable: false,
//         speed: 1,
//         opacity_min: 0.1,
//         sync: false
//       }
//     },
//     size: {
//       value: 20,
//       random: true,
//       anim: {
//         enable: false,
//         speed: 40,
//         size_min: 0.1,
//         sync: false
//       }
//     },
//     line_linked: {
//       enable: true,
//       distance: 150,
//       color: "#3b82f6",
//       opacity: 0.4,
//       width: 1
//     },
//     move: {
//       enable: true,
//       speed: 2,
//       direction: "none",
//       random: false,
//       straight: false,
//       out_mode: "out",
//       bounce: false,
//       attract: {
//         enable: false,
//         rotateX: 600,
//         rotateY: 1200
//       }
//     }
//   },
//   interactivity: {
//     detect_on: "canvas",
//     events: {
//       onhover: {
//         enable: true,
//         mode: "bubble"
//       },
//       onclick: {
//         enable: true,
//         mode: "push"
//       },
//       resize: true
//     },
//     modes: {
//       bubble: {
//         distance: 100,
//         size: 10,
//         duration: 2,
//         opacity: 0.8,
//         speed: 3
//       },
//       push: {
//         particles_nb: 4
//       }
//     }
//   },
//   retina_detect: true
// };

const Home = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('mega-tools');
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  
  // const authSectionRef = useRef<HTMLDivElement>(null);

  // Categories data with icons
  const categories = [
    { id: 'mega-tools', name: 'Mega Tools', icon: <FaTools className="text-lg" /> },
    { id: 'mega-service', name: 'Mega Service', icon: <FaServer className="text-lg" /> },
    { id: 'marketplace', name: 'Marketplace', icon: <FaGlobe className="text-lg" /> }
  ];

  // Filter options with icons
  const filters = [
    { id: 'all', name: 'All', icon: <FaGlobe className="text-sm" /> },
    { id: 'gmail', name: 'Gmail', icon: <FaEnvelope className="text-sm" /> },
    { id: 'hosting', name: 'Hosting', icon: <FaServer className="text-sm" /> },
    { id: 'themes', name: 'Themes', icon: <FaPaintRoller className="text-sm" /> },
    { id: 'tools', name: 'Tools', icon: <FaTools className="text-sm" /> }
  ];

  // Tools data with react-icons
  const tools: Record<Category, ToolItem[]> = {
    'mega-tools': [
      { name: 'Font Master', icon: <FaFont />, url: 'https://megatools.site/fonts' },
      { name: 'Cloud Uploader', icon: <FaCloudUploadAlt />, url: 'https://megatools.site/upload' },
      { name: 'Text Designer', icon: <FaTextHeight />, url: 'https://megatools.site/text' },
      { name: 'Color Wizard', icon: <FaPalette />, url: 'https://megatools.site/colors' },
      { name: 'Icon Gallery', icon: <FaIcons />, url: 'https://megatools.site/icons' },
      { name: 'Image Pro', icon: <FaImage />, url: 'https://megatools.site/images' },
      { name: 'Code Editor', icon: <FaCode />, url: 'https://megatools.site/code' },
      { name: 'API Studio', icon: <FaPlug />, url: 'https://megatools.site/api' }
    ],
    'mega-service': [
      { name: 'AI Generator', icon: <FaRobot />, url: 'https://megatools.site/ai' },
      { name: 'SEO Master', icon: <FaSearch />, url: 'https://megatools.site/seo' },
      { name: 'Content Guard', icon: <FaCopy />, url: 'https://megatools.site/plagiarism' },
      { name: 'Grammar Pro', icon: <FaSpellCheck />, url: 'https://megatools.site/grammar' },
      { name: 'Translator Pro', icon: <FaLanguage />, url: 'https://megatools.site/translate' },
      { name: 'Social Manager', icon: <FaShareAlt />, url: 'https://megatools.site/social' },
      { name: 'Analytics Pro', icon: <FaChartLine />, url: 'https://megatools.site/analytics' },
      { name: 'Cloud Backup', icon: <FaDatabase />, url: 'https://megatools.site/backup' }
    ],
    'marketplace': []
  };

  // Marketplace items with icons
  const marketplaceItems: MarketplaceItem[] = [
    { 
      id: 'gmail-pro',
      category: 'gmail',
      title: 'Gmail Pro Suite',
      icon: <FaGoogle className="text-cyan-400" />,
      description: 'Premium Gmail accounts with 50GB storage and custom domains.',
      price: '$9.99/month',
      badge: 'Popular'
    },
    { 
      id: 'hosting-premium',
      category: 'hosting',
      title: 'Cloud Hosting',
      icon: <FaServer className="text-cyan-400" />,
      description: 'Premium hosting with 99.9% uptime guarantee.',
      price: '$89.99/year',
      badge: 'Special'
    },
    { 
      id: 'wp-theme-pro',
      category: 'themes',
      title: 'WP Theme Pro',
      icon: <FaWordpress className="text-cyan-400" />,
      description: 'Premium WordPress theme with 50+ templates.',
      price: '$49.99',
      badge: 'New'
    },
    { 
      id: 'seo-suite',
      category: 'tools',
      title: 'SEO Suite Pro',
      icon: <FaChartBar className="text-cyan-400" />,
      description: 'Complete SEO analysis and tracking tool.',
      price: '$29.99',
      badge: 'Hot'
    }
  ];

  // Features with icons
  const features: FeatureItem[] = [
    {
      title: 'Military-Grade Security',
      description: 'End-to-end encryption with biometric authentication.',
      icon: <FaLock className="text-2xl text-white" />,
      badge: 'New'
    },
    {
      title: 'Blazing Fast Performance',
      description: 'Global CDN with edge computing for instant response.',
      icon: <FaBolt className="text-2xl text-white" />,
      badge: 'Popular'
    },
    {
      title: 'Smart Auto-Updates',
      description: 'Automatic updates with AI-driven recommendations.',
      icon: <FaMagic className="text-2xl text-white" />
    }
  ];

  // Stats with icons
  const stats: StatItem[] = [
    { value: '50,000+', label: 'Premium Users', icon: <FaUsers className="text-xl text-white" /> },
    { value: '99.99%', label: 'Uptime', icon: <FaBolt className="text-xl text-white" /> },
    { value: '80+', label: 'Advanced Tools', icon: <FaTools className="text-xl text-white" /> },
    { value: '24/7', label: 'Priority Support', icon: <FaShieldAlt className="text-xl text-white" /> }
  ];

  // Scroll to authentication section
  // const scrollToAuth = () => {
 
  //   authSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  // Animate stats
useEffect(() => {
  const statElements = document.querySelectorAll('.stat-number');
  statElements.forEach((el) => {
    if (!(el instanceof HTMLElement)) return;

    let current = 0;
    const target = parseInt(el.textContent?.replace(/\D/g, '') || '0');
    const increment = target / 50;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        current = target;
      }

      el.textContent =
        Math.floor(current).toLocaleString() +
        (el.textContent?.includes('%') ? '%' : '+');
    }, 20);
  });
}, []);


  return (
    <div className="min-h-screen text-gray-100 relative  bg-[#101828]">
      {/* Particle.js Water Background */}
      <div className="fixed inset-0 z-0">
        {/* <Particles 
          params={particleConfig} 
          className="w-full h-full"
        /> */}
      </div>
      
      {/* Content Container */}
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <FaCube className="text-cyan-400 text-3xl mr-3 animate-pulse" />
            <span className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              MegaTools<span className="text-xs align-top bg-blue-600 text-white px-2 py-1 rounded-full ml-1">PRO</span>
            </span>
          </div>
          
          <div className="flex gap-4">
            <Link to='/sign-in'
            
              className="flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 
                        bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600
                        border border-gray-600 hover:border-cyan-400 hover:text-cyan-400
                        hover:-translate-y-1 hover:shadow-lg"
            >
              <FaSignInAlt className="transition-transform duration-300 group-hover:translate-x-1" />
              <span>Login</span>
            </Link>
            <Link to='/sign-up' 
            
              className="flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 
                        bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700
                        hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/20"
            >
              <FaUserPlus className="transition-transform duration-300 group-hover:translate-x-1" />
              <span>Sing Up</span>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Ultimate Digital Toolkit
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Premium tools and services for professionals. Everything you need in one powerful dashboard.
            </p>
          </section>

          {/* Category Navigation */}
          <nav className="mb-12">
            <div className="flex flex-wrap justify-center gap-4 p-4 rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-gray-700">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as Category)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all duration-400 ${
                    activeCategory === category.id 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30'
                      : 'bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 hover:border-cyan-400'
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
          </nav>

          {/* Tools Grid */}
          <section className="mb-20">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {tools[activeCategory]?.map((tool, index) => (
                <a
                  key={index}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/80 border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10"
                >
                  <div className="w-16 h-16 mb-4 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl group-hover:rotate-6 transition-transform duration-300">
                    {/* {React.cloneElement(tool.icon as React.ReactElement, { className: "text-2xl text-white" })} */}
                  </div>
                  <span className="text-center font-medium">{tool.name}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Marketplace Section */}
          {activeCategory === 'marketplace' && (
            <section className="mb-20">
              <div className="flex flex-wrap justify-center gap-4 mb-8 p-4 rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-gray-700">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id as Filter)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                      activeFilter === filter.id 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg'
                        : 'bg-gray-700/50 hover:bg-gray-600/50'
                    }`}
                  >
                    {filter.icon}
                    {filter.name}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {marketplaceItems
                  .filter(item => activeFilter === 'all' || item.category === activeFilter)
                  .map((item, index) => (
                    <div 
                      key={index}
                      className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/80 border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10"
                    >
                      <div className="flex items-start mb-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl mr-4">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{item.title}</h3>
                          <span className="inline-block px-2 py-1 mt-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-xs font-bold">
                            {item.badge}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-400 mb-4">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-cyan-400">{item.price}</span>
                        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 font-medium text-sm transition-all">
                          Get Now
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Features Section */}
          <section className="mb-20 text-center">
            <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Premium Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/80 border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-3 hover:shadow-xl hover:shadow-cyan-500/10"
                >
                  {feature.badge && (
                    <span className="inline-block px-3 py-1 mb-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-xs font-bold">
                      {feature.badge}
                    </span>
                  )}
                  <div className="w-16 h-16 mb-6 mx-auto flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="mb-20 p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/80 border border-gray-700">
            <h2 className="text-4xl font-extrabold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              By The Numbers
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-xl bg-gray-800/30 hover:bg-gray-700/50 transition-all duration-300"
                >
                  <div className="w-16 h-16 mb-4 mx-auto flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent stat-number">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-cyan-900/30 via-gray-900 to-blue-900/30 border border-cyan-400/20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Ready to Boost Your Productivity?
            </h2>
            <Link to='/sign-up'
    
              className="px-8 py-4 rounded-full font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/30"
            >
              <FaUserPlus className="inline mr-2" />
              Get Premium Access
            </Link>
          </section>

          {/* Authentication Section */}
          {/* <section ref={authSectionRef} className="mb-20 p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/80 border border-gray-700">
            <div className="flex justify-center mb-8">
              <div className="flex bg-gray-800 rounded-full p-1">
                <button
                  onClick={() => setActiveAuthTab('login')}
                  className={`px-8 py-3 rounded-full font-bold transition-colors duration-300 ${
                    activeAuthTab === 'login' 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600' 
                      : 'hover:text-cyan-400'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveAuthTab('signup')}
                  className={`px-8 py-3 rounded-full font-bold transition-colors duration-300 ${
                    activeAuthTab === 'signup' 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600' 
                      : 'hover:text-cyan-400'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>
            
            <div className="bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700">
              {activeAuthTab === 'login' ? (
                <iframe 
                  src="https://megatools.site/login" 
                  className="w-full h-96 border-none"
                  title="Login"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
              ) : (
                <iframe 
                  src="https://megatools.site/signup" 
                  className="w-full h-96 border-none"
                  title="Signup"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
              )}
            </div>
          </section> */}
        </main>

        {/* Footer */}
        <footer className="py-12 px-4 bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
              <div>
                <div className="flex items-center mb-6">
                  <FaCube className="text-cyan-400 text-3xl mr-3" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    MegaTools
                  </span>
                </div>
                <div className="flex gap-4">
                  <a href="https://twitter.com/megatools" className="text-gray-400 hover:text-cyan-400">
                    <FaTwitter className="text-xl" />
                  </a>
                  <a href="https://facebook.com/megatools" className="text-gray-400 hover:text-cyan-400">
                    <FaFacebook className="text-xl" />
                  </a>
                  <a href="https://linkedin.com/company/megatools" className="text-gray-400 hover:text-cyan-400">
                    <FaLinkedin className="text-xl" />
                  </a>
                  <a href="https://github.com/megatools" className="text-gray-400 hover:text-cyan-400">
                    <FaGithub className="text-xl" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-6">Products</h3>
                <ul className="space-y-3">
                  {['All Tools', 'Mega Services', 'Marketplace', 'Pricing', 'New Features'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-6">Company</h3>
                <ul className="space-y-3">
                  {['About Us', 'Careers', 'Blog', 'Press', 'Contact'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-6">Resources</h3>
                <ul className="space-y-3">
                  {['Documentation', 'Tutorials', 'API', 'Community', 'Help Center'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800 text-center text-gray-500">
              <p>&copy; {new Date().getFullYear()} MegaTools.site. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;