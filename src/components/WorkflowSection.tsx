import React from 'react';
import { motion } from 'framer-motion';
import { UserRound, Sliders, Shuffle, CloudLightning, Cpu, CheckSquare, ArrowRight, ArrowDown } from 'lucide-react';

export default function WorkflowSection() {
  const steps = [
    {
      step: "01",
      title: "User Input",
      desc: "Behavior, signals, and demographics are gathered from the UI form.",
      icon: UserRound,
      color: "text-indigo-650 bg-indigo-50 border-indigo-100",
    },
    {
      step: "02",
      title: "Feature Engineering",
      desc: "Code aggregates pages, calculates product focus ratios, and rates.",
      icon: Sliders,
      color: "text-cyan-650 bg-cyan-50 border-cyan-100",
    },
    {
      step: "03",
      title: "One-Hot Encoding",
      desc: "Categorical inputs are transformed into numeric 0/1 vectors.",
      icon: Shuffle,
      color: "text-purple-650 bg-purple-50 border-purple-100",
    },
    {
      step: "04",
      title: "Databricks Serving",
      desc: "Payload is securely dispatched to the model serving endpoint.",
      icon: CloudLightning,
      color: "text-pink-650 bg-pink-50 border-pink-100",
    },
    {
      step: "05",
      title: "ML Prediction",
      desc: "The model runs inference and returns a purchase decision score.",
      icon: Cpu,
      color: "text-amber-650 bg-amber-50 border-amber-100",
    },
    {
      step: "06",
      title: "Interactive UI",
      desc: "Results trigger custom suggestions and metrics view.",
      icon: CheckSquare,
      color: "text-emerald-650 bg-emerald-50 border-emerald-100",
    }
  ];

  return (
    <section id="workflow" className="py-20 bg-slate-50/50 relative border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-100 text-emerald-700 uppercase tracking-wider mb-3">
            System Dataflow
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Production ML Workflow
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-600 font-medium"
          >
            Trace the data pipeline from user submission through client transformation and endpoint serving to prediction delivery.
          </motion.p>
        </div>

        {/* Workflow Line Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 items-start max-w-6xl mx-auto relative">
          {steps.map((stepObj, index) => {
            const Icon = stepObj.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <React.Fragment key={stepObj.title}>
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-panel p-6 border border-slate-200/50 hover:shadow-premium-hover card-hover-lift hover:border-indigo-200/60 transition-all duration-300 relative text-left h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Top Section */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-2xl border ${stepObj.color.split(' ')[0]} ${stepObj.color.split(' ')[1]} ${stepObj.color.split(' ')[2]} shadow-sm`}>
                        <Icon className="w-5 h-5 animate-pulse-slow" />
                      </div>
                      <span className="text-xl font-extrabold text-slate-350 tracking-tight">
                        {stepObj.step}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="font-extrabold text-slate-800 text-sm mb-2">{stepObj.title}</h3>
                    <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                      {stepObj.desc}
                    </p>
                  </div>

                  {/* Flow Arrow - Shown only between cards in desktop */}
                  {!isLast && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white border border-slate-200 p-1 rounded-full shadow-sm">
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </motion.div>
                    </div>
                  )}

                  {/* Flow Arrow - Shown between cards in tablet/mobile */}
                  {!isLast && (
                    <div className="lg:hidden flex justify-center py-2 text-slate-400">
                      <motion.div
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Security / Dev Note */}
        <div className="mt-16 text-center max-w-xl mx-auto">
          <p className="text-xs font-bold text-slate-500 bg-amber-50 border border-amber-100 p-4 rounded-2xl shadow-sm text-amber-800 flex items-center justify-center gap-2">
            ⚠️ Security Note: Frontend coordinates feature preparation and displays JSON payload logs. For production deployment, route traffic through a secure API proxy.
          </p>
        </div>

      </div>
    </section>
  );
}
