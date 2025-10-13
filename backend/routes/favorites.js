import express from 'express';
import { cache } from '../cache.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const favorites = cache.favorites.getAll();
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

    const id = cache.favorites.add(cityName, region, country, latitude, longitude);

    res.json({ success: true, id });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({ error: 'Failed to add favorite location' });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    const deleted = cache.favorites.delete(id);

    if (deleted) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Favorite not found' });
    }
  } catch (error) {
    console.error('Delete favorite error:', error);
    res.status(500).json({ error: 'Failed to delete favorite location' });
  }
});

export default router;
