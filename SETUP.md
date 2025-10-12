# Setup Guide

This guide will help you get the weather application running on your local machine.

## Option 1: Docker (Recommended - Zero Configuration)

This is the fastest way to get started. No need to install Node.js or any dependencies.

### Prerequisites
- Docker Desktop installed ([Download](https://www.docker.com/products/docker-desktop))

### Steps

1. **Clone the repository** (if not already done):
```bash
git clone <repository-url>
cd <project-directory>
```

2. **Start the application**:
```bash
docker-compose up
```

That's it! The application will:
- Install all dependencies automatically
- Build the application
- Start the server on port 3000

3. **Access the application**:
Open your browser and go to `http://localhost:3000`

### Docker Commands Reference

```bash
# Start in background
docker-compose up -d

# Stop the application
docker-compose down

# View logs
docker-compose logs -f

# Rebuild after code changes
docker-compose build --no-cache
docker-compose up
```

## Option 2: Local Development Setup

If you prefer to run the application directly on your machine:

### Prerequisites
- Node.js 20+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)

### Steps

1. **Install dependencies**:
```bash
npm install
```

2. **Copy environment configuration**:
```bash
cp .env.example .env
```

3. **Start development server**:
```bash
npm run dev
```

4. **Access the application**:
Open your browser and go to `http://localhost:5173`

### Production Build

To build and run the production version:

```bash
npm run build
npm start
```

Access at `http://localhost:3000`

## Configuration

### Environment Variables

The application comes pre-configured with demo API keys. All configuration is in the `.env` file:

```env
# Weather API Keys (Demo keys included - replace for production)
OPENWEATHER_API_KEY=d05053f665ff724fddd1ec75fc8f5071
VISUAL_CROSSING_API_KEY=8L4Y4RLAT733984N2Y79EVHRQ

# Optional: Supabase for favorites feature
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Application
PORT=3000
NODE_ENV=production
```

### Getting Your Own API Keys (Optional)

The demo keys work out of the box, but have rate limits. For production:

1. **OpenWeatherMap**:
   - Sign up at [openweathermap.org](https://openweathermap.org/api)
   - Get your free API key
   - Update `OPENWEATHER_API_KEY` in `.env`

2. **Visual Crossing**:
   - Sign up at [visualcrossing.com](https://www.visualcrossing.com/weather-api)
   - Get your free API key
   - Update `VISUAL_CROSSING_API_KEY` in `.env`

3. **Supabase** (Optional - for favorites):
   - Create a project at [supabase.com](https://supabase.com)
   - Get your project URL and anon key
   - Update `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`

## Troubleshooting

### Port Already in Use

**Docker**:
Edit `docker-compose.yml` and change the port:
```yaml
ports:
  - "3001:3000"  # Change 3001 to any available port
```

**Local Development**:
The dev server will automatically use a different port if 5173 is taken.

### Docker Build Fails

1. Make sure Docker Desktop is running
2. Try rebuilding from scratch:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### Dependencies Installation Issues

If `npm install` fails:

1. Clear npm cache:
```bash
npm cache clean --force
```

2. Delete `node_modules` and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Application Won't Load

1. Check if the server is running:
```bash
# For Docker
docker-compose ps

# For local development
# Check terminal output for any errors
```

2. Verify the correct port:
   - Docker: `http://localhost:3000`
   - Dev server: `http://localhost:5173`

3. Check browser console for errors (F12)

## Project Structure

```
.
├── src/
│   ├── app/                 # Application pages and routes
│   │   ├── api/            # API routes (weather, locations, favorites)
│   │   ├── page.jsx        # Main weather page
│   │   └── details/        # Weather details page
│   ├── components/         # React components
│   │   ├── Weather/        # Weather-specific components
│   │   ├── LocationSearch.jsx
│   │   ├── WeatherMap.jsx
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   └── utils/              # Utility functions
├── docker-compose.yml      # Docker configuration
├── Dockerfile             # Docker build instructions
├── package.json           # Dependencies and scripts
└── .env                   # Environment variables
```

## Next Steps

After getting the application running:

1. Try searching for different locations
2. View detailed weather information
3. Check the 7-day forecast
4. Explore the interactive map
5. (Optional) Set up Supabase for the favorites feature

## Support

If you encounter any issues not covered in this guide:

1. Check the main `README.md` for additional information
2. Verify all prerequisites are installed correctly
3. Ensure Docker Desktop is running (for Docker setup)
4. Check that no other applications are using port 3000
