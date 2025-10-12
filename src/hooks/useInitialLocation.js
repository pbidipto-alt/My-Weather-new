
import { useEffect } from "react";

export function useInitialLocation(setSelectedLocation, hasLocation) {
  useEffect(() => {
    if (!hasLocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setSelectedLocation({
            name: `${position.coords.latitude},${position.coords.longitude}`,
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            displayName: "Current Location",
          });
        },
        () => {
          // Default location if geolocation fails or is denied
          setSelectedLocation({
            name: "Indore, Madhya Pradesh",
            lat: 22.7196,
            lon: 75.8577,
            displayName: "Indore, Madhya Pradesh",
          });
        },
      );
    }
  }, [hasLocation, setSelectedLocation]);
}
