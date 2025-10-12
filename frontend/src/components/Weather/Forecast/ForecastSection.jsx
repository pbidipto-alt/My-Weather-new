
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity } from "lucide-react";
import { ForecastControls } from "./ForecastControls";
import { ForecastChart } from "./ForecastChart";
import { ForecastList } from "./ForecastList";
import { prepareHourlyChartData, prepareDailyChartData } from "@/utils/weatherUtils";

export function ForecastSection({ weatherData }) {
    const [activeChart, setActiveChart] = useState("temperature");
    const [viewMode, setViewMode] = useState("chart");
    const [forecastPeriod, setForecastPeriod] = useState("hourly");

    const hourlyChartData = prepareHourlyChartData(weatherData);
    const dailyChartData = prepareDailyChartData(weatherData);

    return (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
        >
          <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 flex items-center space-x-2">
                <Activity className="w-6 h-6 text-blue-500" />
                <span>Weather Forecast</span>
              </h3>
              <p className="text-slate-500 mt-1">Interactive analytics and detailed forecasts</p>
            </div>
            <ForecastControls 
                forecastPeriod={forecastPeriod}
                setForecastPeriod={setForecastPeriod}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />
          </div>

          <AnimatePresence mode="wait">
            {viewMode === "chart" ? (
                <motion.div
                    key="chart-view"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <ForecastChart
                        activeChart={activeChart}
                        setActiveChart={setActiveChart}
                        forecastPeriod={forecastPeriod}
                        hourlyData={hourlyChartData}
                        dailyData={dailyChartData}
                    />
                </motion.div>
            ) : (
                <motion.div
                    key="list-view"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <ForecastList
                        forecastPeriod={forecastPeriod}
                        hourlyData={weatherData?.days?.[0]?.hours || []}
                        dailyData={weatherData?.days || []}
                    />
                </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
    );
}
