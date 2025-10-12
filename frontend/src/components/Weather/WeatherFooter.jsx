
import { motion } from "motion/react";

export function WeatherFooter() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="text-center py-8 text-white/60 text-sm space-y-2"
    >
      <p className="font-medium">Powered by Visual Crossing Weather API</p>
      <p className="text-xs opacity-75">
        Last updated: {new Date().toLocaleTimeString()} • Data refreshes
        every 10 minutes
      </p>
    </motion.div>
  );
}
