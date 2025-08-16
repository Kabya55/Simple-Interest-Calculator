import { useMemo, useState } from "react";
import { motion } from "framer-motion";

// Simple interest calculator (same formula you shared)
function calculateInterest(prAmount, interest, years) {
  const p = Number(prAmount) || 0;
  const r = Number(interest) || 0;
  const t = Number(years) || 0;
  return (p * r * t) / 100;
}

export default function App() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(1);

  const interestAmount = useMemo(
    () => calculateInterest(principal, rate, years),
    [principal, rate, years]
  );
  const totalAmount = useMemo(() => Number(principal) + interestAmount, [principal, interestAmount]);

  const fmt = new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT", maximumFractionDigits: 2 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl"
      >
        <div className="mx-auto text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800">Simple Interest Calculator</h1>
          <p className="text-slate-600 mt-2">Tailwind CSS + JavaScript • Formula: (P × R × T) / 100</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Form */}
          <div className="bg-white rounded-2xl shadow-md p-5 md:p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Principal Amount (P)</label>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 outline-none px-4 py-2.5"
                  placeholder="e.g., 100000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Rate of Interest % (R)</label>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 outline-none px-4 py-2.5"
                  placeholder="e.g., 10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Time in Years (T)</label>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.25"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 outline-none px-4 py-2.5"
                  placeholder="e.g., 1"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => { setPrincipal(100000); setRate(10); setYears(1); }}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white shadow hover:shadow-lg transition-shadow"
                >
                  Reset to Example
                </button>
                <div className="text-sm text-slate-500">All fields auto-calc as you type</div>
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div className="bg-white rounded-2xl shadow-md p-5 md:p-6">
            <h2 className="text-xl font-semibold text-slate-800">Result</h2>
            <div className="mt-4 grid gap-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <span className="text-slate-600">Interest (Simple)</span>
                <span className="font-semibold text-slate-900">{fmt.format(interestAmount)}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <span className="text-slate-600">Total Amount (P + Interest)</span>
                <span className="font-semibold text-slate-900">{fmt.format(totalAmount)}</span>
              </div>
            </div>

            <div className="mt-6 text-sm text-slate-600">
              <p><strong>Note:</strong> This is <em>simple interest</em>, not compound interest. For compound interest, use P × (1 + R/100)<sup>T</sup> − P.</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <button
                type="button"
                onClick={() => { setPrincipal(50000); setRate(7.5); setYears(3); }}
                className="rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50"
              >
                Try: P=50,000 • R=7.5% • T=3y
              </button>
              <button
                type="button"
                onClick={() => { setPrincipal(250000); setRate(12); setYears(2); }}
                className="rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50"
              >
                Try: P=2,50,000 • R=12% • T=2y
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-slate-500">
          Built with Tailwind CSS • JavaScript function: <code>(P × R × T) / 100</code>
        </div>
      </motion.div>
    </div>
  );
}
