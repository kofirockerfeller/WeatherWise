const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Weather API base URL
const weatherApiBaseUrl = 'https://api.openweathermap.org/data/2.5';

// Route to fetch current weather
app.get('/api/current-weather', async (req, res) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const { lat, lon } = req.query;

  try {
    const response = await axios.get(`${weatherApiBaseUrl}/weather`, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: 'metric', // You can choose 'imperial' for Fahrenheit
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching current weather:', error.message);
    res.status(500).json({ error: 'Error fetching current weather' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
