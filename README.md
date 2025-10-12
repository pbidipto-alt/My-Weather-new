# Weather Application

A modern, fully-featured weather application built with React Router v7, featuring real-time weather data, forecasts, and interactive maps.

## Features

- Real-time weather data from multiple providers (OpenWeatherMap, Visual Crossing)
- 7-day weather forecast with hourly breakdowns
- Interactive weather maps
- Location search and favorites
- Air quality index
- UV index
- Detailed weather metrics (humidity, pressure, wind, visibility, etc.)
- Responsive design

## Quick Start with Docker

The easiest way to run this application is with Docker Compose. Everything is pre-configured to work out of the box.

### Prerequisites

- Docker
- Docker Compose

### Running the Application

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Start the application:
```bash
docker-compose up
```

The application will be available at `http://localhost:3000`

### Docker Commands

```bash
# Start the application
docker-compose up

# Start in detached mode (background)
docker-compose up -d

# Stop the application
docker-compose down

# Rebuild the image
docker-compose build

# View logs
docker-compose logs -f
```

## Local Development Setup

If you prefer to run the application without Docker:

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy the environment file:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run typecheck` - Run TypeScript type checking

## Environment Variables

The application comes with demo API keys pre-configured. For production use, replace them with your own:

### Weather API Keys

- `OPENWEATHER_API_KEY` - Get your free key at [OpenWeatherMap](https://openweathermap.org/api)
- `VISUAL_CROSSING_API_KEY` - Get your free key at [Visual Crossing](https://www.visualcrossing.com/weather-api)

### Optional: Supabase (for favorites feature)

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## Architecture

- **Frontend**: React 18 with React Router v7
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Maps**: Google Maps API (via @vis.gl/react-google-maps)
- **Animations**: Framer Motion
- **Database**: Supabase (optional, for favorites)

## API Routes

The application includes built-in API routes for weather data:

- `/api/weather/current` - Current weather data
- `/api/weather/visual-crossing` - Visual Crossing weather data
- `/api/weather/openweather` - OpenWeatherMap data
- `/api/locations/search` - Location search
- `/api/favorites` - User favorites (requires Supabase)

## Offline Capability

The application is designed to work offline with cached data. All assets are bundled and no external CDNs are required.

## Production Deployment

### With Docker

```bash
docker-compose up -d
```

### Manual Deployment

```bash
npm run build
npm start
```

## Troubleshooting

### Port already in use

If port 3000 is already in use, you can change it in `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Change 3001 to your preferred port
```

### API rate limits

The included demo API keys have rate limits. For production use, replace them with your own keys in the `.env` file.

## License

MIT
