
import { motion } from "motion/react";

export const CustomTooltip = ({ active, payload, label, activeChart }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/10"
        >
          <p className="text-sm font-bold text-white mb-2">{label}</p>
          {payload.map((item, index) => (
            <p
              key={index}
              className="text-sm text-slate-200 flex items-center space-x-2"
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="font-semibold">
                {item.name}: {item.value}
                {activeChart === "temperature" && "°C"}
                {activeChart === "humidity" && "%"}
                {activeChart === "wind" && " km/h"}
                {activeChart === "precipitation" && "%"}
                {activeChart === "uvIndex" && " UV"}
              </span>
            </p>
          ))}
        </motion.div>
      );
    }
    return null;
  };
