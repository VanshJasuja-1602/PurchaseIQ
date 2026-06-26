import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavClick, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Prediction', id: 'prediction' },
    { label: 'Insights', id: 'insights' },
    { label: 'Model', id: 'model' },
    { label: 'About', id: 'about' },
  ];

  const handleLinkClick = (id: string) => {
    onNavClick(id);
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={`transition-all duration-300 mx-auto max-w-5xl ${
              scrolled
                ? 'glass-panel-heavy py-2.5 px-6 shadow-premium rounded-full'
                : 'glass-panel py-3.5 px-8 rounded-2xl md:rounded-full'
            } flex items-center justify-between`}
          >
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleLinkClick('home')}
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md">
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <motion.div
                  className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 rounded-full p-0.5 shadow-sm"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-3 h-3" />
                </motion.div>
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Purchase<span className="text-slate-800 font-medium">IQ</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className="relative px-3 py-1.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors duration-200"
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <button
                onClick={() => handleLinkClick('prediction')}
                className="relative group overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-premium hover:shadow-glow-indigo transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Try Prediction
                  <Sparkles className="w-4 h-4 animate-sparkle" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-slate-100/50 text-slate-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mx-4 mt-2 z-50 md:hidden"
            >
              <div className="glass-panel-heavy p-6 rounded-3xl shadow-xl flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleLinkClick(link.id)}
                      className={`text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-50/80 to-purple-50/80 text-indigo-600 border-l-4 border-indigo-500'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
                <button
                  onClick={() => handleLinkClick('prediction')}
                  className="w-full text-center py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 mt-2"
                >
                  Try Prediction
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
