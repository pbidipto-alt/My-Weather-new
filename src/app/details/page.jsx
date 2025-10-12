'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Sun, 
  Moon, 
  Wind, 
  Droplets, 
  Eye, 
  Gauge, 
  Thermometer,
  Sunrise,
  Sunset,
  CloudRain,
  Zap,
  Shield,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area } from 'recharts';

export default function WeatherDetails() {
  const [selectedLocation] = useState({
    name: 'London',
    lat: 51.5074,
    lon: -0.1278
  });

  // Fetch current weather data
  const { data: weatherData, isLoading } = useQuery({
    queryKey: ['weather', selectedLocation?.name],
    queryFn: async () => {
      const response = await fetch(`/api/weather/current?city=${selectedLocation.name}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      return response.json();
    },
    enabled: !!selectedLocation,
  });

  // Generate mock detailed data
  const generateDetailedData = () => {
    const current = weatherData?.current;
    if (!current) return { hourly: [], daily: [], airQuality: null };

    // Mock hourly data for next 48 hours
    const hourly = [];
    for (let i = 0; i < 48; i++) {
      const hour = new Date(Date.now() + i * 60 * 60 * 1000);
      hourly.push({
        time: hour.getHours(),
        date: hour.toLocaleDateString(),
        temperature: current.temp_c + (Math.random() * 8 - 4),
        humidity: current.humidity + (Math.random() * 20 - 10),
        pressure: current.pressure_mb + (Math.random() * 20 - 10),
        windSpeed: current.wind_kph + (Math.random() * 10 - 5),
        precipitation: Math.random() * 100,
        uvIndex: Math.max(0, Math.min(11, 3 + Math.random() * 6)),
        visibility: current.vis_km + (Math.random() * 4 - 2)
      });
    }

    // Mock daily data for next 14 days
    const daily = [];
    for (let i = 0; i < 14; i++) {
      const day = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
      daily.push({
        date: day.toLocaleDateString(),
        dayName: day.toLocaleDateString('en', { weekday: 'short' }),
        high: current.temp_c + (Math.random() * 10 - 5),
        low: current.temp_c - (Math.random() * 10 + 5),
        condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
        precipitation: Math.random() * 100,
        humidity: current.humidity + (Math.random() * 20 - 10),
        windSpeed: current.wind_kph + (Math.random() * 10 - 5)
      });
    }

    // Mock air quality data
    const airQuality = {
      aqi: Math.floor(Math.random() * 150) + 50,
      pm25: Math.floor(Math.random() * 50) + 10,
      pm10: Math.floor(Math.random() * 80) + 20,
      o3: Math.floor(Math.random() * 100) + 50,
      no2: Math.floor(Math.random() * 60) + 20,
      so2: Math.floor(Math.random() * 40) + 10
    };

    return { hourly, daily, airQuality };
  };

  const { hourly, daily, airQuality } = generateDetailedData();
  const current = weatherData?.current;
  const location = weatherData?.location;

  const getAQILevel = (aqi) => {
    if (aqi <= 50) return { level: 'Good', color: 'green', description: 'Air quality is satisfactory' };
    if (aqi <= 100) return { level: 'Moderate', color: 'yellow', description: 'Air quality is acceptable' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: 'orange', description: 'Sensitive people may experience symptoms' };
    if (aqi <= 200) return { level: 'Unhealthy', color: 'red', description: 'Everyone may experience symptoms' };
    return { level: 'Very Unhealthy', color: 'purple', description: 'Health alert for everyone' };
  };

  const aqiInfo = airQuality ? getAQILevel(airQuality.aqi) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white">
      {/* Header */}
      <header className="p-4 flex items-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.history.back()}
          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
        <div>
          <h1 className="text-xl font-semibold">{location?.name}</h1>
          <p className="text-white/70 text-sm">Detailed Weather Information</p>
        </div>
      </header>

      <div className="px-4 pb-8 space-y-6">
        {/* Current Conditions Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Current Conditions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Thermometer className="w-8 h-8 mx-auto mb-2 text-red-400" />
              <p className="text-2xl font-bold">{Math.round(current?.temp_c || 0)}°C</p>
              <p className="text-sm text-white/70">Temperature</p>
            </div>
            <div className="text-center">
              <Droplets className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <p className="text-2xl font-bold">{current?.humidity || 0}%</p>
              <p className="text-sm text-white/70">Humidity</p>
            </div>
            <div className="text-center">
              <Wind className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <p className="text-2xl font-bold">{Math.round(current?.wind_kph || 0)}</p>
              <p className="text-sm text-white/70">km/h</p>
            </div>
            <div className="text-center">
              <Gauge className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <p className="text-2xl font-bold">{Math.round(current?.pressure_mb || 0)}</p>
              <p className="text-sm text-white/70">mb</p>
            </div>
          </div>
        </motion.div>

        {/* 48-Hour Temperature Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold mb-4">48-Hour Temperature Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourly.slice(0, 48)}>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
                  tickFormatter={(value) => `${value}:00`}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: 'white'
                  }}
                  formatter={(value) => [`${Math.round(value)}°C`, 'Temperature']}
                />
                <Area
                  type="monotone"
                  dataKey="temperature"
                  stroke="#60a5fa"
                  fill="url(#temperatureGradient)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Air Quality Index */}
        {airQuality && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Air Quality Index
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/70">AQI</span>
                  <span className={`text-${aqiInfo.color}-400 font-semibold`}>{aqiInfo.level}</span>
                </div>
                <div className="relative">
                  <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${aqiInfo.color}-400 transition-all duration-1000`}
                      style={{ width: `${Math.min(100, (airQuality.aqi / 200) * 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-2xl font-bold mt-2 block">{airQuality.aqi}</span>
                </div>
                <p className="text-sm text-white/70 mt-2">{aqiInfo.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-lg font-semibold">{airQuality.pm25}</p>
                  <p className="text-xs text-white/70">PM2.5</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold">{airQuality.pm10}</p>
                  <p className="text-xs text-white/70">PM10</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold">{airQuality.o3}</p>
                  <p className="text-xs text-white/70">O₃</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold">{airQuality.no2}</p>
                  <p className="text-xs text-white/70">NO₂</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Sun & Moon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Sun & Moon</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <Sunrise className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
              <p className="text-lg font-semibold">6:42 AM</p>
              <p className="text-sm text-white/70">Sunrise</p>
            </div>
            <div className="text-center">
              <Sunset className="w-12 h-12 mx-auto mb-3 text-orange-400" />
              <p className="text-lg font-semibold">7:18 PM</p>
              <p className="text-sm text-white/70">Sunset</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Moon className="w-8 h-8 mx-auto mb-2 text-blue-300" />
            <p className="text-sm text-white/70">Waxing Crescent • 23% Illuminated</p>
          </div>
        </motion.div>

        {/* 14-Day Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold mb-4">14-Day Forecast</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {daily.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="w-12 text-sm font-medium">{day.dayName}</span>
                  <span className="text-sm text-white/70">{day.condition}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-blue-300">
                    <CloudRain className="w-4 h-4" />
                    <span className="text-sm">{Math.round(day.precipitation)}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{Math.round(day.high)}°</span>
                    <span className="text-white/60">{Math.round(day.low)}°</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weather Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Weather Insights
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-400/30">
              <p className="text-sm">
                <strong>Temperature Trend:</strong> Temperatures will be 2°C warmer than average this week.
              </p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg border border-green-400/30">
              <p className="text-sm">
                <strong>Best Time for Outdoor Activities:</strong> Tomorrow afternoon (2-5 PM) will have ideal conditions.
              </p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-400/30">
              <p className="text-sm">
                <strong>Rain Alert:</strong> Light rain expected Thursday evening. Consider indoor plans.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}