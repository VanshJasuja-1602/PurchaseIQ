import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white/30 backdrop-blur-sm relative border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 border border-indigo-100 text-indigo-700 uppercase tracking-wider mb-3">
            Company Info
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            About PurchaseIQ
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-600 font-medium"
          >
            We build state-of-the-art predictive customer intelligence modules that seamlessly plug into e-commerce checkout funnels.
          </motion.p>
        </div>

        {/* Contents Grid */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Mission & Product */}
          <h3 className="text-2xl font-extrabold text-slate-850 tracking-tight">Our Mission</h3>
          <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            PurchaseIQ is founded on the principle that customer journeys are rich with purchase markers. Traditional analytics tell you what happened yesterday. PurchaseIQ tells you what is happening <strong>now</strong>, allowing marketing tools to respond while the buyer is still on your site.
          </p>
          <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            By monitoring micro-behaviors (product interaction density, page hover durations, bounce frequencies), our machine learning classifiers forecast cart completion probability with precision.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-slate-200/60 max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Purchase<span className="text-slate-800 font-medium">IQ</span>
            </span>
            <p className="text-xs text-slate-450 mt-1 font-semibold">
              © 2026 PurchaseIQ Inc. | Developed by: <span className="text-indigo-600 font-bold">Vansh Jasuja</span>. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6 text-slate-500">
            <a href="https://github.com/VanshJasuja-1602" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-indigo-650 transition-colors text-xs font-bold uppercase tracking-wider">
              GitHub
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://www.linkedin.com/in/vansh-jasuja-93544a344" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-indigo-650 transition-colors text-xs font-bold uppercase tracking-wider">
              LinkedIn
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://drive.google.com/file/d/1XIWwWP4mjzlS8w1XIl4R6B_qSpNSXYJy/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-indigo-650 transition-colors text-xs font-bold uppercase tracking-wider">
              Report
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://databricks.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-indigo-650 transition-colors text-xs font-bold uppercase tracking-wider">
              Databricks
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
