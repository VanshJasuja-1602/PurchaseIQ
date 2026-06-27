import { motion } from 'framer-motion';
import { Database, Activity, Server, Cpu } from 'lucide-react';

export default function ModelInfo() {
  const modelStats = [
    {
      title: "Training Dataset",
      value: "Online Shoppers",
      sub: "12,330 Sessions",
      desc: "Trained on standard multi-session shopper behavior data covering diverse seasonal traffic distributions.",
      icon: Database,
      color: "text-indigo-650 bg-indigo-50",
    },
    {
      title: "Model Pipeline Task",
      value: "XGBoost Classifier",
      sub: "Binary Classification",
      desc: "Estimates intent class: completed purchase (1) or exit without transaction (0) using an optimized XGBoost algorithm.",
      icon: Activity,
      color: "text-pink-650 bg-pink-50",
    },
    {
      title: "Inference Engine",
      value: "Databricks",
      sub: "Model Serving Endpoint",
      desc: "Hosted on Databricks Model Serving for instant real-time predictions with sub-100ms response times.",
      icon: Server,
      color: "text-purple-650 bg-purple-50",
    },
    {
      title: "Optimized Target",
      value: "F1 Score & ROC",
      sub: "71% F1 / 93% ROC AUC",
      desc: "Tuned specifically to minimize false negatives, ensuring highly precise targeting for customer conversion.",
      icon: Cpu,
      color: "text-cyan-650 bg-cyan-50",
    }
  ];

  return (
    <section id="model" className="py-20 bg-white/30 backdrop-blur-sm relative border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-purple-555/10 border border-purple-100 text-purple-700 uppercase tracking-wider mb-3">
            ML Specification
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Model Performance & Architecture
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-600 font-medium"
          >
            Review the training configurations, dataset specs, and prediction performance indicators of the deployed model.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Left Column: Metric summary circles */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-panel p-6 border border-slate-200/60 flex items-center gap-6"
            >
              <div className="relative flex items-center justify-center w-20 h-20 bg-indigo-50 rounded-full flex-shrink-0 text-indigo-650">
                <span className="text-2xl font-extrabold">71%</span>
                {/* Outer spinning ring decoration */}
                <div className="absolute inset-0 rounded-full border border-dashed border-indigo-300 animate-[spin_20s_linear_infinite]" />
              </div>
              <div className="text-left">
                <h4 className="font-extrabold text-slate-800 text-base">F1 Score Optimization</h4>
                <p className="text-xs font-semibold text-slate-500 mt-1">Balanced harmonic mean of precision and recall. Designed to reliably capture purchase intent sessions.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-panel p-6 border border-slate-200/60 flex items-center gap-6"
            >
              <div className="relative flex items-center justify-center w-20 h-20 bg-purple-50 rounded-full flex-shrink-0 text-purple-650">
                <span className="text-2xl font-extrabold">93%</span>
                <div className="absolute inset-0 rounded-full border border-dashed border-purple-300 animate-[spin_25s_linear_infinite]" />
              </div>
              <div className="text-left">
                <h4 className="font-extrabold text-slate-800 text-base">ROC AUC Accuracy</h4>
                <p className="text-xs font-semibold text-slate-500 mt-1">Excellent class separation capacity, indicating that the model successfully distinguishes buyers from browsers.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-panel p-6 border border-slate-200/60 flex items-center gap-6"
            >
              <div className="relative flex items-center justify-center w-20 h-20 bg-pink-50 rounded-full flex-shrink-0 text-pink-650">
                <span className="text-2xl font-extrabold">90%</span>
                <div className="absolute inset-0 rounded-full border border-dashed border-pink-300 animate-[spin_15s_linear_infinite]" />
              </div>
              <div className="text-left">
                <h4 className="font-extrabold text-slate-800 text-base">Model Accuracy</h4>
                <p className="text-xs font-semibold text-slate-500 mt-1">Overall classification accuracy across test validation data for predicting checkout conversions.</p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Grid cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {modelStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-panel p-6 border border-slate-200/60 hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="text-left">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2.5 rounded-xl ${stat.color} shadow-sm`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        Info
                      </span>
                    </div>

                    <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider mb-1">{stat.title}</h4>
                    <div className="text-lg font-extrabold text-slate-900">{stat.value}</div>
                    <div className="text-xs font-bold text-indigo-600 mb-2">{stat.sub}</div>
                    <p className="text-xs font-semibold text-slate-500 leading-relaxed mt-2">{stat.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
