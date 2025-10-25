import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import { Droplets } from "lucide-react";

export default function WeatherChart({ weatherData, units }) {
  // Use actual hourly data from Visual Crossing API
  const generateHourlyData = () => {
    if (!weatherData?.days?.[0]?.hours) return [];

    const today = weatherData.days[0];
    const tomorrow = weatherData.days[1];

    // Combine today's remaining hours with tomorrow's hours to get 24 hours
    const allHours = [
      ...(today.hours || []),
      ...(tomorrow?.hours?.slice(0, 12) || []),
    ];

    return allHours.slice(0, 24).map((hour, index) => ({
      time: hour.datetime.split(":")[0],
      temperature: Math.round(hour.temp),
      precipitation: Math.round(hour.precipprob || 0),
      humidity: Math.round(hour.humidity),
      feelslike: Math.round(hour.feelslike),
      windspeed: Math.round(hour.windspeed),
      isNow: index === 0,
    }));
  };

  const hourlyData = generateHourlyData();

  const getYAxisDomain = () => {
    if (!hourlyData.length) return [0, 55];

    const temps = hourlyData.flatMap(item => [
      item.temperature,
      item.feelslike
    ].filter(t => t !== undefined && t !== null));

    const minTemp = Math.min(...temps);

    if (minTemp < 0) {
      return [-45, 10];
    }
    return [0, 55];
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/90 backdrop-blur-sm rounded-xl p-3 border border-white/20">
          <p className="text-white font-medium text-sm mb-1">{label}:00</p>
          <p className="text-blue-300 text-sm">
            {data.temperature}° (Feels {data.feelslike}°)
          </p>
          {data.precipitation > 0 && (
            <p className="text-blue-200 text-sm flex items-center">
              <Droplets className="w-3 h-3 mr-1" />
              {data.precipitation}% chance
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={hourlyData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(255, 255, 255, 0.6)", fontSize: 11 }}
            interval={2}
          />
          <YAxis hide domain={getYAxisDomain()} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="temperature"
            stroke="#60a5fa"
            strokeWidth={2}
            fill="url(#tempGradient)"
            dot={(props) => {
              if (props.payload.isNow) {
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={5}
                    fill="#ffffff"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                );
              }
              return null;
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
