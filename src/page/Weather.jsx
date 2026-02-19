import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSearchedCityWeather,
  fetchIndonesianCitiesWeather,
  clearSearchedCity,
  clearSearchError,
} from "../features/weatherSlice";
import "./Weather.css";

function getIconUrl(iconCode) {
  return `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${iconCode}.png`;
}

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDay(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function groupByCondition(cities) {
  return cities.reduce((groups, city) => {
    const condition = city.main;
    if (!groups[condition]) {
      groups[condition] = [];
    }
    groups[condition].push(city);
    return groups;
  }, {});
}

export default function Weather() {
  // ---- useState: for search input ----
  const [searchInput, setSearchInput] = useState("");

  // ---- React Redux: from Redux store ----
  const dispatch = useDispatch();
  const {
    searchedCity,
    searchLoading,
    searchError,
    citiesList,
    citiesLoading,
    citiesError,
  } = useSelector((state) => state.weather);

  // ---- useEffect: Fetch Indonesian cities weather on component mount ----
  useEffect(() => {
    dispatch(fetchIndonesianCitiesWeather());
  }, [dispatch]);

  // ---- Handler: Process city search form submission ----
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed) {
      dispatch(fetchSearchedCityWeather(trimmed));
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    dispatch(clearSearchedCity());
  };

  //   useEffect
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    if (searchError) {
      dispatch(clearSearchError());
    }
  };

  const groupedCities = groupByCondition(citiesList);

  return (
    <div className="weather-page">
      <div className="weather-rain">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="weather-drop"
            style={{
              left: Math.random() * 100 + "%",
              animationDuration: 0.7 + Math.random() * 1.5 + "s",
              opacity: Math.random(),
            }}
          />
        ))}
      </div>

      <header className="weather-header">
        <h1>Local Weather</h1>
        <p className="weather-subtitle">
          Fast and easy-to-understand weather information
        </p>
      </header>

      <section className="weather-search-section">
        <form className="weather-search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="weather-search-input"
            placeholder="Search city name..."
            value={searchInput}
            onChange={handleInputChange}
          />
          <button type="submit" className="weather-search-btn">
            Search
          </button>
        </form>
        {searchError && <p className="weather-error">{searchError}</p>}
      </section>

      {searchLoading && (
        <div className="weather-loading">
          <div className="weather-spinner"></div>
          <p>Fetching weather data...</p>
        </div>
      )}

      {searchedCity && !searchLoading && (
        <section className="weather-result-section">
          <button className="weather-back-btn" onClick={handleClearSearch}>
            Back to Overview
          </button>

          <div className="weather-main-card">
            <div className="weather-main-top">
              <div className="weather-main-info">
                <h2 className="weather-city-name">
                  {searchedCity.city}, {searchedCity.country}
                </h2>
                <p className="weather-description">
                  {searchedCity.description}
                </p>
              </div>
              <div className="weather-main-temp">
                <img
                  src={getIconUrl(searchedCity.icon)}
                  alt={searchedCity.description}
                  className="weather-icon-large"
                />
                <span className="weather-temp-value">
                  {searchedCity.temp}°C
                </span>
              </div>
            </div>

            <div className="weather-details-grid">
              <div className="weather-detail-item">
                <span className="weather-detail-label">Feels Like</span>
                <span className="weather-detail-value">
                  {searchedCity.feelsLike}°C
                </span>
              </div>
              <div className="weather-detail-item">
                <span className="weather-detail-label">Humidity</span>
                <span className="weather-detail-value">
                  {searchedCity.humidity}%
                </span>
              </div>
              <div className="weather-detail-item">
                <span className="weather-detail-label">Wind Speed</span>
                <span className="weather-detail-value">
                  {searchedCity.windSpeed} m/s
                </span>
              </div>
              <div className="weather-detail-item">
                <span className="weather-detail-label">Pressure</span>
                <span className="weather-detail-value">
                  {searchedCity.pressure} hPa
                </span>
              </div>
              <div className="weather-detail-item">
                <span className="weather-detail-label">Visibility</span>
                <span className="weather-detail-value">
                  {(searchedCity.visibility / 1000).toFixed(1)} km
                </span>
              </div>
              <div className="weather-detail-item">
                <span className="weather-detail-label">Sunrise</span>
                <span className="weather-detail-value">
                  {formatTime(searchedCity.sunrise)}
                </span>
              </div>
              <div className="weather-detail-item">
                <span className="weather-detail-label">Sunset</span>
                <span className="weather-detail-value">
                  {formatTime(searchedCity.sunset)}
                </span>
              </div>
            </div>
          </div>

          {searchedCity.forecast && searchedCity.forecast.length > 0 && (
            <div className="weather-forecast-section">
              <h3 className="weather-forecast-title">5-Day Forecast</h3>
              <div className="weather-forecast-cards">
                {searchedCity.forecast.map((day, index) => (
                  <div className="weather-forecast-card" key={index}>
                    <span className="forecast-day">{formatDay(day.date)}</span>
                    <span className="forecast-date">
                      {formatDate(day.date)}
                    </span>
                    <img
                      src={getIconUrl(day.icon)}
                      alt={day.description}
                      className="forecast-icon"
                    />
                    <span className="forecast-temp">{day.temp}°C</span>
                    <span className="forecast-desc">{day.description}</span>
                    <div className="forecast-extra">
                      <span>💧 {day.humidity}%</span>
                      <span>💨 {day.windSpeed} m/s</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {!searchedCity && !searchLoading && (
        <section className="weather-cities-section">
          <h2 className="weather-cities-title">Weather in Indonesian Cities</h2>

          {citiesLoading && (
            <div className="weather-loading">
              <div className="weather-spinner"></div>
              <p>Loading city weather data...</p>
            </div>
          )}

          {citiesError && (
            <p className="weather-error">
              Failed to load cities: {citiesError}
            </p>
          )}

          {!citiesLoading &&
            Object.entries(groupedCities).map(([condition, cities]) => (
              <div className="weather-group" key={condition}>
                <div className="weather-group-header">
                  <h3 className="weather-group-title">
                    {condition} ({cities.length}{" "}
                    {cities.length === 1 ? "city" : "cities"})
                  </h3>
                </div>

                <div className="weather-table-wrapper">
                  <table className="weather-table">
                    <thead>
                      <tr>
                        <th>City</th>
                        <th>Temp</th>
                        <th>Humidity</th>
                        <th>Wind</th>
                        <th>Condition</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cities.map((city, idx) => (
                        <tr key={idx}>
                          <td className="weather-table-city">
                            <img
                              src={getIconUrl(city.icon)}
                              alt={city.description}
                              className="weather-table-icon"
                            />
                            {city.city}
                          </td>
                          <td className="weather-table-temp">{city.temp}°C</td>
                          <td>{city.humidity}%</td>
                          <td>{city.windSpeed} m/s</td>
                          <td className="weather-table-desc">
                            {city.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
        </section>
      )}
    </div>
  );
}
