const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'd05053f665ff724fddd1ec75fc8f5071';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const type = searchParams.get('type') || 'all'; // all, aqi, uv, onecall
    
    if (!lat || !lon) {
      return Response.json(
        { error: 'Latitude and longitude parameters are required' },
        { status: 400 }
      );
    }

    const results = {};

    // Fetch Air Quality Index
    if (type === 'all' || type === 'aqi') {
      const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
      const aqiResponse = await fetch(aqiUrl);
      
      if (aqiResponse.ok) {
        const aqiData = await aqiResponse.json();
        results.airQuality = {
          aqi: aqiData.list[0].main.aqi,
          components: aqiData.list[0].components,
          dt: aqiData.list[0].dt
        };
      }
    }

    // Fetch One Call API (includes UV, hourly, daily forecast)
    if (type === 'all' || type === 'onecall') {
      const oneCallUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${OPENWEATHER_API_KEY}`;
      const oneCallResponse = await fetch(oneCallUrl);
      
      if (oneCallResponse.ok) {
        const oneCallData = await oneCallResponse.json();
        results.oneCall = {
          current: {
            uvi: oneCallData.current.uvi,
            sunrise: oneCallData.current.sunrise,
            sunset: oneCallData.current.sunset,
            temp: oneCallData.current.temp,
            feels_like: oneCallData.current.feels_like,
            pressure: oneCallData.current.pressure,
            humidity: oneCallData.current.humidity,
            dew_point: oneCallData.current.dew_point,
            clouds: oneCallData.current.clouds,
            visibility: oneCallData.current.visibility,
            wind_speed: oneCallData.current.wind_speed,
            wind_deg: oneCallData.current.wind_deg,
            weather: oneCallData.current.weather
          },
          hourly: oneCallData.hourly?.slice(0, 48).map(h => ({
            dt: h.dt,
            temp: h.temp,
            feels_like: h.feels_like,
            pressure: h.pressure,
            humidity: h.humidity,
            dew_point: h.dew_point,
            uvi: h.uvi,
            clouds: h.clouds,
            visibility: h.visibility,
            wind_speed: h.wind_speed,
            wind_deg: h.wind_deg,
            pop: h.pop,
            weather: h.weather
          })),
          daily: oneCallData.daily?.slice(0, 8).map(d => ({
            dt: d.dt,
            sunrise: d.sunrise,
            sunset: d.sunset,
            moonrise: d.moonrise,
            moonset: d.moonset,
            moon_phase: d.moon_phase,
            temp: d.temp,
            feels_like: d.feels_like,
            pressure: d.pressure,
            humidity: d.humidity,
            dew_point: d.dew_point,
            wind_speed: d.wind_speed,
            wind_deg: d.wind_deg,
            weather: d.weather,
            clouds: d.clouds,
            pop: d.pop,
            uvi: d.uvi
          })),
          alerts: oneCallData.alerts || []
        };
      }
    }

    // Fetch current UV index separately if needed
    if (type === 'uv') {
      const uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
      const uvResponse = await fetch(uvUrl);
      
      if (uvResponse.ok) {
        const uvData = await uvResponse.json();
        results.uv = {
          value: uvData.value,
          date: uvData.date
        };
      }
    }

    return Response.json(results);
  } catch (error) {
    console.error('OpenWeatherMap API error:', error);
    return Response.json(
      { error: 'Failed to fetch OpenWeatherMap data', details: error.message },
      { status: 500 }
    );
  }
}