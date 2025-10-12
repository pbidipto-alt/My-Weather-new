import { motion, AnimatePresence } from 'motion/react';
import { X, Layers, Zap, Cloud, Thermometer, MapPin, Satellite, Navigation2 } from 'lucide-react';
import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

export default function WeatherMap({ onClose, location }) {
  const [activeLayer, setActiveLayer] = useState('precipitation');
  const [mapType, setMapType] = useState('roadmap');

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const layers = [
    { 
      id: 'precipitation', 
      name: 'Precipitation', 
      icon: <Cloud className="w-4 h-4" />, 
      color: 'blue',
      description: 'Rain and snow intensity'
    },
    { 
      id: 'temperature', 
      name: 'Temperature', 
      icon: <Thermometer className="w-4 h-4" />, 
      color: 'red',
      description: 'Surface temperature data'
    },
    { 
      id: 'wind', 
      name: 'Wind Speed', 
      icon: <Zap className="w-4 h-4" />, 
      color: 'green',
      description: 'Wind velocity patterns'
    },
    { 
      id: 'clouds', 
      name: 'Cloud Cover', 
      icon: <Satellite className="w-4 h-4" />, 
      color: 'gray',
      description: 'Satellite cloud imagery'
    },
  ];

  const mapTypes = [
    { id: 'roadmap', name: 'Road', description: 'Standard road map' },
    { id: 'satellite', name: 'Satellite', description: 'Satellite imagery' },
    { id: 'hybrid', name: 'Hybrid', description: 'Satellite with labels' },
    { id: 'terrain', name: 'Terrain', description: 'Topographical view' }
  ];

  const center = location ? 
    { lat: parseFloat(location.latitude) || 22.7196, lng: parseFloat(location.longitude) || 75.8577 } :
    { lat: 22.7196, lng: 75.8577 };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white/95 backdrop-blur-xl rounded-3xl w-full max-w-6xl h-[85vh] overflow-hidden shadow-2xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Enhanced Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-xl">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Interactive Weather Map</h2>
              <p className="text-slate-600 text-sm flex items-center space-x-2">
                <Navigation2 className="w-4 h-4" />
                <span>{location?.name || 'Current Location'}</span>
                {location?.region && (
                  <>
                    <span>•</span>
                    <span>{location.region}</span>
                  </>
                )}
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 hover:bg-red-100 rounded-xl transition-all duration-200 text-slate-600 hover:text-red-600"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Controls Panel */}
        <div className="p-4 border-b border-slate-200/50 bg-white/50">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Weather Layers */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 mr-4">
                <Layers className="w-5 h-5 text-slate-600" />
                <span className="text-sm font-semibold text-slate-700">Weather Layers</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {layers.map((layer) => (
                  <motion.button
                    key={layer.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 border-2 ${
                      activeLayer === layer.id
                        ? `bg-${layer.color}-100 border-${layer.color}-500 text-${layer.color}-700 shadow-lg`
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {layer.icon}
                    <span className="text-sm font-medium">{layer.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Map Type Controls */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-slate-700 mr-2">Map Type</span>
              <div className="flex space-x-1">
                {mapTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMapType(type.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                      mapType === type.id
                        ? 'bg-indigo-500 text-white shadow-lg'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {type.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Layer Info */}
          <motion.div
            key={activeLayer}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
          >
            <div className="flex items-center space-x-2">
              {layers.find(l => l.id === activeLayer)?.icon}
              <span className="text-sm font-semibold text-slate-700">
                {layers.find(l => l.id === activeLayer)?.name}
              </span>
              <span className="text-xs text-slate-500">
                • {layers.find(l => l.id === activeLayer)?.description}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Google Maps Container */}
        <div className="flex-1 relative">
          <APIProvider apiKey={API_KEY}>
            <Map
              style={{ width: '100%', height: '100%' }}
              defaultCenter={center}
              center={center}
              defaultZoom={10}
              mapTypeId={mapType}
              gestureHandling="greedy"
              disableDefaultUI={false}
              zoomControl={true}
              mapTypeControl={false}
              scaleControl={true}
              streetViewControl={false}
              rotateControl={false}
              fullscreenControl={true}
              options={{
                styles: mapType === 'roadmap' ? [
                  {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
                  },
                  {
                    featureType: "landscape",
                    elementType: "geometry",
                    stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
                  }
                ] : undefined
              }}
            >
              {/* Location Marker */}
              <AdvancedMarker position={center}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="relative"
                >
                  {/* Pulsing animation */}
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-blue-500 rounded-full"
                  />
                  {/* Main marker */}
                  <div className="relative w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              </AdvancedMarker>

              {/* Weather Layer Overlay Simulation */}
              {activeLayer === 'precipitation' && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Simulated precipitation overlay */}
                  <div 
                    className="absolute bg-blue-400/20 rounded-full blur-xl"
                    style={{
                      top: '30%',
                      left: '40%',
                      width: '200px',
                      height: '150px',
                    }}
                  />
                  <div 
                    className="absolute bg-blue-500/30 rounded-full blur-lg"
                    style={{
                      top: '50%',
                      right: '25%',
                      width: '150px',
                      height: '120px',
                    }}
                  />
                </div>
              )}

              {activeLayer === 'temperature' && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Simulated temperature overlay */}
                  <div 
                    className="absolute bg-red-400/20 rounded-full blur-xl"
                    style={{
                      top: '25%',
                      left: '35%',
                      width: '250px',
                      height: '200px',
                    }}
                  />
                  <div 
                    className="absolute bg-orange-500/25 rounded-full blur-lg"
                    style={{
                      top: '45%',
                      right: '30%',
                      width: '180px',
                      height: '140px',
                    }}
                  />
                </div>
              )}

              {activeLayer === 'wind' && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Simulated wind overlay */}
                  <div 
                    className="absolute bg-green-400/20 rounded-full blur-lg transform rotate-45"
                    style={{
                      top: '30%',
                      left: '40%',
                      width: '100px',
                      height: '300px',
                    }}
                  />
                  <div 
                    className="absolute bg-green-500/25 rounded-full blur-md transform rotate-12"
                    style={{
                      top: '50%',
                      right: '25%',
                      width: '80px',
                      height: '200px',
                    }}
                  />
                </div>
              )}
            </Map>
          </APIProvider>

          {/* Enhanced Legend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20 min-w-[200px]"
          >
            <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center space-x-2">
              {layers.find(l => l.id === activeLayer)?.icon}
              <span>{layers.find(l => l.id === activeLayer)?.name} Intensity</span>
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Low</span>
                <span>High</span>
              </div>
              <div className={`w-full h-3 rounded-full bg-gradient-to-r ${
                activeLayer === 'precipitation' ? 'from-blue-200 via-blue-400 to-blue-600' :
                activeLayer === 'temperature' ? 'from-blue-400 via-yellow-400 to-red-600' :
                activeLayer === 'wind' ? 'from-green-200 via-green-400 to-green-600' :
                'from-gray-200 via-gray-400 to-gray-600'
              }`} />
              <div className="grid grid-cols-3 gap-1 text-xs text-slate-600 mt-2">
                <div className="text-center">
                  <div className="font-semibold">Light</div>
                  <div className="text-slate-500">
                    {activeLayer === 'precipitation' ? '0-2mm' :
                     activeLayer === 'temperature' ? '<20°C' :
                     activeLayer === 'wind' ? '<10km/h' : 'Low'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Moderate</div>
                  <div className="text-slate-500">
                    {activeLayer === 'precipitation' ? '2-10mm' :
                     activeLayer === 'temperature' ? '20-30°C' :
                     activeLayer === 'wind' ? '10-30km/h' : 'Medium'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Heavy</div>
                  <div className="text-slate-500">
                    {activeLayer === 'precipitation' ? '>10mm' :
                     activeLayer === 'temperature' ? '>30°C' :
                     activeLayer === 'wind' ? '>30km/h' : 'High'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map Info Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-6 right-6 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20"
          >
            <div className="text-sm space-y-2">
              <div className="font-bold text-slate-800">Live Weather Data</div>
              <div className="text-slate-600">
                <div>Zoom: Interactive</div>
                <div>Updates: Real-time</div>
                <div>Coverage: Global</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Footer */}
        <div className="p-4 border-t border-slate-200/50 bg-gradient-to-r from-slate-50 to-blue-50">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 text-slate-600">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Data</span>
              </div>
              <span>•</span>
              <span>Powered by Google Maps</span>
              <span>•</span>
              <span>Weather data from Visual Crossing</span>
            </div>
            <div className="text-slate-500">
              <span>Drag to explore • Scroll to zoom • Click layers to switch</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}