
import { motion, AnimatePresence } from "motion/react";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import {
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  Sun,
} from "lucide-react";

const chartMetrics = [
  { id: "temperature", label: "Temperature", icon: Thermometer, color: "amber" },
  { id: "humidity", label: "Humidity", icon: Droplets, color: "cyan" },
  { id: "wind", label: "Wind", icon: Wind, color: "emerald" },
  { id: "precipitation", label: "Precipitation", icon: CloudRain, color: "purple" },
  { id: "uvIndex", label: "UV Index", icon: Sun, color: "pink" },
];

const chartConfigs = {
    temperature: { name: "Temperature", stroke: "#F59E0B", fill: "#F59E0B", gradient: ["#F59E0B", "#FBBF24"], secondaryStroke: "#EF4444", tertiaryStroke: "#3B82F6" },
    humidity: { name: "Humidity", stroke: "#06B6D4", fill: "#06B6D4", gradient: ["#06B6D4", "#67E8F9"] },
    wind: { name: "Wind Speed", stroke: "#10B981", fill: "#10B981", gradient: ["#10B981", "#6EE7B7"] },
    precipitation: { name: "Precipitation", stroke: "#8B5CF6", fill: "#8B5CF6", gradient: ["#8B5CF6", "#C4B5FD"] },
    uvIndex: { name: "UV Index", stroke: "#EC4899", fill: "#EC4899", gradient: ["#EC4899", "#F9A8D4"] },
};

const getChartDataKeys = (forecastPeriod, activeChart) => {
    const keys = { dataKey: activeChart };
    if (activeChart === "temperature") {
        keys.dataKey = forecastPeriod === 'hourly' ? 'temperature' : 'temperature';
        keys.secondaryKey = forecastPeriod === 'daily' ? 'tempMax' : 'feelsLike';
        keys.secondaryName = forecastPeriod === 'daily' ? 'High' : 'Feels Like';
        keys.tertiaryKey = forecastPeriod === 'daily' ? 'tempMin' : null;
        keys.tertiaryName = 'Low';
    } else if (activeChart === "wind") {
        keys.dataKey = "windSpeed";
    } else if (activeChart === "precipitation") {
        keys.dataKey = "precipProb";
    } else if (activeChart === "uvIndex") {
        keys.dataKey = "uvIndex";
    }
    return keys;
}

export function ForecastChart({
  activeChart,
  setActiveChart,
  forecastPeriod,
  hourlyData,
  dailyData,
}) {
  const chartData = forecastPeriod === "hourly" ? hourlyData : dailyData;
  const xKey = forecastPeriod === "hourly" ? "time" : "day";
  const config = chartConfigs[activeChart];
  const {dataKey, secondaryKey, secondaryName, tertiaryKey, tertiaryName} = getChartDataKeys(forecastPeriod, activeChart);

  return (
    <>
      <div className="flex flex-wrap items-center space-x-2 mb-6">
        {chartMetrics.map((chart) => (
          <motion.button
            key={chart.id}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveChart(chart.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
              activeChart === chart.id
                ? `bg-${chart.color}-100 border-2 border-${chart.color}-500 text-${chart.color}-700 shadow-lg`
                : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-2 border-transparent"
            }`}
          >
            <chart.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{chart.label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeChart}-${forecastPeriod}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id={`gradient-${activeChart}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={config.gradient[0]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={config.gradient[1]} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" strokeOpacity={0.3} />
              <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748B", fontWeight: 600 }} interval="preserveStartEnd" />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748B", fontWeight: 600 }} />
              <Tooltip content={<CustomTooltip activeChart={activeChart} />} />
              <Area type="monotone" dataKey={dataKey} stroke={config.stroke} strokeWidth={3} fill={`url(#gradient-${activeChart})`} dot={{ fill: config.stroke, strokeWidth: 2, r: 5 }} activeDot={{ r: 8, stroke: config.stroke, strokeWidth: 3, fill: "#fff" }} name={config.name} />
              {secondaryKey && (
                <Line type="monotone" dataKey={secondaryKey} stroke={config.secondaryStroke} strokeWidth={2} strokeDasharray="5 5" dot={{ fill: config.secondaryStroke, r: 4 }} name={secondaryName} />
              )}
              {tertiaryKey && (
                <Line type="monotone" dataKey={tertiaryKey} stroke={config.tertiaryStroke} strokeWidth={2} strokeDasharray="5 5" dot={{ fill: config.tertiaryStroke, r: 4 }} name={tertiaryName} />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
