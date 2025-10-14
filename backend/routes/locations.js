import express from 'express';
import { cache } from '../cache.js';

const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters' });
    }

    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=10&language=en&format=json`;

    const response = await fetch(geocodeUrl);

    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }

    const data = await response.json();

    const suggestions = (data.results || []).map(result => ({
      id: `${result.latitude}-${result.longitude}`,
      name: result.name,
      main_text: result.name,
      secondary_text: [result.admin1, result.country].filter(Boolean).join(', '),
      latitude: result.latitude,
      longitude: result.longitude,
      country: result.country,
      region: result.admin1
    }));

    const searchHistory = cache.searchHistory.get(q);

    res.json({
      suggestions,
      history: searchHistory
    });
  } catch (error) {
    console.error('Location search error:', error);
    res.status(500).json({ error: 'Failed to search locations' });
  }
});

router.post('/search', async (req, res) => {
  try {
    const { query, cityName, region, country, latitude, longitude } = req.body;

    if (!query || !cityName) {
      return res.status(400).json({ error: 'Query and city name are required' });
    }

    cache.searchHistory.save(query, cityName, region, country, latitude, longitude);

    res.json({ success: true });
  } catch (error) {
    console.error('Save search history error:', error);
    res.status(500).json({ error: 'Failed to save search' });
  }
});

export default router;
