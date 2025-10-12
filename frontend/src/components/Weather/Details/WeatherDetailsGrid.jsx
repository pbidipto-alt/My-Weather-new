
import { motion } from "motion/react";
import {
  Wind,
  Droplets,
  Sun,
  Eye,
  Gauge,
  Thermometer,
  CloudRain,
  Sunrise,
  Sunset,
  Navigation2,
} from "lucide-react";
import { getWindDirection, formatTime } from "@/utils/weatherUtils";

const DetailCard = ({ item, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.05 * index }}
      whileHover={{ y: -8, scale: 1.05 }}
      className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 overflow-hidden group"
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-slate-600">{item.title}</span>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <item.icon className={`w-6 h-6 text-${item.color}-500`} />
          </motion.div>
        </div>
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="text-4xl font-bold text-slate-900"
            >
              {item.value}
            </motion.span>
            <span className="text-sm text-slate-500 font-medium">{item.unit}</span>
          </div>
          <div className="text-xs text-slate-600 font-medium">{item.extra}</div>
          {item.component}
        </div>
      </div>
    </motion.div>
);

export function WeatherDetailsGrid({ current, today }) {
    if (!current || !today) return null;

    const getUVIndexCategory = (uvindex) => {
        if (uvindex <= 2) return "Low";
        if (uvindex <= 5) return "Moderate";
        if (uvindex <= 7) return "High";
        return "Very High";
    }

    const getVisibilityCategory = (visibility) => {
        if (visibility >= 10) return "Excellent";
        if (visibility >= 5) return "Good";
        return "Poor";
    }

    const details = [
        { title: "Wind", icon: Wind, value: `${Math.round(current.windspeed)}`, unit: "km/h", extra: getWindDirection(current.winddir), color: "emerald", bgGradient: "from-emerald-400 to-teal-500", component: <div className="flex items-center justify-center mt-3"><motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}><Navigation2 className="w-8 h-8 text-emerald-500" style={{ transform: `rotate(${current.winddir}deg)` }} /></motion.div></div> },
        { title: "Humidity", icon: Droplets, value: `${current.humidity}`, unit: "%", extra: `Dew point: ${Math.round(current.dew)}°`, color: "blue", bgGradient: "from-blue-400 to-cyan-500", component: <div className="w-full mt-3"><div className="h-2 bg-slate-200 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${current.humidity}%` }} transition={{ delay: 0.5, duration: 1 }} className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full" /></div></div> },
        { title: "UV Index", icon: Sun, value: `${Math.round(current.uvindex)}`, unit: "", extra: getUVIndexCategory(current.uvindex), color: "amber", bgGradient: "from-amber-400 to-orange-500", component: <div className="w-full mt-3"><div className="h-2 bg-slate-200 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(current.uvindex * 10, 100)}%` }} transition={{ delay: 0.5, duration: 1 }} className={`h-full rounded-full ${current.uvindex <= 2 ? "bg-green-500" : current.uvindex <= 5 ? "bg-yellow-500" : current.uvindex <= 7 ? "bg-orange-500" : current.uvindex <= 10 ? "bg-red-500" : "bg-purple-500"}`} /></div></div> },
        { title: "Visibility", icon: Eye, value: `${current.visibility}`, unit: "km", extra: getVisibilityCategory(current.visibility), color: "indigo", bgGradient: "from-indigo-400 to-purple-500" },
        { title: "Pressure", icon: Gauge, value: `${Math.round(current.pressure)}`, unit: "mb", extra: current.pressure > 1013 ? "↑ High pressure" : "↓ Low pressure", color: "purple", bgGradient: "from-purple-400 to-pink-500", component: <div className="flex items-center justify-center mt-3"><motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-3xl">{current.pressure > 1013 ? "↑" : "↓"}</motion.div></div> },
        { title: "Feels Like", icon: Thermometer, value: `${Math.round(current.feelslike)}`, unit: "°", extra: `${Math.abs(Math.round(current.feelslike) - Math.round(current.temp))}° difference`, color: "red", bgGradient: "from-red-400 to-rose-500", component: <div className="w-full mt-3"><div className="h-2 bg-slate-200 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(current.feelslike * 2, 100)}%` }} transition={{ delay: 0.5, duration: 1 }} className="h-full bg-gradient-to-r from-red-400 to-rose-500 rounded-full" /></div></div> },
        { title: "Precipitation", icon: CloudRain, value: `${Math.round(today.precipprob)}`, unit: "%", extra: current.precip > 0 ? `${current.precip.toFixed(1)} mm today` : "No precipitation", color: "cyan", bgGradient: "from-cyan-400 to-blue-500", component: <div className="w-full mt-3"><div className="h-2 bg-slate-200 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${Math.round(today.precipprob)}%` }} transition={{ delay: 0.5, duration: 1 }} className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" /></div></div> },
        { title: "Sun Times", icon: Sunrise, value: formatTime(today.sunrise), unit: "", extra: `Sunset: ${formatTime(today.sunset)}`, color: "orange", bgGradient: "from-orange-400 to-amber-500", component: <div className="flex items-center justify-around mt-3"><motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}><Sunrise className="w-6 h-6 text-orange-500" /></motion.div><motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3, repeat: Infinity }}><Sunset className="w-6 h-6 text-orange-600" /></motion.div></div> },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {details.map((item, index) => (
                <DetailCard key={item.title} item={item} index={index} />
            ))}
        </div>
    );
}
