import { motion } from 'motion/react';
import { Sun, Cloud, CloudRain, CloudSnow } from 'lucide-react';

export default function ForecastCard({ day, condition, high, low, units, precipitation = 0 }) {
  const getWeatherIcon = (condition) => {
    const conditionLower = condition?.toLowerCase() || '';
    
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return <CloudRain className="w-6 h-6 text-blue-400" />;
    }
    if (conditionLower.includes('snow')) {
      return <CloudSnow className="w-6 h-6 text-blue-200" />;
    }
    if (conditionLower.includes('cloud')) {
      return <Cloud className="w-6 h-6 text-gray-400" />;
    }
    
    return <Sun className="w-6 h-6 text-yellow-400" />;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between transition-colors"
    >
      <div className="flex items-center space-x-4 flex-1">
        <p className="text-white/90 font-medium w-12">{day}</p>
        <div className="flex items-center space-x-2">
          {getWeatherIcon(condition)}
          <span className="text-white/80 text-sm hidden sm:inline">{condition}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {precipitation > 0 && (
          <div className="flex items-center space-x-1 text-blue-300">
            <CloudRain className="w-4 h-4" />
            <span className="text-sm">{precipitation}%</span>
          </div>
        )}
        
        <div className="flex items-center space-x-2 text-right">
          <span className="text-white font-semibold">
            {high}°
          </span>
          <span className="text-white/60">
            {low}°
          </span>
        </div>
      </div>
    </motion.div>
  );
}