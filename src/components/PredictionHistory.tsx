import { motion, AnimatePresence } from 'framer-motion';
import { History, Download, Trash2, ArrowUpRight, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import type { RawFormInput, PredictionResult } from '../types/prediction';

interface HistoryItem {
  id: string;
  timestamp: string;
  formValues: RawFormInput;
  result: PredictionResult;
}

interface PredictionHistoryProps {
  history: HistoryItem[];
  onLoadInputs: (formValues: RawFormInput) => void;
  onClearHistory: () => void;
  onDeleteHistoryItem: (id: string) => void;
}

export default function PredictionHistory({
  history,
  onLoadInputs,
  onClearHistory,
  onDeleteHistoryItem,
}: PredictionHistoryProps) {
  if (history.length === 0) return null;

  const downloadCSV = () => {
    // Define columns
    const headers = [
      'Timestamp',
      'Prediction Result',
      'Probability Score',
      'Page Values ($)',
      'Bounce Rates',
      'Exit Rates',
      'Administrative Pages',
      'Administrative Duration (s)',
      'Informational Pages',
      'Informational Duration (s)',
      'Product Related Pages',
      'Product Related Duration (s)',
      'Special Day Proximity',
      'Operating Systems',
      'Browser',
      'Region',
      'Traffic Type',
      'Weekend',
      'Month',
      'Visitor Type'
    ];

    const rows = history.map((item) => [
      item.timestamp,
      item.result.prediction === 1 ? 'High Purchase Chance' : 'Low Purchase Chance',
      item.result.probability !== null ? `${Math.round(item.result.probability * 100)}%` : 'N/A',
      item.formValues.PageValues,
      item.formValues.BounceRates,
      item.formValues.ExitRates,
      item.formValues.Administrative,
      item.formValues.Administrative_Duration,
      item.formValues.Informational,
      item.formValues.Informational_Duration,
      item.formValues.ProductRelated,
      item.formValues.ProductRelated_Duration,
      item.formValues.SpecialDay,
      item.formValues.OperatingSystems,
      item.formValues.Browser,
      item.formValues.Region,
      item.formValues.TrafficType,
      item.formValues.Weekend ? 'Yes' : 'No',
      item.formValues.Month,
      item.formValues.VisitorType,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `purchaseiq_prediction_history_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-12 max-w-6xl mx-auto px-4"
    >
      <div className="glass-panel p-6 md:p-8 border border-slate-200/60 shadow-premium rounded-3xl relative overflow-hidden">
        
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-slate-100 pb-5">
          <div className="text-left">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-600" />
              Session Prediction History
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Review and export predictions made during this browsing session.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={downloadCSV}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all duration-300 hover:scale-105"
            >
              <Download className="w-3.5 h-3.5" />
              Download CSV
            </button>
            
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-750 border border-slate-200 font-bold text-xs rounded-xl shadow-sm transition-all duration-300 hover:scale-105 hover:border-red-200 hover:text-red-650"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white/40 shadow-inner">
          <table className="w-full border-collapse text-left text-xs font-semibold text-slate-650">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200 uppercase tracking-wider text-[10px] font-bold">
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Visitor Info</th>
                <th className="px-6 py-4">Behavior Signals</th>
                <th className="px-6 py-4">ML Prediction</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <AnimatePresence initial={false}>
                {history.map((item) => {
                  const isSuccess = item.result.prediction === 1;
                  const prob = item.result.probability;

                  return (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      {/* Timestamp */}
                      <td className="px-6 py-4 font-mono text-slate-500 whitespace-nowrap">
                        {item.timestamp}
                      </td>

                      {/* Visitor Details */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col text-left gap-0.5">
                          <span className="font-extrabold text-slate-800">
                            {item.formValues.VisitorType.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase">
                            {item.formValues.Month} • OS {item.formValues.OperatingSystems}
                          </span>
                        </div>
                      </td>

                      {/* Behavioral Metrics */}
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-slate-500">
                          <div>
                            Page Val: <span className="font-bold text-slate-750">${item.formValues.PageValues}</span>
                          </div>
                          <div>
                            Bounce: <span className="font-bold text-slate-750">{(item.formValues.BounceRates * 100).toFixed(1)}%</span>
                          </div>
                          <div>
                            Exit: <span className="font-bold text-slate-750">{(item.formValues.ExitRates * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      </td>

                      {/* Prediction Pill */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            isSuccess 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                              : 'bg-amber-50 text-amber-700 border border-amber-100'
                          }`}>
                            {isSuccess ? (
                              <>
                                <CheckCircle2 className="w-3 h-3" />
                                High Chance
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="w-3 h-3" />
                                Low Chance
                              </>
                            )}
                          </span>
                          
                          {prob !== null && (
                            <span className="font-bold text-slate-800">
                              {Math.round(prob * 100)}%
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Action buttons */}
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => onLoadInputs(item.formValues)}
                            title="Load these inputs back into the form"
                            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-wider text-[10px] font-bold"
                          >
                            Load
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                          
                          <button
                            onClick={() => onDeleteHistoryItem(item.id)}
                            title="Delete record"
                            className="text-slate-400 hover:text-red-650 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.section>
  );
}
