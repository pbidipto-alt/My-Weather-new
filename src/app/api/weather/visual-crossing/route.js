const VISUAL_CROSSING_API_KEY = process.env.VISUAL_CROSSING_API_KEY || '8L4Y4RLAT733984N2Y79EVHRQ';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location'); // Can be city name or lat,lon

    if (!location) {
      return Response.json(
        { error: 'Location parameter is required' },
        { status: 400 }
      );
    }

    // Fetch from Visual Crossing API
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=${VISUAL_CROSSING_API_KEY}&contentType=json&include=hours,days,current,alerts`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Visual Crossing API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform data to a consistent format
    const transformedData = {
      location: {
        name: data.resolvedAddress,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone,
        tzoffset: data.tzoffset
      },
      current: {
        datetime: data.currentConditions.datetime,
        temp: data.currentConditions.temp,
        feelslike: data.currentConditions.feelslike,
        humidity: data.currentConditions.humidity,
        dew: data.currentConditions.dew,
        precip: data.currentConditions.precip,
        precipprob: data.currentConditions.precipprob,
        snow: data.currentConditions.snow,
        snowdepth: data.currentConditions.snowdepth,
        preciptype: data.currentConditions.preciptype,
        windgust: data.currentConditions.windgust,
        windspeed: data.currentConditions.windspeed,
        winddir: data.currentConditions.winddir,
        pressure: data.currentConditions.pressure,
        visibility: data.currentConditions.visibility,
        cloudcover: data.currentConditions.cloudcover,
        solarradiation: data.currentConditions.solarradiation,
        solarenergy: data.currentConditions.solarenergy,
        uvindex: data.currentConditions.uvindex,
        conditions: data.currentConditions.conditions,
        icon: data.currentConditions.icon,
        sunrise: data.currentConditions.sunrise,
        sunset: data.currentConditions.sunset,
        moonphase: data.currentConditions.moonphase
      },
      days: data.days.map(day => ({
        datetime: day.datetime,
        datetimeEpoch: day.datetimeEpoch,
        tempmax: day.tempmax,
        tempmin: day.tempmin,
        temp: day.temp,
        feelslikemax: day.feelslikemax,
        feelslikemin: day.feelslikemin,
        feelslike: day.feelslike,
        dew: day.dew,
        humidity: day.humidity,
        precip: day.precip,
        precipprob: day.precipprob,
        precipcover: day.precipcover,
        preciptype: day.preciptype,
        snow: day.snow,
        snowdepth: day.snowdepth,
        windgust: day.windgust,
        windspeed: day.windspeed,
        winddir: day.winddir,
        pressure: day.pressure,
        cloudcover: day.cloudcover,
        visibility: day.visibility,
        solarradiation: day.solarradiation,
        solarenergy: day.solarenergy,
        uvindex: day.uvindex,
        sunrise: day.sunrise,
        sunset: day.sunset,
        moonphase: day.moonphase,
        conditions: day.conditions,
        description: day.description,
        icon: day.icon,
        hours: day.hours?.map(hour => ({
          datetime: hour.datetime,
          datetimeEpoch: hour.datetimeEpoch,
          temp: hour.temp,
          feelslike: hour.feelslike,
          humidity: hour.humidity,
          dew: hour.dew,
          precip: hour.precip,
          precipprob: hour.precipprob,
          snow: hour.snow,
          snowdepth: hour.snowdepth,
          preciptype: hour.preciptype,
          windgust: hour.windgust,
          windspeed: hour.windspeed,
          winddir: hour.winddir,
          pressure: hour.pressure,
          visibility: hour.visibility,
          cloudcover: hour.cloudcover,
          solarradiation: hour.solarradiation,
          solarenergy: hour.solarenergy,
          uvindex: hour.uvindex,
          conditions: hour.conditions,
          icon: hour.icon
        }))
      })),
      alerts: data.alerts || []
    };

    return Response.json(transformedData);
  } catch (error) {
    console.error('Visual Crossing API error:', error);
    return Response.json(
      { error: 'Failed to fetch weather data', details: error.message },
      { status: 500 }
    );
  }
}