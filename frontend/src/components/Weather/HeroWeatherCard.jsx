import { motion } from "motion/react";
import {
  MapPin,
  Calendar,
  Clock,
  TrendingUp,
  Activity,
  Wind,
  Droplets,
  Eye,
  Gauge,
  Shield,
} from "lucide-react";
import { getWeatherIcon } from "@/utils/weatherUtils";

const QuickStat = ({ icon: Icon, label, value, color, subtitle }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.08 }}
    className="text-center p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border border-slate-200"
  >
    <Icon className={`w-7 h-7 text-${color}-500 mx-auto mb-2`} />
    <p className="text-sm text-slate-500 font-medium mb-1">{label}</p>
    <p className="text-lg font-bold text-slate-700">{value}</p>
    {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
  </motion.div>
);

export function HeroWeatherCard({ current, today, location, displayName }) {
  if (!current || !today || !location) return null;

  // Calculate AQI based on current conditions (simulated for now)
  const calculateAQI = () => {
    // Simple AQI calculation based on weather conditions and humidity
    const baseAQI = 50;
    const humidityFactor = (current.humidity - 50) * 0.5;
    const visibilityFactor = (10 - current.visibility) * 5;
    const calculatedAQI = Math.max(
      20,
      Math.min(150, baseAQI + humidityFactor + visibilityFactor),
    );
    return Math.round(calculatedAQI);
  };

  const aqi = calculateAQI();
  const getAQILevel = (aqi) => {
    if (aqi <= 50) return { level: "Good", color: "green" };
    if (aqi <= 100) return { level: "Moderate", color: "yellow" };
    if (aqi <= 150)
      return { level: "Unhealthy for Sensitive", color: "orange" };
    return { level: "Unhealthy", color: "red" };
  };
  const aqiInfo = getAQILevel(aqi);

  const quickStats = [
    {
      icon: Wind,
      label: "Wind",
      value: `${Math.round(current.windspeed)} km/h`,
      color: "emerald",
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${current.humidity}%`,
      color: "blue",
    },
    {
      icon: Eye,
      label: "Visibility",
      value: `${current.visibility} km`,
      color: "indigo",
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: `${Math.round(current.pressure)} mb`,
      color: "purple",
    },
    {
      icon: Shield,
      label: "Air Quality",
      value: `${aqi} AQI`,
      color: aqiInfo.color,
      subtitle: aqiInfo.level,
    },
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      
      className="relative overflow-hidden bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 min-h-[600px]"
    >
      {/* Continuous Animated Gradient Background */}
      <motion.div
        animate={{
          backgroundPosition: [
            "0% 0%",
            "100% 100%",
            "0% 100%",
            "100% 0%",
            "0% 0%",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgba(59, 130, 246, 0.08), rgba(147, 51, 234, 0.08), rgba(236, 72, 153, 0.08), rgba(59, 130, 246, 0.08))",
          backgroundSize: "400% 400%",
        }}
        className="absolute inset-0 z-0"
      />

      {/* Secondary Animated Gradient Layer */}
      <motion.div
        animate={{
          backgroundPosition: [
            "100% 100%",
            "0% 0%",
            "100% 0%",
            "0% 100%",
            "100% 100%",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "linear-gradient(-45deg, rgba(99, 102, 241, 0.06), rgba(168, 85, 247, 0.06), rgba(59, 130, 246, 0.06), rgba(99, 102, 241, 0.06))",
          backgroundSize: "400% 400%",
        }}
        className="absolute inset-0 z-0"
      />

      {/* Floating Elements */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
      />

      <motion.div
        animate={{
          rotate: -360,
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-lg"
      />

      {/* Location Header */}
      <div className="relative z-10 px-8 pt-8 pb-6 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-slate-800 flex items-center space-x-3"
            >
              <MapPin className="w-7 h-7 text-blue-500" />
              <span>{location?.name || displayName}</span>
            </motion.h2>
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base text-slate-500 mt-2 ml-10"
            >
              {location?.region}, {location?.country}
            </motion.p>
          </div>
          <div className="text-right">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3 text-slate-600"
            >
              <Calendar className="w-5 h-5" />
              <span className="text-base font-medium">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-end space-x-3 text-slate-500 mt-2"
            >
              <Clock className="w-5 h-5" />
              <span className="text-base">
                {new Date().toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Weather Display */}
      <div className="relative z-10 px-8 py-10">
        <div className="flex items-center justify-between">
          {/* Left Side - Weather Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
            className="relative"
          >
            <div className="relative">
              {getWeatherIcon(current.icon, "w-48 h-48")}
              {/* Animated glow effect */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-blue-300/20 rounded-full blur-3xl -z-10"
              />
            </div>
          </motion.div>

          {/* Center/Right - Temperature and Details */}
          <div className="flex-1 ml-16">
            <div className="space-y-6">
              {/* Temperature Display */}
              <div className="flex items-start space-x-8">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
                  className="relative"
                >
                  <div className="text-[10rem] font-extralight text-slate-800 leading-none tracking-tight">
                    {Math.round(current.temp)}°
                  </div>
                  {/* Animated temperature indicator */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-3"
                  />
                </motion.div>

                {/* Weather Condition & Details */}
                <div className="pt-6 space-y-4">
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-4xl font-semibold text-slate-700">
                      {current.conditions}
                    </h3>
                    <p className="text-xl text-slate-500 mt-2">
                      Feels like {Math.round(current.feelslike)}°
                    </p>
                  </motion.div>

                  {/* High/Low Temps */}
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center space-x-8 pt-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="flex items-center space-x-3 bg-red-50 px-6 py-3 rounded-2xl border border-red-100"
                    >
                      <TrendingUp className="w-6 h-6 text-red-500" />
                      <div>
                        <p className="text-sm text-red-600 font-medium">High</p>
                        <p className="text-2xl font-bold text-red-700">
                          {Math.round(today.tempmax)}°
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="flex items-center space-x-3 bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100"
                    >
                      <Activity className="w-6 h-6 text-blue-500 transform rotate-180" />
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Low</p>
                        <p className="text-2xl font-bold text-blue-700">
                          {Math.round(today.tempmin)}°
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Enhanced Quick Stats */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-5 gap-6 pt-6 mt-6 border-t border-slate-100"
              >
                {quickStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <QuickStat {...stat} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
