import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Thermometer, Wind, Gauge, Sun, Moon, Monitor } from 'lucide-react';

export default function SettingsModal({ onClose, units, setUnits, theme, setTheme }) {
  const [tempUnits, setTempUnits] = useState(units);
  const [tempTheme, setTempTheme] = useState(theme);

  const handleSave = () => {
    setUnits(tempUnits);
    setTheme(tempTheme);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl w-full max-w-md text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Temperature Units */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Thermometer className="w-5 h-5 text-white/70" />
              <span className="font-medium">Temperature</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTempUnits({ ...tempUnits, temperature: 'celsius' })}
                className={`p-3 rounded-lg border transition-colors ${
                  tempUnits.temperature === 'celsius'
                    ? 'bg-blue-500/30 border-blue-400/50'
                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                }`}
              >
                Celsius (°C)
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTempUnits({ ...tempUnits, temperature: 'fahrenheit' })}
                className={`p-3 rounded-lg border transition-colors ${
                  tempUnits.temperature === 'fahrenheit'
                    ? 'bg-blue-500/30 border-blue-400/50'
                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                }`}
              >
                Fahrenheit (°F)
              </motion.button>
            </div>
          </div>

          {/* Wind Speed Units */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Wind className="w-5 h-5 text-white/70" />
              <span className="font-medium">Wind Speed</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTempUnits({ ...tempUnits, wind: 'kmh' })}
                className={`p-3 rounded-lg border transition-colors ${
                  tempUnits.wind === 'kmh'
                    ? 'bg-blue-500/30 border-blue-400/50'
                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                }`}
              >
                km/h
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTempUnits({ ...tempUnits, wind: 'mph' })}
                className={`p-3 rounded-lg border transition-colors ${
                  tempUnits.wind === 'mph'
                    ? 'bg-blue-500/30 border-blue-400/50'
                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                }`}
              >
                mph
              </motion.button>
            </div>
          </div>

          {/* Pressure Units */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Gauge className="w-5 h-5 text-white/70" />
              <span className="font-medium">Pressure</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTempUnits({ ...tempUnits, pressure: 'mb' })}
                className={`p-3 rounded-lg border transition-colors ${
                  tempUnits.pressure === 'mb'
                    ? 'bg-blue-500/30 border-blue-400/50'
                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                }`}
              >
                mb
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTempUnits({ ...tempUnits, pressure: 'inHg' })}
                className={`p-3 rounded-lg border transition-colors ${
                  tempUnits.pressure === 'inHg'
                    ? 'bg-blue-500/30 border-blue-400/50'
                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                }`}
              >
                inHg
              </motion.button>
            </div>
          </div>

          {/* Theme */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Sun className="w-5 h-5 text-white/70" />
              <span className="font-medium">Theme</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTempTheme('light')}
                className={`p-3 rounded-lg border transition-colors flex flex-col items-center space-y-1 ${
                  tempTheme === 'light'
                    ? 'bg-blue-500/30 border-blue-400/50'
                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span className="text-xs">Light</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTempTheme('dark')}
                className={`p-3 rounded-lg border transition-colors flex flex-col items-center space-y-1 ${
                  tempTheme === 'dark'
                    ? 'bg-blue-500/30 border-blue-400/50'
                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span className="text-xs">Dark</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTempTheme('auto')}
                className={`p-3 rounded-lg border transition-colors flex flex-col items-center space-y-1 ${
                  tempTheme === 'auto'
                    ? 'bg-blue-500/30 border-blue-400/50'
                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span className="text-xs">Auto</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/20 flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="flex-1 py-3 px-4 bg-blue-500 border border-blue-400 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}