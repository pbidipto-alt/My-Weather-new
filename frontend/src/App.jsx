import { useState } from "react";
import { AnimatePresence } from "motion/react";
import LocationSearch from "@/components/LocationSearch";
import WeatherMap from "@/components/WeatherMap";
import { useInitialLocation } from "@/hooks/useInitialLocation";
import { useWeatherData } from "@/hooks/useWeatherData";

import { TopBar } from "@/components/Weather/TopBar";
import { HeroWeatherCard } from "@/components/Weather/HeroWeatherCard";
import { ForecastSection } from "@/components/Weather/Forecast/ForecastSection";
import { WeatherDetailsGrid } from "@/components/Weather/Details/WeatherDetailsGrid";
import { InteractiveMapSection } from "@/components/Weather/Map/InteractiveMapSection";
import { WeatherOverview } from "@/components/Weather/Overview/WeatherOverview";
import { WeatherFooter } from "@/components/Weather/WeatherFooter";
import { WeatherAppLoader } from "@/components/Weather/WeatherAppLoader";

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useInitialLocation(setSelectedLocation, !!selectedLocation);
  const { data: weatherData, isLoading } = useWeatherData(selectedLocation);

  if (isLoading || !weatherData) {
    return <WeatherAppLoader />;
  }

  const { current, location, days } = weatherData;
  const today = days?.[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pb-20">
      <TopBar
        location={location}
        displayName={selectedLocation?.displayName}
        onSearchClick={() => setShowSearch(true)}
        onMapClick={() => setShowMap(true)}
      />

      <div className="px-6 py-8 space-y-6 max-w-7xl mx-auto">
        <HeroWeatherCard
          current={current}
          today={today}
          location={location}
          displayName={selectedLocation?.displayName}
        />

        <ForecastSection weatherData={weatherData} />

        <WeatherDetailsGrid current={current} today={today} />

        <InteractiveMapSection onShowMap={() => setShowMap(true)} />

        <WeatherOverview weatherData={weatherData} />

        <WeatherFooter />
      </div>

      <AnimatePresence>
        {showSearch && (
          <LocationSearch
            onClose={() => setShowSearch(false)}
            onLocationSelect={(location) => {
              setSelectedLocation(location);
              setShowSearch(false);
            }}
          />
        )}

        {showMap && (
          <WeatherMap onClose={() => setShowMap(false)} location={location} />
        )}
      </AnimatePresence>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
