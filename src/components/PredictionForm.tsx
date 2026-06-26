import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MousePointer, Activity, UserRound, Sparkles, ChevronDown, ChevronUp, Info,
  BookOpen, Clock, FileText, BarChart3, ArrowRightLeft 
} from 'lucide-react';
import type { RawFormInput } from '../types/prediction';
import { calculateEngineeredFeatures } from '../utils/featureEngineering';
import { encodeMonth, encodeVisitorType } from '../utils/encoding';

// Zod Schema requiring standard numbers (RHF handles the conversion)
const formSchema = z.object({
  Administrative: z.number().int().min(0, "Must be 0 or more"),
  Administrative_Duration: z.number().min(0, "Must be 0 or more"),
  Informational: z.number().int().min(0, "Must be 0 or more"),
  Informational_Duration: z.number().min(0, "Must be 0 or more"),
  ProductRelated: z.number().int().min(0, "Must be 0 or more"),
  ProductRelated_Duration: z.number().min(0, "Must be 0 or more"),
  BounceRates: z.number().min(0, "Must be 0 or more").max(1, "Cannot exceed 1.00"),
  ExitRates: z.number().min(0, "Must be 0 or more").max(1, "Cannot exceed 1.00"),
  PageValues: z.number().min(0, "Must be 0 or more"),
  SpecialDay: z.number().min(0, "Must be between 0 and 1").max(1, "Must be between 0 and 1"),
  OperatingSystems: z.number().int().min(1, "Must be 1 or more"),
  Browser: z.number().int().min(1, "Must be 1 or more"),
  Region: z.number().int().min(1, "Must be 1 or more"),
  TrafficType: z.number().int().min(1, "Must be 1 or more"),
  Weekend: z.boolean(),
  Month: z.string().min(1, "Required"),
  VisitorType: z.string().min(1, "Required"),
});

interface PredictionFormProps {
  onSubmit: (data: RawFormInput) => void;
  isLoading: boolean;
  initialValues?: RawFormInput;
}

