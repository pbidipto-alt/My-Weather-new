# Weather Application

A modern, fully-featured weather application built with React and Node.js, featuring real-time weather data, forecasts, and interactive maps.

## Features

- Real-time weather data from Visual Crossing API
- 7-day weather forecast with hourly breakdowns
- Interactive weather maps
- Location search with history
- Favorites feature with local SQLite database
- Detailed weather metrics (humidity, pressure, wind, visibility, etc.)
- Responsive design
- Fast local setup with no external dependencies

## Quick Start

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

Run the setup command to install all dependencies and start both frontend and backend:

```bash
npm run setup
```

This will:
1. Install root dependencies
2. Install frontend dependencies
3. Install backend dependencies
4. Start both servers concurrently

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

### Available Scripts

- `npm run setup` - Install all dependencies and start the app
- `npm run dev` - Start both frontend and backend servers
- `npm run dev:frontend` - Start only the frontend
- `npm run dev:backend` - Start only the backend
- `npm run build` - Build the frontend for production

## Architecture

- **Frontend**: React 18 with Vite
- **Backend**: Node.js with Express
- **Database**: SQLite (local file-based)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Maps**: Google Maps API
- **Animations**: Motion

## Project Structure

```
weather-app/
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   └── package.json
├── backend/           # Node.js + Express API
│   ├── routes/
│   ├── db/
│   └── package.json
└── package.json       # Root package with setup scripts
```

## API Endpoints

- `GET /api/weather/visual-crossing?location=` - Get weather data
- `GET /api/locations/search?q=` - Search locations
- `POST /api/locations/search` - Save search history
- `GET /api/favorites` - Get favorite locations
- `POST /api/favorites` - Add favorite location
- `DELETE /api/favorites/:id` - Remove favorite location

## Environment Variables

The backend includes a demo API key. To use your own:

1. Edit `backend/.env`
2. Replace `VISUAL_CROSSING_API_KEY` with your key from [Visual Crossing](https://www.visualcrossing.com/weather-api)

## Database

The app uses SQLite for local data storage. The database file is automatically created at `backend/db/weather.db` on first run.

Tables:
- `favorites` - User favorite locations
- `search_history` - Location search history

## License

MIT
