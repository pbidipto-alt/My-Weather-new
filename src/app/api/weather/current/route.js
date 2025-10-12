export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!city && (!lat || !lon)) {
      return Response.json(
        { error: 'Either city name or coordinates (lat, lon) are required' },
        { status: 400 }
      );
    }

    // Fetch from weather API
    const weatherCity = city || `${lat},${lon}`;
    const response = await fetch(`/integrations/weather-by-city/weather/${weatherCity}`);

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const weatherData = await response.json();

    return Response.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error);
    return Response.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}