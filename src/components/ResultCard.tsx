import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, AlertTriangle, RefreshCw, FileCode, Copy, Sparkles, Eye, EyeOff 
} from 'lucide-react';
import type { PredictionResult, DatabricksPayload } from '../types/prediction';

interface ResultCardProps {
  result: PredictionResult;
  payload: DatabricksPayload | null;
  onReset: () => void;
}

export default function ResultCard({ result, payload, onReset }: ResultCardProps) {
  const [showPayload, setShowPayload] = useState(false);
  const [copied, setCopied] = useState(false);

  const isSuccess = result.prediction === 1;
  const probabilityPct = result.probability !== null ? Math.round(result.probability * 100) : null;

  // Handle payload copy to clipboard
  const handleCopy = () => {
    const rawData = {
      request_headers: {
        'Content-Type': 'application/json'
      },
      request_payload: payload,
      response_payload: result.rawResponse
    };
    navigator.clipboard.writeText(JSON.stringify(rawData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate self-contained confetti explosion particles
  const confettiParticles = Array.from({ length: 40 }).map((_, i) => {
    const angle = (i / 40) * 360 * (Math.PI / 180);
    const speed = Math.random() * 150 + 100;
    return {
      id: i,
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed - 50,
      scale: Math.random() * 0.7 + 0.3,
      rotate: Math.random() * 360,
      color: ['#10B981', '#4F46E5', '#8B5CF6', '#EC4899', '#06B6D4', '#F59E0B'][Math.floor(Math.random() * 6)],
    };
  });



  // SVG Gauge variables
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = probabilityPct !== null 
    ? circumference - (probabilityPct / 100) * circumference 
    : 0;

  return (
    <div className="py-12 max-w-4xl mx-auto px-4">
      {/* Glow background meshes */}
      <div className={`absolute w-96 h-96 rounded-full -z-10 blur-[80px] opacity-25 top-1/4 left-1/2 -translate-x-1/2 ${
        isSuccess ? 'bg-emerald-300' : 'bg-amber-300'
      }`} />

      {/* Main Result Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', damping: 25 }}
        className={`glass-panel-heavy p-8 md:p-12 relative overflow-hidden border ${
          isSuccess ? 'border-emerald-200/80 shadow-glow-green' : 'border-amber-200/80 shadow-glow-orange'
        } rounded-3xl mb-12 text-center`}
      >
        
        {/* Confetti blast for success */}
        {isSuccess && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-1 h-1">
            {confettiParticles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute w-3 h-3 rounded-sm opacity-90"
                style={{ backgroundColor: p.color }}
                initial={{ x: 0, y: 0, scale: 0, rotate: 0 }}
                animate={{ x: p.x, y: p.y, scale: p.scale, rotate: p.rotate, opacity: 0 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
              />
            ))}
          </div>
        )}

        {/* Top Badges */}
        <div className="flex justify-center mb-6">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            isSuccess ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            ML Output Generated
          </span>
        </div>

        {/* Big Alert/Check Circle */}
        <div className="flex justify-center mb-8 relative">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg relative ${
              isSuccess 
                ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white' 
                : 'bg-gradient-to-tr from-amber-500 to-orange-400 text-white'
            }`}
          >
            {isSuccess ? <Check className="w-12 h-12" /> : <AlertTriangle className="w-12 h-12" />}
          </motion.div>
        </div>

        {/* Primary Prediction Text */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
          {isSuccess ? "High Purchase Chance" : "Low Purchase Chance"}
        </h2>
        
        <p className="mt-4 text-base md:text-lg font-medium text-slate-600 max-w-xl mx-auto">
          {isSuccess 
            ? "This visitor exhibits behaviors heavily correlated with completed transactions."
            : "This visitor is indicating low checkout intent and may bounce without converting."
          }
        </p>

        {/* Probability Gauge Widget */}
        {probabilityPct !== null && (
          <div className="mt-8 flex flex-col items-center">
            <div className="relative flex items-center justify-center w-36 h-36">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background Ring */}
                <circle
                  className="text-slate-100"
                  strokeWidth={stroke}
                  stroke="currentColor"
                  fill="transparent"
                  r={normalizedRadius}
                  cx={radius + stroke}
                  cy={radius + stroke}
                />
                {/* Foreground Progress */}
                <motion.circle
                  className={isSuccess ? "text-emerald-500" : "text-amber-500"}
                  strokeWidth={stroke}
                  strokeDasharray={circumference + ' ' + circumference}
                  style={{ strokeDashoffset }}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r={normalizedRadius}
                  cx={radius + stroke}
                  cy={radius + stroke}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              {/* Inner score label */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-slate-800 tracking-tighter">
                  {probabilityPct}%
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  Probability
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Metadata Details */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <div>
            Task: <span className="font-extrabold text-slate-800">Prediction</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <div>
            Confidence: <span className="font-extrabold text-slate-800">{probabilityPct !== null ? `${probabilityPct}%` : 'Standard'}</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <div>
            Time: <span className="font-extrabold text-slate-800">{result.timestamp}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-base px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <RefreshCw className="w-4 h-4" />
            Try Another Prediction
          </button>

          <button
            onClick={() => setShowPayload(!showPayload)}
            className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-base px-8 py-3.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
          >
            {showPayload ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPayload ? "Hide Payload" : "View Payload"}
          </button>
        </div>

        {/* Collapsible API Developer Panel */}
        <AnimatePresence>
          {showPayload && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 text-left border-t border-slate-200 pt-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-indigo-600" />
                  Databricks Endpoint Interchange Logs
                </h3>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-[11px] font-bold text-slate-600 rounded-lg transition-colors border border-slate-200"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? "Copied!" : "Copy Interchange"}
                </button>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6 text-xs text-indigo-200 overflow-x-auto max-h-[350px] shadow-inner font-mono leading-relaxed space-y-4">
                <div>
                  <span className="text-pink-400 font-bold"># API Request Headers</span>
                  <pre className="text-slate-300 mt-1">
{`POST /api/predict (Proxied to Databricks)
Content-Type: application/json`}
                  </pre>
                </div>
                <div>
                  <span className="text-pink-400 font-bold"># Request Body Payload</span>
                  <pre className="text-slate-350 mt-1">{JSON.stringify(payload, null, 2)}</pre>
                </div>
                <div>
                  <span className="text-emerald-400 font-bold"># Endpoint Response</span>
                  <pre className="text-slate-350 mt-1">{JSON.stringify(result.rawResponse, null, 2)}</pre>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>


    </div>
  );
}
