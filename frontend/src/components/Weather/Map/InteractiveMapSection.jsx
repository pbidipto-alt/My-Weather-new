
import { motion } from "motion/react";
import { Map as MapIcon } from "lucide-react";


export function InteractiveMapSection({ onShowMap }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      
      className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 flex items-center space-x-2">
            <MapIcon className="w-6 h-6 text-blue-500" />
            <span>Interactive Weather Map</span>
          </h3>
          <p className="text-slate-500 mt-1">
            Explore weather patterns with real-time data
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={onShowMap}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <MapIcon className="w-5 h-5" />
          <span className="font-semibold">Open Full Map</span>
        </motion.button>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="h-80 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl overflow-hidden border-2 border-slate-200 cursor-pointer"
        onClick={onShowMap}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapIcon className="w-20 h-20 text-blue-500 mx-auto" />
            </motion.div>
            <p className="text-slate-600 font-semibold text-lg">
              Click to view interactive map
            </p>
            <p className="text-slate-500 text-sm">
              Explore weather layers, radar, and more
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
