
import { motion } from "motion/react";
import { formatTime, getWeatherIcon } from "@/utils/weatherUtils";
import { Droplets, Wind } from "lucide-react";

const HourlyForecastItem = ({ hour, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.03 * index }}
    whileHover={{ y: -8, scale: 1.05 }}
    className="relative flex flex-col items-center min-w-[100px] bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl p-5 hover:shadow-2xl transition-all duration-300 border border-slate-200 group"
  >
    <motion.div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-purple-400/0 rounded-2xl group-hover:from-blue-400/10 group-hover:to-purple-400/10 transition-all duration-300" />
    <span className="relative text-sm font-bold text-slate-600 mb-3">
      {index === 0 ? "Now" : formatTime(hour.datetime)}
    </span>
    <motion.div
      whileHover={{ rotate: [0, -15, 15, 0], scale: 1.2 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {getWeatherIcon(hour.icon, "w-10 h-10")}
    </motion.div>
    <span className="relative text-2xl font-bold text-slate-900 mt-3">
      {Math.round(hour.temp)}°
    </span>
    {hour.precipprob > 0 && (
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="relative flex items-center mt-2 text-blue-500 bg-blue-50 px-2 py-1 rounded-full"
      >
        <Droplets className="w-3 h-3 mr-1" />
        <span className="text-xs font-bold">{Math.round(hour.precipprob)}%</span>
      </motion.div>
    )}
    <div className="relative mt-2 text-xs text-slate-500 flex items-center space-x-1">
      <Wind className="w-3 h-3" />
      <span className="font-medium">{Math.round(hour.windspeed)} km/h</span>
    </div>
  </motion.div>
);

const DailyForecastItem = ({ day, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.05 * index }}
    whileHover={{
      x: 8,
      scale: 1.02,
      backgroundColor: "#F8FAFC",
    }}
    className="flex items-center justify-between p-5 rounded-2xl hover:shadow-xl transition-all duration-300 border-2 border-slate-100 hover:border-blue-200 group"
  >
    <div className="flex items-center space-x-5 flex-1">
      <span className="text-base font-bold text-slate-700 w-24">
        {index === 0
          ? "Today"
          : new Date(day.datetime).toLocaleDateString("en", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
      </span>
      <motion.div
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        {getWeatherIcon(day.icon, "w-10 h-10")}
      </motion.div>
      <span className="text-base text-slate-600 flex-1 font-medium">
        {day.conditions}
      </span>
    </div>
    <div className="flex items-center space-x-6">
      {day.precipprob > 0 && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center text-blue-500 bg-blue-50 px-3 py-2 rounded-xl"
        >
          <Droplets className="w-4 h-4 mr-1" />
          <span className="text-sm font-bold">{Math.round(day.precipprob)}%</span>
        </motion.div>
      )}
      <div className="flex items-center space-x-4 w-32 justify-end">
        <motion.span
          whileHover={{ scale: 1.2 }}
          className="text-lg font-bold text-red-500"
        >
          {Math.round(day.tempmax)}°
        </motion.span>
        <motion.span
          whileHover={{ scale: 1.2 }}
          className="text-lg font-bold text-blue-500"
        >
          {Math.round(day.tempmin)}°
        </motion.span>
      </div>
    </div>
  </motion.div>
);

export function ForecastList({ forecastPeriod, hourlyData, dailyData }) {
  if (forecastPeriod === "hourly") {
    return (
      <div className="overflow-x-auto scrollbar-hide">
        <div
          className="flex space-x-4 pb-4"
          style={{ minWidth: "max-content" }}
        >
          {hourlyData.slice(0, 24).map((hour, index) => (
            <HourlyForecastItem key={index} hour={hour} index={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {dailyData.slice(0, 10).map((day, index) => (
        <DailyForecastItem key={index} day={day} index={index} />
      ))}
    </div>
  );
}
