import express from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weather.js';
import locationsRoutes from './routes/locations.js';
import favoritesRoutes from './routes/favorites.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/weather', weatherRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/favorites', favoritesRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
