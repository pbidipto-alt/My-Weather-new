import { motion } from 'motion/react';

export default function WeatherDetails({ icon, label, value, subtitle }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
    >
      <div className="flex justify-center mb-2 text-white/80">
        {icon}
      </div>
      <p className="text-sm text-white/70 mb-1">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
      {subtitle && (
        <p className="text-xs text-white/60 mt-1">{subtitle}</p>
      )}
    </motion.div>
  );
}