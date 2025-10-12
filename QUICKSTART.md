# Quick Start Guide

Get the weather application running in under 2 minutes!

## The Fastest Way (Docker)

```bash
# 1. Make sure Docker Desktop is running

# 2. Start the application
docker-compose up

# 3. Open your browser
# Go to: http://localhost:3000
```

That's it! The application will automatically:
- Install all dependencies
- Build the project
- Start the server
- Be ready to use

## Alternative: Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open your browser
# Go to: http://localhost:5173
```

## What You Get

- Real-time weather data for any location
- 7-day forecast with hourly details
- Interactive maps
- Air quality and UV index
- Beautiful, responsive design

## Pre-Configured Features

The application comes with:
- Demo weather API keys (replace with your own for production)
- All dependencies bundled
- Zero configuration needed
- Offline capability

## Need Help?

- See `SETUP.md` for detailed instructions
- See `README.md` for full documentation
- Check Docker is running if using Docker

## Common Issues

**Port 3000 already in use?**
Edit `docker-compose.yml` and change the port to 3001 or any available port.

**Docker not working?**
Make sure Docker Desktop is installed and running.

**Want to customize?**
Check `.env` file for API keys and configuration options.
