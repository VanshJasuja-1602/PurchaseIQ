import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ShoppingCart, Loader2 } from 'lucide-react';

export default function LoadingCard() {
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Analyzing browsing behavior...",
    "Calculating engagement signals...",
    "Encoding visitor profile...",
    "Sending request to Databricks endpoint...",
    "Estimating purchase probability...",
    "Preparing prediction result...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-20 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel-heavy p-8 md:p-12 max-w-lg w-full text-center relative border border-white shadow-2xl rounded-3xl"
      >
        {/* Animated outer glowing ring */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-xl -z-10 animate-pulse-slow" />

        {/* Central Pulsating Icon Container */}
        <div className="flex justify-center items-center gap-6 mb-8 relative">
          {/* Moving Shopping Cart */}
          <motion.div
            animate={{
              x: [-40, 40, -40],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-indigo-600 bg-indigo-550/10 p-3.5 rounded-full shadow-sm"
          >
            <ShoppingCart className="w-6 h-6" />
          </motion.div>

          {/* Spinner connection */}
          <div className="relative flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-purple-650 animate-spin" />
          </div>

          {/* AI Brain Pulse */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-pink-600 bg-pink-500/10 p-3.5 rounded-full shadow-sm"
          >
            <Brain className="w-6 h-6" />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-2">
          PurchaseIQ Engine Thinking
        </h3>
        
        {/* Animated Typewriter-style messages */}
        <div className="h-8 flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-bold text-indigo-600 uppercase tracking-wider"
            >
              {messages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden shadow-inner border border-slate-200/50">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-550 via-purple-550 to-pink-550 rounded-full"
            animate={{
              width: ["0%", "100%"]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <p className="text-xs text-slate-500 font-semibold mt-4">
          Executing math transformations and inference pipeline.
        </p>
      </motion.div>
    </div>
  );
}
