import express from 'express';
import db from '../db/database.js';

const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters' });
    }

    const searchHistory = db.prepare(`
      SELECT DISTINCT city_name, region, country, latitude, longitude, search_count
      FROM search_history
      WHERE LOWER(city_name) LIKE LOWER(?)
      OR LOWER(search_query) LIKE LOWER(?)
      ORDER BY search_count DESC, last_searched DESC
      LIMIT 5
    `).all(`%${q}%`, `%${q}%`);

    res.json({
      suggestions: [],
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

    const existing = db.prepare('SELECT id, search_count FROM search_history WHERE search_query = ?').get(query);

    if (existing) {
      db.prepare('UPDATE search_history SET search_count = ?, last_searched = CURRENT_TIMESTAMP WHERE id = ?')
        .run(existing.search_count + 1, existing.id);
    } else {
      db.prepare(`
        INSERT INTO search_history (search_query, city_name, region, country, latitude, longitude)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(query, cityName, region, country, latitude, longitude);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Save search history error:', error);
    res.status(500).json({ error: 'Failed to save search' });
  }
});

export default router;
