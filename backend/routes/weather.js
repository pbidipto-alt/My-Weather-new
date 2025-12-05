import express from 'express';

const router = express.Router();
const VISUAL_CROSSING_API_KEY = process.env.VISUAL_CROSSING_API_KEY || '8L4Y4RLAT733984N2Y79EVHRQ';
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'e3f1e1c6c7e0ee3e3c3c3e3e3c3c3e3e';

router.get('/visual-crossing', async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({ error: 'Location parameter is required' });
    }

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=${VISUAL_CROSSING_API_KEY}&contentType=json&include=hours,days,current,alerts`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Visual Crossing API error: ${response.status}`);
    }

    const data = await response.json();

    let aqiData = null;
    try {
      const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${data.latitude}&longitude=${data.longitude}&current=pm2_5,pm10,o3,no2,so2&timezone=auto`;
      const aqiResponse = await fetch(aqiUrl);
      if (aqiResponse.ok) {
        const aqiJson = await aqiResponse.json();
        if (aqiJson.current) {
          const pm25 = aqiJson.current.pm2_5 || 0;
          let aqi = 1;
          if (pm25 > 250) aqi = 5;
          else if (pm25 > 150) aqi = 4;
          else if (pm25 > 55) aqi = 3;
          else if (pm25 > 35) aqi = 2;

          aqiData = {
            aqi: aqi,
            pm25: pm25,
            components: {
              pm2_5: aqiJson.current.pm2_5,
              pm10: aqiJson.current.pm10,
              o3: aqiJson.current.o3,
              no2: aqiJson.current.no2,
              so2: aqiJson.current.so2
            }
          };
        }
      }
    } catch (aqiError) {
      console.error('AQI fetch error:', aqiError);
    }

    if (!aqiData) {
      const calculateAQI = () => {
        const visibility = data.currentConditions.visibility || 10;
        const cloudcover = data.currentConditions.cloudcover || 0;
        const humidity = data.currentConditions.humidity || 50;

        if (visibility >= 8 && cloudcover <= 30 && humidity <= 60) {
          return { aqi: 1 };
        } else if (visibility >= 5 && cloudcover <= 60 && humidity <= 75) {
          return { aqi: 2 };
        } else if (visibility >= 2 && cloudcover <= 80 && humidity <= 85) {
          return { aqi: 3 };
        } else if (visibility >= 1 && cloudcover <= 95) {
          return { aqi: 4 };
        } else {
          return { aqi: 5 };
        }
      };
      aqiData = calculateAQI();
    }

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
        moonphase: data.currentConditions.moonphase,
        aqi: aqiData
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

    res.json(transformedData);
  } catch (error) {
    console.error('Visual Crossing API error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data', details: error.message });
  }
});

export default router;
