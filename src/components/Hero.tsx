import { useEffect, useRef } from 'react';
import { motion, animate, useInView, useSpring, useMotionValue } from 'framer-motion';
import { Sparkles, Brain, ArrowRight, Play, ShoppingCart, TrendingUp, DollarSign, Users } from 'lucide-react';

interface HeroProps {
  onCtaclick: (sectionId: string) => void;
}

interface CounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}

function AnimatedCounter({ value, duration = 1.5, suffix = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const node = ref.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = Math.round(value) + suffix;
      },
    });

    return () => controls.stop();
  }, [value, duration, suffix, isInView]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Hero({ onCtaclick }: HeroProps) {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-xs tracking-wider uppercase mb-6 shadow-sm"
            >
              <Brain className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
              Machine Learning Powered
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight"
            >
              Predict Customer Purchases{' '}
              <span className="block mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-gradient-x bg-[size:200%_auto]">
                Before They Happen
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-slate-600 font-medium max-w-xl leading-relaxed"
            >
              PurchaseIQ uses machine learning to analyze visitor behavior and estimate whether a customer is likely to complete a purchase.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => onCtaclick('prediction')}
                className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-base px-8 py-4 rounded-full shadow-premium hover:shadow-glow-indigo transition-all duration-300 hover:scale-105"
              >
                Start Prediction
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full -z-10" />
              </button>

              <button
                onClick={() => onCtaclick('insights')}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-base px-8 py-4 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                <Play className="w-4 h-4 fill-current text-slate-600" />
                View Model Insights
              </button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 border-t border-slate-200/60 w-full"
            >
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-extrabold text-indigo-600 tracking-tight">
                  <AnimatedCounter value={71} suffix="%" />
                </span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Best F1 Score</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-extrabold text-purple-600 tracking-tight">
                  <AnimatedCounter value={93} suffix="%" />
                </span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">ROC AUC Accuracy</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold text-slate-800 tracking-tight mt-1 md:mt-2">
                  Databricks
                </span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Real-time API</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold text-slate-800 tracking-tight mt-1 md:mt-2">
                  Classification
                </span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">ML Task</span>
              </div>
            </motion.div>
          </div>

          {/* Right Visual Illustration Column */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-[26rem] md:h-[32rem]">
            {/* Glowing background halo */}
            <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-300/30 to-pink-300/20 blur-[50px]" />

            {/* Main Center Sphere */}
            <motion.div
              className="relative w-44 h-44 rounded-full bg-white glass-panel flex items-center justify-center shadow-premium border border-white/80 z-10"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Outer spinning ring */}
              <div className="absolute inset-2 rounded-full border border-dashed border-indigo-300 animate-[spin_40s_linear_infinite]" />
              
              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-550 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg text-white">
                <ShoppingCart className="w-12 h-12" />
              </div>

              {/* Sparkles */}
              <motion.div
                className="absolute top-4 right-4 text-amber-400"
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
            </motion.div>

            {/* Floating Card 1: Journey Start */}
            <motion.div
              className="absolute top-6 left-2 md:left-6 glass-panel px-4 py-2.5 flex items-center gap-3 shadow-md border border-white/50 z-20 hover:scale-105 transition-transform"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{ y: useSpring(useMotionValue(0), { stiffness: 50, damping: 10 }) }}
            >
              <div className="p-2 rounded-lg bg-indigo-550/10 text-indigo-600">
                <Users className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800">New Visitor</span>
                <span className="text-[10px] text-slate-500">Bounce: 2.0%</span>
              </div>
            </motion.div>

            {/* Floating Card 2: Engagement Spike */}
            <motion.div
              className="absolute bottom-6 right-2 md:right-6 glass-panel px-4 py-2.5 flex items-center gap-3 shadow-md border border-white/50 z-20 hover:scale-105 transition-transform"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 animate-pulse">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800">High Engagement</span>
                <span className="text-[10px] text-slate-500">5 Product Pages</span>
              </div>
            </motion.div>

            {/* Floating Card 3: Purchase Intent */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 right-0 md:right-4 glass-panel px-4 py-2.5 flex items-center gap-3 shadow-md border border-white/50 z-20 hover:scale-105 transition-transform"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div className="p-2 rounded-lg bg-pink-500/10 text-pink-600">
                <DollarSign className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800">Page Value: $18.40</span>
                <span className="text-[10px] text-slate-500">High Purchase Intent</span>
              </div>
            </motion.div>

            {/* Glowing upward trend SVG path */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <defs>
                <linearGradient id="gradient-line" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 50,300 C 120,280 180,180 230,120 C 270,70 320,100 390,50"
                fill="none"
                stroke="url(#gradient-line)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </div>

        </div>
      </div>

      {/* Decorative Wave Divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg
          className="relative block w-full h-[40px] md:h-[60px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}
