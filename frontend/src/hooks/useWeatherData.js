
import { useQuery } from "@tanstack/react-query";

export function useWeatherData(selectedLocation) {
  return useQuery({
    queryKey: ["weather-visual-crossing", selectedLocation?.name],
    queryFn: async () => {
      if (!selectedLocation) return null;
      const response = await fetch(
        `/api/weather/visual-crossing?location=${encodeURIComponent(selectedLocation.name)}`,
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");
      return response.json();
    },
    enabled: !!selectedLocation,
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });
}
