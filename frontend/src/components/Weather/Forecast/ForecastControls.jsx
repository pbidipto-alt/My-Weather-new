
import { motion } from "motion/react";
import {
  Clock,
  Calendar,
  BarChart3,
  List,
} from "lucide-react";

export function ForecastControls({
  forecastPeriod,
  setForecastPeriod,
  viewMode,
  setViewMode,
}) {
  return (
    <div className="flex items-center space-x-4">
      {/* Period Toggle */}
      <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setForecastPeriod("hourly")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            forecastPeriod === "hourly"
              ? "bg-blue-500 text-white shadow-lg"
              : "text-slate-600 hover:bg-white"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">Hourly</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setForecastPeriod("daily")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            forecastPeriod === "daily"
              ? "bg-blue-500 text-white shadow-lg"
              : "text-slate-600 hover:bg-white"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">10-Day</span>
        </motion.button>
      </div>

      {/* View Toggle */}
      <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setViewMode("chart")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            viewMode === "chart"
              ? "bg-indigo-500 text-white shadow-lg"
              : "text-slate-600 hover:bg-white"
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span className="text-sm font-medium">Chart</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setViewMode("list")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            viewMode === "list"
              ? "bg-indigo-500 text-white shadow-lg"
              : "text-slate-600 hover:bg-white"
          }`}
        >
          <List className="w-4 h-4" />
          <span className="text-sm font-medium">List</span>
        </motion.button>
      </div>
    </div>
  );
}
