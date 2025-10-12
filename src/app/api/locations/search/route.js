import sql from '@/app/api/utils/sql';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const userId = searchParams.get('userId');

    if (!query || query.length < 2) {
      return Response.json(
        { error: 'Search query must be at least 2 characters' },
        { status: 400 }
      );
    }

    // Get Google Places autocomplete results
    const response = await fetch(
      `/integrations/google-place-autocomplete/autocomplete/json?input=${encodeURIComponent(query)}&radius=500`
    );

    if (!response.ok) {
      throw new Error(`Places API error: ${response.status}`);
    }

    const data = await response.json();

    // Get user's search history for better suggestions
    let searchHistory = [];
    if (userId) {
      searchHistory = await sql`
        SELECT DISTINCT city_name, region, country, latitude, longitude, search_count
        FROM search_history 
        WHERE user_id = ${userId} 
        AND (
          LOWER(city_name) LIKE LOWER(${`%${query}%`}) 
          OR LOWER(search_query) LIKE LOWER(${`%${query}%`})
        )
        ORDER BY search_count DESC, last_searched DESC
        LIMIT 5
      `;
    }

    // Format the results
    const suggestions = data.predictions?.map(prediction => ({
      id: prediction.place_id,
      description: prediction.description,
      main_text: prediction.structured_formatting?.main_text || '',
      secondary_text: prediction.structured_formatting?.secondary_text || '',
      types: prediction.types || []
    })) || [];

    return Response.json({
      suggestions,
      history: searchHistory
    });
  } catch (error) {
    console.error('Location search error:', error);
    return Response.json(
      { error: 'Failed to search locations' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { query, cityName, region, country, latitude, longitude, userId } = body;

    if (!query || !cityName) {
      return Response.json(
        { error: 'Query and city name are required' },
        { status: 400 }
      );
    }

    // Save to search history if user is provided
    if (userId) {
      await sql`
        INSERT INTO search_history (
          user_id, search_query, city_name, region, country, latitude, longitude
        ) VALUES (
          ${userId}, ${query}, ${cityName}, ${region}, ${country}, ${latitude}, ${longitude}
        )
        ON CONFLICT (user_id, search_query) 
        DO UPDATE SET 
          search_count = search_history.search_count + 1,
          last_searched = NOW()
      `;
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Save search history error:', error);
    return Response.json(
      { error: 'Failed to save search' },
      { status: 500 }
    );
  }
}