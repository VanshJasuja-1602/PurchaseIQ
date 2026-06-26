import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ArrowLeft, Terminal, ShieldAlert } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PredictionForm from './components/PredictionForm';
import LoadingCard from './components/LoadingCard';
import ResultCard from './components/ResultCard';
import InsightCards from './components/InsightCards';
import ModelInfo from './components/ModelInfo';
import WorkflowSection from './components/WorkflowSection';
import AboutSection from './components/AboutSection';
import AnimatedBackground from './components/AnimatedBackground';

// Types & Services
import type { RawFormInput, DatabricksPayload, PredictionResult } from './types/prediction';
import { buildDatabricksPayload } from './utils/buildPayload';
import { predictPurchase } from './services/predictionApi';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [payload, setPayload] = useState<DatabricksPayload | null>(null);
  const [formValues, setFormValues] = useState<RawFormInput | null>(null);
  const [error, setError] = useState<{ message: string; details: string } | null>(null);
  const [showErrorDetails, setShowErrorDetails] = useState(false);

  // Smooth scroll helper
  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 90; // offset for sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  // Intersection Observer to update Navbar active indicator on scroll
  useEffect(() => {
    const sections = ['home', 'prediction', 'insights', 'model', 'about'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          root: null,
          rootMargin: '-50% 0px -50% 0px', // trigger when section occupies middle of viewport
          threshold: 0,
        }
      );
      observer.observe(el);
      return { el, observer };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  // Form submission handler
  const handlePredict = async (data: RawFormInput) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    setFormValues(data);

    const generatedPayload = buildDatabricksPayload(data);
    setPayload(generatedPayload);

    try {
      const response = await predictPurchase(generatedPayload);
      setResult(response);
      toast.success('Purchase intent analysis completed successfully!');
      
      // Auto-scroll slightly to the result card for premium UX
      setTimeout(() => {
        const predictionEl = document.getElementById('prediction');
        if (predictionEl) {
          window.scrollTo({
            top: predictionEl.offsetTop - 90,
            behavior: 'smooth'
          });
        }
      }, 300);
    } catch (err: any) {
      console.error('Prediction API execution failed:', err);
      setError({
        message: err.message || 'Prediction service is currently unavailable. Please check your endpoint URL or token.',
        details: err.details || 'Unable to establish a connection with the server.',
      });
      toast.error('Prediction failed. Please inspect logs.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    // Keep formValues intact so form remains populated with previous inputs
  };

  const handleRetry = () => {
    if (formValues) {
      handlePredict(formValues);
    }
  };

  return (
    <>
      <AnimatedBackground />
      <Navbar onNavClick={handleNavClick} activeSection={activeSection} />

      <main className="relative z-10">
        {/* Hero Section */}
        <Hero onCtaclick={handleNavClick} />

        {/* Prediction Dashboard Section */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingCard />
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <ResultCard result={result} payload={payload} onReset={handleReset} />
              </motion.div>
            ) : error ? (
              /* Custom Premium Error Card */
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-16 max-w-3xl mx-auto px-4"
              >
                <div className="glass-panel-heavy p-8 md:p-10 border border-red-200 shadow-glow-orange rounded-3xl text-center">
                  
                  {/* Alert Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 border border-red-100 flex items-center justify-center shadow-inner">
                      <ShieldAlert className="w-8 h-8 animate-bounce" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                    Prediction Service Unavailable
                  </h3>
                  
                  <p className="mt-4 text-base font-semibold text-slate-600 max-w-lg mx-auto">
                    {error.message}
                  </p>

                  <div className="p-4 bg-amber-50 text-amber-900 border border-amber-100 rounded-2xl text-xs font-semibold max-w-md mx-auto mt-6 text-left leading-relaxed">
                    💡 <strong>Quick Fix:</strong> Databricks Model Serving endpoints are secured via JWT tokens. Ensure your local <code>.env</code> file has active credentials and VITE_DATABRICKS_URL is correctly set.
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                    <button
                      onClick={handleRetry}
                      className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm px-6 py-3 rounded-full transition-all duration-300 shadow hover:scale-105"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Retry Prediction
                    </button>
                    
                    <button
                      onClick={handleReset}
                      className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-sm hover:scale-105"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Modify Inputs
                    </button>
                  </div>

                  {/* Collapsible Developer Error logs */}
                  <div className="mt-8 border-t border-slate-100 pt-6 text-left">
                    <button
                      onClick={() => setShowErrorDetails(!showErrorDetails)}
                      className="w-full flex items-center justify-between text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-indigo-500" />
                        Collapsible Developer Diagnostics
                      </span>
                      <span>{showErrorDetails ? "Hide Logs" : "Show Logs"}</span>
                    </button>

                    <AnimatePresence>
                      {showErrorDetails && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-3 bg-slate-900 rounded-xl p-4 text-[10px] text-indigo-200 overflow-x-auto max-h-[220px] font-mono leading-relaxed border border-slate-800 shadow-inner"
                        >
                          <div className="text-red-400 font-extrabold mb-1"># StackTrace / Diagnostics Log</div>
                          <pre className="text-slate-350">{error.details}</pre>
                          {payload && (
                            <>
                              <div className="text-indigo-400 font-extrabold mt-3 mb-1"># Payload Prepared</div>
                              <pre className="text-slate-350">{JSON.stringify(payload, null, 2)}</pre>
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <PredictionForm 
                  onSubmit={handlePredict} 
                  isLoading={isLoading} 
                  initialValues={formValues || undefined} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Workflow Section */}
        <WorkflowSection />

        {/* Insights Section */}
        <InsightCards />

        {/* Model Metrics Info */}
        <ModelInfo />

        {/* About Section & Footer */}
        <AboutSection />
      </main>

      <Toaster position="top-right" richColors />
    </>
  );
}
