import React, { useState } from "react";
import "./index.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({Temperature:"",Humidity:"",Condition:"",'Wind speed':""});
  const [loading, setLoading] = useState(false);


  const fetchWeather = async () => {
  const cityName = city.trim().toLowerCase();
  if (!cityName) return;

  setLoading(true);
  //setWeatherData(null);

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=e1d17fd927164cbcbc243812240405&q=${cityName}`
    );

     const data = await response.json();
    //console.log(response);

    const obj={
          Temperature:data.current.temp_c,
          Humidity:data.current.humidity,
          Condition:data.current.condition.text,
          'Wind speed':data.current.wind_kph
        }

    // 1. API returned internal error object
    // if (data.error) {
    //   alert("Failed to fetch weather data");
    //   setLoading(false);
    //   return;
    // }

    // 2. INVALID CITY CHECK – WeatherAPI sometimes returns fallback cities
    // const returnedCity = data.location.name.toLowerCase();

    // If returned city doesn't include the search term, treat as invalid
    // if (!returnedCity.includes(cityName)) {
    //   alert("Failed to fetch weather data");
    //   setLoading(false);
    //   return;
    // }

    // 3. Valid city
    setWeatherData(obj);
  } catch (error) {
    alert("Failed to fetch weather data");
    console.error("Error fetching weather data:", error);
  } finally {
    setLoading(false);
  }
}

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

      {weatherData?.Temperature === '' && <p>Loading data...</p>}

      {weatherData.Temperature !== '' && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.Temperature} °C</p>
          </div>

          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.Humidity} %</p>
          </div>

          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.Condition}</p>
          </div>

          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData["Wind speed"]} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
