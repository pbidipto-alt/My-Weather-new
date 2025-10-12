
import { motion } from "motion/react";
import { MapPin, Search, Map as MapIcon } from "lucide-react";

export function TopBar({ location, displayName, onSearchClick, onMapClick }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/10 backdrop-blur-xl border-b border-white/20 text-white px-6 py-4 sticky top-0 z-40"
    >
      <div className="flex items-center justify-between">
        <motion.div
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <MapPin className="w-5 h-5 text-blue-300" />
          </motion.div>
          <div>
            <h1 className="text-lg font-semibold">{location?.name || displayName}</h1>
            <p className="text-xs text-white/70">
              {location?.region}, {location?.country}
            </p>
          </div>
        </motion.div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={onMapClick}
            className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
          >
            <MapIcon className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={onSearchClick}
            className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
          >
            <Search className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
