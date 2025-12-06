
import {
  Sun,
  Cloud,
  CloudRain,
  Wind,
  CloudDrizzle,
  CloudSnow,
  CloudFog,
  Moon,
  CloudSun,
} from "lucide-react";

export const getWeatherIcon = (icon, size = "w-8 h-8") => {
  const iconMap = {
    "clear-day": <Sun className={`${size} text-amber-400`} />,
    "clear-night": <Moon className={`${size} text-indigo-300`} />,
    cloudy: <Cloud className={`${size} text-slate-400`} />,
    "partly-cloudy-day": <CloudSun className={`${size} text-amber-300`} />,
    "partly-cloudy-night": <Cloud className={`${size} text-slate-400`} />,
    rain: <CloudRain className={`${size} text-blue-400`} />,
    snow: <CloudSnow className={`${size} text-blue-100`} />,
    wind: <Wind className={`${size} text-emerald-400`} />,
    fog: <CloudFog className={`${size} text-slate-300`} />,
    drizzle: <CloudDrizzle className={`${size} text-blue-300`} />,
  };
  return iconMap[icon] || <Sun className={`${size} text-amber-400`} />;
};

export const getWindDirection = (degrees) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

export const formatTime = (timeStr) => {
  if (!timeStr) return "";
  const [hours] = timeStr.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "pm" : "am";
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}${ampm}`;
};

// Prepare chart data for hourly
export const prepareHourlyChartData = (weatherData) => {
    const hourly = weatherData?.days?.[0]?.hours || [];
    return hourly.slice(0, 24).map((hour, index) => ({
      time: index === 0 ? "Now" : formatTime(hour.datetime),
      fullTime: hour.datetime,
      temperature: Math.round(hour.temp),
      humidity: hour.humidity,
      windSpeed: Math.round(hour.windspeed),
      precipProb: hour.precipprob,
      feelsLike: Math.round(hour.feelslike),
      visibility: hour.visibility,
      pressure: hour.pressure,
      uvIndex: hour.uvindex || 0,
      icon: hour.icon,
      conditions: hour.conditions,
    }));
};

// Prepare chart data for 10-day
export const prepareDailyChartData = (weatherData) => {
    const days = weatherData?.days || [];
    return days.slice(0, 10).map((day, index) => ({
      day:
        index === 0
          ? "Today"
          : new Date(day.datetime).toLocaleDateString("en", {
              weekday: "short",
            }),
      fullDate: day.datetime,
      tempMax: Math.round(day.tempmax),
      tempMin: Math.round(day.tempmin),
      temperature: Math.round((day.tempmax + day.tempmin) / 2),
      humidity: day.humidity,
      windSpeed: Math.round(day.windspeed),
      precipProb: day.precipprob,
      uvIndex: day.uvindex || 0,
      icon: day.icon,
      conditions: day.conditions,
    }));
};

export const getAQIInfo = (aqiValue) => {
  if (aqiValue === null || aqiValue === undefined) {
    return { level: "N/A", color: "gray", value: "N/A" };
  }

  if (aqiValue <= 50) {
    return { level: "Good", color: "green", value: aqiValue };
  }
  if (aqiValue <= 100) {
    return { level: "Moderate", color: "yellow", value: aqiValue };
  }
  if (aqiValue <= 150) {
    return { level: "Unhealthy for Sensitive Groups", color: "orange", value: aqiValue };
  }
  if (aqiValue <= 200) {
    return { level: "Unhealthy", color: "red", value: aqiValue };
  }
  if (aqiValue <= 300) {
    return { level: "Very Unhealthy", color: "rose", value: aqiValue };
  }
  return { level: "Hazardous", color: "amber", value: aqiValue };
};
