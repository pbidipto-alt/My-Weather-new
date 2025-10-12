import { useMemo } from "react";
import { motion } from "motion/react";

function calculateMonthlyStats(days) {
  if (!days || days.length === 0) return null;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthlyDays = days.filter(day => {
    const dayDate = new Date(day.datetime);
    return dayDate.getMonth() === currentMonth && dayDate.getFullYear() === currentYear;
  });

  if (monthlyDays.length === 0) return null;

  let sunnyCloudyCount = 0;
  let rainSnowCount = 0;
  let totalHigh = 0;
  let totalLow = 0;

  monthlyDays.forEach(day => {
    const icon = day.icon?.toLowerCase() || '';
    const conditions = day.conditions?.toLowerCase() || '';

    if (icon.includes('rain') || icon.includes('snow') ||
        conditions.includes('rain') || conditions.includes('snow')) {
      rainSnowCount++;
    } else {
      sunnyCloudyCount++;
    }

    totalHigh += day.tempmax || 0;
    totalLow += day.tempmin || 0;
  });

  const avgHigh = Math.round(totalHigh / monthlyDays.length);
  const avgLow = Math.round(totalLow / monthlyDays.length);

  const total = sunnyCloudyCount + rainSnowCount;
  const sunnyPercentage = (sunnyCloudyCount / total) * 100;
  const rainPercentage = (rainSnowCount / total) * 100;

  return {
    sunnyCloudyDays: sunnyCloudyCount,
    rainSnowDays: rainSnowCount,
    avgHigh,
    avgLow,
    sunnyPercentage,
    rainPercentage,
    monthName: currentDate.toLocaleString('default', { month: 'short' }),
    year: currentYear,
  };
}

function CircularChart({ sunnyPercentage, rainPercentage }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const sunnyDashArray = `${(sunnyPercentage / 100) * circumference} ${circumference}`;
  const rainDashArray = `${(rainPercentage / 100) * circumference} ${circumference}`;
  const sunnyOffset = 0;
  const rainOffset = -((sunnyPercentage / 100) * circumference);

  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <svg className="absolute transform -rotate-90" width="160" height="160">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="rgba(100, 116, 139, 0.3)"
          strokeWidth="20"
        />

        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="20"
          strokeDasharray={sunnyDashArray}
          strokeDashoffset={sunnyOffset}
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: sunnyDashArray }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#F97316"
          strokeWidth="20"
          strokeDasharray={rainDashArray}
          strokeDashoffset={rainOffset}
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: rainDashArray }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />

        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#EAB308"
          strokeWidth="20"
          strokeDasharray={`${((100 - sunnyPercentage - rainPercentage) / 100) * circumference} ${circumference}`}
          strokeDashoffset={-(((sunnyPercentage + rainPercentage) / 100) * circumference)}
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{
            strokeDasharray: `${((100 - sunnyPercentage - rainPercentage) / 100) * circumference} ${circumference}`
          }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-gray-400 text-sm">{new Date().getFullYear()}</p>
        <p className="text-white text-3xl font-bold">
          {new Date().toLocaleString('default', { month: 'short' })}
        </p>
      </div>
    </div>
  );
}

export function WeatherOverview({ weatherData }) {
  const stats = useMemo(() => {
    return calculateMonthlyStats(weatherData?.days);
  }, [weatherData?.days]);

  if (!stats) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-6 border border-white/10"
    >
      <h2 className="text-white text-xl font-semibold mb-6">Weather overview</h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <CircularChart
          sunnyPercentage={stats.sunnyPercentage}
          rainPercentage={stats.rainPercentage}
        />

        <div className="flex-1 grid grid-cols-2 gap-6 w-full">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <p className="text-gray-400 text-sm">Sunny/Cloudy days</p>
            </div>
            <p className="text-white text-3xl font-bold">{stats.sunnyCloudyDays}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <p className="text-gray-400 text-sm">Rain/Snow days</p>
            </div>
            <p className="text-white text-3xl font-bold">{stats.rainSnowDays}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-orange-400">↑</span>
              <p className="text-gray-400 text-sm">Average high</p>
            </div>
            <p className="text-white text-3xl font-bold">{stats.avgHigh}°</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-400">↓</span>
              <p className="text-gray-400 text-sm">Average low</p>
            </div>
            <p className="text-white text-3xl font-bold">{stats.avgLow}°</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