export default function PredictionForm({ onSubmit, isLoading, initialValues }: PredictionFormProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const defaultValues: RawFormInput = initialValues || {
    Administrative: 0,
    Administrative_Duration: 0.0,
    Informational: 0,
    Informational_Duration: 0.0,
    ProductRelated: 5,
    ProductRelated_Duration: 120.5,
    BounceRates: 0.02,
    ExitRates: 0.05,
    PageValues: 18.4,
    SpecialDay: 0.0,
    OperatingSystems: 2,
    Browser: 6,
    Region: 2,
    TrafficType: 1,
    Weekend: false,
    Month: 'Nov',
    VisitorType: 'Returning_Visitor',
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RawFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Watch values for the real-time AI input transformation preview
  const watchedValues = watch();

  // Compute live transformations
  const liveEngineered = calculateEngineeredFeatures(watchedValues);
  const liveMonths = encodeMonth(watchedValues.Month || 'Nov');
  const liveVisitorTypes = encodeVisitorType(watchedValues.VisitorType || 'Returning_Visitor');

  // Keep only the months expected by the model in the dropdown list
  const allowedMonths = ['Aug', 'Dec', 'Feb', 'Jul', 'June', 'Mar', 'May', 'Nov', 'Oct', 'Sep'];
  const visitorTypes = ['New_Visitor', 'Other', 'Returning_Visitor'];

  return (
    <section id="prediction" className="py-20 bg-white/30 backdrop-blur-sm relative border-y border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Run Real-Time Purchase Analysis
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-600 font-medium"
          >
            Enter visitor details below to generate engineered variables and execute model inference on Databricks.
          </motion.p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-5xl mx-auto">
          {/* Three Glass Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Browsing Behavior */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-panel p-6 border border-slate-200/60 hover:shadow-premium-hover hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 shadow-sm">
                    <MousePointer className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900">Browsing Behavior</h3>
                </div>

                <div className="space-y-4">
                  {/* Administrative */}
                  <div>
                    <label htmlFor="Administrative" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Administrative Pages
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                        <BookOpen className="w-4 h-4" />
                      </span>
                      <input
                        id="Administrative"
                        type="number"
                        placeholder="0"
                        {...register('Administrative', { valueAsNumber: true })}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/50 border ${
                          errors.Administrative ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-400'
                        } text-slate-800 placeholder-slate-400 font-semibold focus:outline-none focus:ring-4 transition-all duration-200`}
                      />
                    </div>
                    {errors.Administrative && (
                      <p className="text-xs font-semibold text-red-500 mt-1">{errors.Administrative.message}</p>
                    )}
                  </div>

                  {/* Administrative Duration */}
                  <div>
                    <label htmlFor="Administrative_Duration" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Administrative Duration (s)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                        <Clock className="w-4 h-4" />
                      </span>
                      <input
                        id="Administrative_Duration"
                        type="number"
                        step="any"
                        placeholder="0.0"
                        {...register('Administrative_Duration', { valueAsNumber: true })}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/50 border ${
                          errors.Administrative_Duration ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-400'
                        } text-slate-800 placeholder-slate-400 font-semibold focus:outline-none focus:ring-4 transition-all duration-200`}
                      />
                    </div>
                    {errors.Administrative_Duration && (
                      <p className="text-xs font-semibold text-red-500 mt-1">{errors.Administrative_Duration.message}</p>
                    )}
                  </div>

                  {/* Informational */}
                  <div>
                    <label htmlFor="Informational" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Informational Pages
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                        <FileText className="w-4 h-4" />
                      </span>
                      <input
                        id="Informational"
                        type="number"
                        placeholder="0"
                        {...register('Informational', { valueAsNumber: true })}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/50 border ${
                          errors.Informational ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-400'
                        } text-slate-800 placeholder-slate-400 font-semibold focus:outline-none focus:ring-4 transition-all duration-200`}
                      />
                    </div>
                    {errors.Informational && (
                      <p className="text-xs font-semibold text-red-500 mt-1">{errors.Informational.message}</p>
                    )}
                  </div>

                  {/* Informational Duration */}
                  <div>
                    <label htmlFor="Informational_Duration" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Informational Duration (s)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                        <Clock className="w-4 h-4" />
                      </span>
                      <input
                        id="Informational_Duration"
                        type="number"
                        step="any"
                        placeholder="0.0"
                        {...register('Informational_Duration', { valueAsNumber: true })}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/50 border ${
                          errors.Informational_Duration ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-400'
                        } text-slate-800 placeholder-slate-400 font-semibold focus:outline-none focus:ring-4 transition-all duration-200`}
                      />
                    </div>
                    {errors.Informational_Duration && (
                      <p className="text-xs font-semibold text-red-500 mt-1">{errors.Informational_Duration.message}</p>
                    )}
                  </div>

                  {/* ProductRelated */}
                  <div>
                    <label htmlFor="ProductRelated" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Product Related Pages
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                        <BarChart3 className="w-4 h-4" />
                      </span>
                      <input
                        id="ProductRelated"
                        type="number"
                        placeholder="5"
                        {...register('ProductRelated', { valueAsNumber: true })}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/50 border ${
                          errors.ProductRelated ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-400'
                        } text-slate-800 placeholder-slate-400 font-semibold focus:outline-none focus:ring-4 transition-all duration-200`}
                      />
                    </div>
                    {errors.ProductRelated && (
                      <p className="text-xs font-semibold text-red-500 mt-1">{errors.ProductRelated.message}</p>
                    )}
                  </div>

                  {/* ProductRelated Duration */}
                  <div>
                    <label htmlFor="ProductRelated_Duration" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Product Related Duration (s)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                        <Clock className="w-4 h-4" />
                      </span>
                      <input
                        id="ProductRelated_Duration"
                        type="number"
                        step="any"
                        placeholder="120.5"
                        {...register('ProductRelated_Duration', { valueAsNumber: true })}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/50 border ${
                          errors.ProductRelated_Duration ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-400'
                        } text-slate-800 placeholder-slate-400 font-semibold focus:outline-none focus:ring-4 transition-all duration-200`}
                      />
                    </div>
                    {errors.ProductRelated_Duration && (
                      <p className="text-xs font-semibold text-red-500 mt-1">{errors.ProductRelated_Duration.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Engagement Signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-panel p-6 border border-slate-200/60 hover:shadow-premium-hover hover:border-purple-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-purple-50 text-purple-650 shadow-sm">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900">Engagement Signals</h3>
                </div>

                <div className="space-y-4">
                  {/* Bounce Rates */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="BounceRates" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Bounce Rate
                      </label>
                      <div className="group relative">
                        <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                        <div className="absolute right-0 bottom-full mb-1.5 hidden group-hover:block w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg shadow-md z-30 font-medium leading-tight">
                          Percentage of visitors who bounce out of the page immediately. (0.0 to 1.0)
                        </div>
                      </div>
                    </div>
                    <input
                      id="BounceRates"
                      type="number"
                      step="any"
                      placeholder="0.02"
                      {...register('BounceRates', { valueAsNumber: true })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-50/50 border ${
                        errors.BounceRates ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-purple-100 focus:border-purple-400'
                      } text-slate-800 placeholder-slate-400 font-semibold focus:outline-none focus:ring-4 transition-all duration-200`}
                    />
                    {errors.BounceRates && (
                      <p className="text-xs font-semibold text-red-500 mt-1">{errors.BounceRates.message}</p>
                    )}
                  </div>

                  {/* Exit Rates */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="ExitRates" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Exit Rate
                      </label>
                      <div className="group relative">
                        <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                        <div className="absolute right-0 bottom-full mb-1.5 hidden group-hover:block w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg shadow-md z-30 font-medium leading-tight">
                          Percentage of exits from this page relative to total views. (0.0 to 1.0)
                        </div>
                      </div>
                    </div>
                    <input
                      id="ExitRates"
                      type="number"
                      step="any"
                      placeholder="0.05"
                      {...register('ExitRates', { valueAsNumber: true })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-50/50 border ${
                        errors.ExitRates ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-purple-100 focus:border-purple-400'
                      } text-slate-800 placeholder-slate-400 font-semibold focus:outline-none focus:ring-4 transition-all duration-200`}
                    />
                    {errors.ExitRates && (
                      <p className="text-xs font-semibold text-red-500 mt-1">{errors.ExitRates.message}</p>
                    )}
                  </div>

                  {/* Page Values */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="PageValues" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Page Value ($)
                      </label>
                      <div className="group relative">
                        <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                        <div className="absolute right-0 bottom-full mb-1.5 hidden group-hover:block w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg shadow-md z-30 font-medium leading-tight">
                          Average value of the page. Higher values indicate close proximity to successful transaction pages.
                        </div>
                      </div>
                    </div>
                    <input
                      id="PageValues"
                      type="number"
                      step="any"
                      placeholder="18.4"
                      {...register('PageValues', { valueAsNumber: true })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-50/50 border ${
                        errors.PageValues ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-purple-100 focus:border-purple-400'
                      } text-slate-800 placeholder-slate-400 font-semibold focus:outline-none focus:ring-4 transition-all duration-200`}
                    />
                    {errors.PageValues && (
                      <p className="text-xs font-semibold text-red-500 mt-1">{errors.PageValues.message}</p>
                    )}
                  </div>

                  {/* Special Day */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="SpecialDay" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Special Day Proximity
                      </label>
                      <div className="group relative">
                        <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                        <div className="absolute right-0 bottom-full mb-1.5 hidden group-hover:block w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg shadow-md z-30 font-medium leading-tight">
                          Proximity of the date to a special occasion/holiday (e.g. Mother's Day, Valentine's). (0.0 to 1.0)
                        </div>
                      </div>
                    </div>
                    <input
                      id="SpecialDay"
                      type="number"
                      step="any"
                      placeholder="0.0"
                      {...register('SpecialDay', { valueAsNumber: true })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-50/50 border ${
                        errors.SpecialDay ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-purple-100 focus:border-purple-400'
                      } text-slate-800 placeholder-slate-400 font-semibold focus:outline-none focus:ring-4 transition-all duration-200`}
                    />
                    {errors.SpecialDay && (
                      <p className="text-xs font-semibold text-red-500 mt-1">{errors.SpecialDay.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Visitor Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-panel p-6 border border-slate-200/60 hover:shadow-premium-hover hover:border-pink-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-pink-50 text-pink-600 shadow-sm">
                    <UserRound className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900">Visitor Profile</h3>
                </div>

                <div className="space-y-4">
                  {/* System & Demographics Group */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="OperatingSystems" className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        OS ID
                      </label>
                      <input
                        id="OperatingSystems"
                        type="number"
                        placeholder="2"
                        {...register('OperatingSystems', { valueAsNumber: true })}
                        className={`w-full px-3 py-2 rounded-xl bg-slate-50/50 border ${
                          errors.OperatingSystems ? 'border-red-400' : 'border-slate-200 focus:border-pink-400'
                        } text-slate-800 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all`}
                      />
                    </div>
                    <div>
                      <label htmlFor="Browser" className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Browser ID
                      </label>
                      <input
                        id="Browser"
                        type="number"
                        placeholder="6"
                        {...register('Browser', { valueAsNumber: true })}
                        className={`w-full px-3 py-2 rounded-xl bg-slate-50/50 border ${
                          errors.Browser ? 'border-red-400' : 'border-slate-200 focus:border-pink-400'
                        } text-slate-800 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="Region" className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Region ID
                      </label>
                      <input
                        id="Region"
                        type="number"
                        placeholder="2"
                        {...register('Region', { valueAsNumber: true })}
                        className={`w-full px-3 py-2 rounded-xl bg-slate-50/50 border ${
                          errors.Region ? 'border-red-400' : 'border-slate-200 focus:border-pink-400'
                        } text-slate-800 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all`}
                      />
                    </div>
                    <div>
                      <label htmlFor="TrafficType" className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Traffic ID
                      </label>
                      <input
                        id="TrafficType"
                        type="number"
                        placeholder="1"
                        {...register('TrafficType', { valueAsNumber: true })}
                        className={`w-full px-3 py-2 rounded-xl bg-slate-50/50 border ${
                          errors.TrafficType ? 'border-red-400' : 'border-slate-200 focus:border-pink-400'
                        } text-slate-800 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all`}
                      />
                    </div>
                  </div>

                  {/* Dropdowns */}
                  <div>
                    <label htmlFor="Month" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Month
                    </label>
                    <select
                      id="Month"
                      {...register('Month')}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all duration-200"
                    >
                      {allowedMonths.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="VisitorType" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Visitor Type
                    </label>
                    <select
                      id="VisitorType"
                      {...register('VisitorType')}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all duration-200"
                    >
                      {visitorTypes.map((t) => (
                        <option key={t} value={t}>
                          {t.replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Weekend Switch */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Weekend Visit</span>
                      <span className="text-[10px] text-slate-500">Did the session occur on a weekend?</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setValue('Weekend', !watchedValues.Weekend)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 ${
                        watchedValues.Weekend ? 'bg-pink-500' : 'bg-slate-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          watchedValues.Weekend ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>

          </div>

          {/* Live Feature Engineering Collapsible Section */}
          <div className="glass-panel border border-slate-200/60 overflow-hidden shadow-sm">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/30 hover:bg-slate-50/60 transition-colors duration-200 font-bold text-slate-700 text-sm"
            >
              <span className="flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-indigo-500" />
                View AI Input Transformation (Live Feature Engineering)
              </span>
              {isPreviewOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence>
              {isPreviewOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-slate-200/60 bg-slate-50/20"
                >
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-xs font-semibold text-slate-600">
                    
                    {/* Engineered Features */}
                    <div className="space-y-3 bg-white/40 p-4 rounded-xl border border-slate-100">
                      <h4 className="font-extrabold text-slate-800 text-sm mb-3 text-indigo-700">Calculated Mathematical Features</h4>
                      <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                        <span>Total Pages <span className="text-[10px] text-slate-400 font-medium">(Admin + Info + Product)</span></span>
                        <span className="font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{liveEngineered.TotalPages}</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                        <span>Total Duration (seconds)</span>
                        <span className="font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{liveEngineered.TotalDuration.toFixed(2)}s</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                        <span>Product Focus Ratio <span className="text-[10px] text-slate-400 font-medium">(Product / TotalPages)</span></span>
                        <span className="font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{liveEngineered.ProductFocusRatio.toFixed(4)}</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                        <span>Product Time Ratio <span className="text-[10px] text-slate-400 font-medium">(ProductDuration / ProductRelated)</span></span>
                        <span className="font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{liveEngineered.ProductTimeRatio.toFixed(4)}</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5">
                        <span>Exit / Bounce Difference <span className="text-[10px] text-slate-400 font-medium">(ExitRates - BounceRates)</span></span>
                        <span className="font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{liveEngineered.ExitBounceDiff.toFixed(4)}</span>
                      </div>
                    </div>

                    {/* One-Hot Encoded Vector Preview */}
                    <div className="space-y-3 bg-white/40 p-4 rounded-xl border border-slate-100">
                      <h4 className="font-extrabold text-slate-800 text-sm mb-3 text-purple-750">One-Hot Encoding Vectors (Numeric 0/1)</h4>
                      
                      {/* Month columns */}
                      <div className="mb-4">
                        <span className="text-[11px] text-slate-500 block mb-1.5 font-bold uppercase tracking-wider">Month Vectors (Selected: {watchedValues.Month})</span>
                        <div className="flex flex-wrap gap-1.5">
                          {Object.entries(liveMonths).map(([key, val]) => (
                            <span 
                              key={key} 
                              className={`px-2 py-1 rounded text-[10px] font-bold ${
                                val === 1 
                                  ? 'bg-indigo-600 text-white shadow-sm' 
                                  : 'bg-slate-100 text-slate-400'
                              }`}
                            >
                              {key.replace('Month_', '')}: {val}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* VisitorType columns */}
                      <div>
                        <span className="text-[11px] text-slate-500 block mb-1.5 font-bold uppercase tracking-wider">Visitor Type Vectors (Selected: {watchedValues.VisitorType})</span>
                        <div className="flex flex-col gap-1.5">
                          {Object.entries(liveVisitorTypes).map(([key, val]) => (
                            <div key={key} className="flex items-center justify-between py-1 border-b border-slate-100">
                              <span>{key}</span>
                              <span className={`px-2 py-0.5 rounded font-extrabold ${val === 1 ? 'bg-purple-650 text-white' : 'bg-slate-150 text-slate-400'}`}>
                                {val}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Submission Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="relative group overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-extrabold text-lg px-12 py-4 rounded-full shadow-premium hover:shadow-glow-indigo transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none w-full md:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Analyze Purchase Intent
                <Sparkles className="w-5 h-5 animate-sparkle" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

        </form>

      </div>
    </section>
  );
}
