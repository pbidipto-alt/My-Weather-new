import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import { Search, X, MapPin, Clock, Star } from 'lucide-react';

export default function LocationSearch({ onClose, onLocationSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Search locations
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['locationSearch', searchQuery],
    queryFn: async () => {
      if (searchQuery.length < 2) return { suggestions: [], history: [] };
      
      const response = await fetch(`/api/locations/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Failed to search locations');
      }
      return response.json();
    },
    enabled: searchQuery.length >= 2,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const suggestions = searchResults?.suggestions || [];
  const history = searchResults?.history || [];
  const allResults = [...suggestions, ...history];

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, allResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleLocationSelect(allResults[selectedIndex]);
    }
  };

  const handleLocationSelect = async (location) => {
    const locationData = {
      name: location.name || location.main_text || location.city_name || location.description,
      displayName: location.name || location.main_text || location.city_name,
      lat: location.lat || location.latitude,
      lon: location.lon || location.longitude,
      region: location.region,
      country: location.country
    };

    if (searchQuery && locationData.name) {
      try {
        await fetch('/api/locations/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: searchQuery,
            cityName: locationData.name,
            region: locationData.region,
            country: locationData.country,
            latitude: locationData.lat,
            longitude: locationData.lon
          })
        });
      } catch (error) {
        console.error('Failed to save search history:', error);
      }
    }

    onLocationSelect(locationData);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationSelect({
            name: 'Current Location',
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-full max-w-md mx-4 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Search Locations</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search for a city or location..."
            className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        {/* Current Location Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={getCurrentLocation}
          className="w-full bg-blue-500/20 border border-blue-400/30 rounded-xl p-3 mb-4 flex items-center space-x-3 hover:bg-blue-500/30 transition-colors"
        >
          <MapPin className="w-5 h-5 text-blue-400" />
          <span>Use Current Location</span>
        </motion.button>

        {/* Search Results */}
        {searchQuery.length >= 2 && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-4">
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
              </div>
            ) : allResults.length > 0 ? (
              allResults.map((result, index) => (
                <motion.button
                  key={result.id || `${result.city_name}-${index}`}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => handleLocationSelect(result)}
                  className={`w-full text-left p-3 rounded-xl transition-colors flex items-center space-x-3 ${
                    selectedIndex === index 
                      ? 'bg-white/20' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  {result.search_count ? (
                    <Clock className="w-4 h-4 text-white/60 flex-shrink-0" />
                  ) : (
                    <MapPin className="w-4 h-4 text-white/60 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {result.main_text || result.city_name || result.description}
                    </p>
                    {(result.secondary_text || result.region) && (
                      <p className="text-sm text-white/60 truncate">
                        {result.secondary_text || `${result.region}${result.country ? `, ${result.country}` : ''}`}
                      </p>
                    )}
                  </div>
                  {result.search_count && (
                    <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  )}
                </motion.button>
              ))
            ) : (
              <div className="text-center py-4 text-white/60">
                No locations found
              </div>
            )}
          </div>
        )}

        {/* Popular Locations */}
        {searchQuery.length < 2 && (
          <div>
            <h3 className="text-sm font-medium text-white/70 mb-3">Popular Locations</h3>
            <div className="space-y-2">
              {[
                { name: 'New York', region: 'New York', country: 'United States', lat: 40.7128, lon: -74.0060 },
                { name: 'London', region: 'England', country: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
                { name: 'Tokyo', region: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503 },
                { name: 'Paris', region: 'Île-de-France', country: 'France', lat: 48.8566, lon: 2.3522 },
                { name: 'Sydney', region: 'New South Wales', country: 'Australia', lat: -33.8688, lon: 151.2093 }
              ].map((location) => (
                <motion.button
                  key={location.name}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full text-left p-3 rounded-xl hover:bg-white/10 transition-colors flex items-center space-x-3"
                >
                  <MapPin className="w-4 h-4 text-white/60" />
                  <div>
                    <p className="font-medium">{location.name}</p>
                    <p className="text-sm text-white/60">{location.region}, {location.country}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}