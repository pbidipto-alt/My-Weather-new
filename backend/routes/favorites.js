import express from 'express';
import db from '../db/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const favorites = db.prepare('SELECT * FROM favorites ORDER BY created_at DESC').all();
    res.json({ favorites });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ error: 'Failed to get favorite locations' });
  }
});

router.post('/', (req, res) => {
  try {
    const { cityName, region, country, latitude, longitude } = req.body;

    if (!cityName) {
      return res.status(400).json({ error: 'City name is required' });
    }

    const result = db.prepare(`
      INSERT INTO favorites (city_name, region, country, latitude, longitude)
      VALUES (?, ?, ?, ?, ?)
    `).run(cityName, region, country, latitude, longitude);

    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({ error: 'Failed to add favorite location' });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    db.prepare('DELETE FROM favorites WHERE id = ?').run(id);

    res.json({ success: true });
  } catch (error) {
    console.error('Delete favorite error:', error);
    res.status(500).json({ error: 'Failed to delete favorite location' });
  }
});

export default router;
