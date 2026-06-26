import { motion } from 'framer-motion';
import { DollarSign, TrendingDown, LayoutGrid, Users } from 'lucide-react';

export default function InsightCards() {
  const insights = [
    {
      title: "Page Value Impact",
      tagline: "Strongest Purchase Predictor",
      desc: "Higher average page value indicates the customer visited checkout-proximate steps, which exponentially increases purchase probability.",
      icon: DollarSign,
      color: "from-indigo-500 to-cyan-400 bg-indigo-50 text-indigo-600",
      chart: (
        <svg className="w-full h-16 mt-6" viewBox="0 0 100 40">
          <path d="M0,35 Q30,35 50,20 T100,5" fill="none" stroke="#4F46E5" strokeWidth="2.5" />
          <circle cx="50" cy="20" r="3" fill="#EC4899" />
          <line x1="0" y1="38" x2="100" y2="38" stroke="#E2E8F0" strokeWidth="1" />
          <text x="5" y="15" className="text-[7px] font-bold fill-slate-400">Page Value ↑</text>
        </svg>
      )
    },
    {
      title: "Exit Rate Signals",
      tagline: "Friction & Abandonment indicator",
      desc: "High exit rates on product pages reflect friction points, lost interest, or comparative shopping, prompting a drop in prediction scores.",
      icon: TrendingDown,
      color: "from-red-500 to-orange-400 bg-red-50 text-red-650",
      chart: (
        <svg className="w-full h-16 mt-6" viewBox="0 0 100 40">
          <path d="M0,5 Q30,10 60,30 T100,35" fill="none" stroke="#EF4444" strokeWidth="2.5" />
          <circle cx="60" cy="30" r="3" fill="#EF4444" />
          <line x1="0" y1="38" x2="100" y2="38" stroke="#E2E8F0" strokeWidth="1" />
          <text x="50" y="15" className="text-[7px] font-bold fill-slate-400">Abandonment Rate ↑</text>
        </svg>
      )
    },
    {
      title: "Product Interactions",
      tagline: "Volume of Buyer Activity",
      desc: "Frequent clicks and high product page durations reflect active browsing behavior, showing specific catalog consideration.",
      icon: LayoutGrid,
      color: "from-purple-500 to-pink-400 bg-purple-50 text-purple-650",
      chart: (
        <svg className="w-full h-16 mt-6" viewBox="0 0 100 40">
          <rect x="5" y="25" width="10" height="13" rx="2" fill="#8B5CF6" />
          <rect x="25" y="18" width="10" height="20" rx="2" fill="#8B5CF6" />
          <rect x="45" y="10" width="10" height="28" rx="2" fill="#8B5CF6" />
          <rect x="65" y="15" width="10" height="23" rx="2" fill="#EC4899" />
          <rect x="85" y="5" width="10" height="33" rx="2" fill="#EC4899" />
          <line x1="0" y1="38" x2="100" y2="38" stroke="#E2E8F0" strokeWidth="1" />
        </svg>
      )
    },
    {
      title: "Visitor Type Profile",
      tagline: "Intent Segments & Trust",
      desc: "Returning visitors generally show higher purchase rates and familiar paths, whereas new visitors seek verification signals.",
      icon: Users,
      color: "from-emerald-500 to-teal-400 bg-emerald-50 text-emerald-650",
      chart: (
        <div className="mt-6 space-y-2">
          <div className="space-y-1">
            <div className="flex justify-between text-[9px] font-bold text-slate-500">
              <span>Returning (74% Conv)</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full" style={{ width: '74%' }} />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[9px] font-bold text-slate-500">
              <span>New Visitor (26% Conv)</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-slate-350 h-full rounded-full" style={{ width: '26%' }} />
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="insights" className="py-20 bg-slate-50/50 relative border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 border border-indigo-100 text-indigo-700 uppercase tracking-wider mb-3">
            Core Drivers
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            How PurchaseIQ Thinks
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-600 font-medium"
          >
            Our model doesn't just look at variables. It analyzes behavioral ratios and indicators that predict transaction completions.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-6 border border-slate-200/50 hover:shadow-premium-hover card-hover-lift hover:border-indigo-200/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 rounded-2xl ${insight.color.split(' ')[2]} ${insight.color.split(' ')[3]} shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      Factor #{index + 1}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-lg mb-1">{insight.title}</h3>
                  <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full uppercase tracking-wider mb-4 inline-block">
                    {insight.tagline}
                  </span>
                  
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed mt-2">
                    {insight.desc}
                  </p>
                </div>

                {insight.chart}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
