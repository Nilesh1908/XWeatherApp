import React, { useState } from "react";
import "./index.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
  //const cityName = city.trim();
  if (!city) return;

  setLoading(true);
  setWeatherData(null);

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=e1d17fd927164cbcbc243812240405&q=${city}`
    );

    if (!response.ok) {
      // Response not ok (404, 401, etc.)
      throw new Error("City not found or invalid API key");
    }

    const data = await response.json();
    setWeatherData(data);
  } catch (error) {
    console.error(error);
    alert("Failed to fetch weather data");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container">
      <h2>Weather App</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading && <p>Loading data…</p>}

      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c} °C</p>
          </div>

          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity} %</p>
          </div>

          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>

          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
