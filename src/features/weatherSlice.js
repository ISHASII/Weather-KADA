import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "30a8c312a1e1294705ec7d3c10403e4c";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const INDONESIAN_CITIES = [
  "Jakarta",
  "Surabaya",
  "Bandung",
  "Medan",
  "Semarang",
  "Makassar",
  "Palembang",
  "Denpasar",
  "Yogyakarta",
  "Manado",
  "Balikpapan",
  "Malang",
  "Pontianak",
  "Padang",
  "Jayapura",
  "Banjarmasin",
  "Kupang",
  "Mataram",
  "Pekanbaru",
  "Ambon",
];

export const fetchSearchedCityWeather = createAsyncThunk(
  "weather/fetchSearchedCity",
  async (cityName, { rejectWithValue }) => {
    try {
      const weatherRes = await fetch(
        `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=en`,
      );
      if (!weatherRes.ok) {
        throw new Error("City not found. Please check the city name.");
      }
      const weatherData = await weatherRes.json();

      const forecastRes = await fetch(
        `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=en`,
      );
      const forecastData = await forecastRes.json();

      const dailyForecasts = forecastData.list
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .slice(0, 5);

      return {
        city: weatherData.name,
        country: weatherData.sys.country,
        temp: Math.round(weatherData.main.temp),
        feelsLike: Math.round(weatherData.main.feels_like),
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        pressure: weatherData.main.pressure,
        visibility: weatherData.visibility,
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        main: weatherData.weather[0].main,
        sunrise: weatherData.sys.sunrise,
        sunset: weatherData.sys.sunset,
        forecast: dailyForecasts.map((item) => ({
          date: item.dt_txt.split(" ")[0],
          temp: Math.round(item.main.temp),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          main: item.weather[0].main,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
        })),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchIndonesianCitiesWeather = createAsyncThunk(
  "weather/fetchIndonesianCities",
  async (_, { rejectWithValue }) => {
    try {
      const promises = INDONESIAN_CITIES.map(async (city) => {
        const res = await fetch(
          `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`,
        );
        const data = await res.json();
        return {
          city: data.name,
          temp: Math.round(data.main.temp),
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          main: data.weather[0].main,
        };
      });

      const results = await Promise.allSettled(promises);

      return results
        .filter((r) => r.status === "fulfilled")
        .map((r) => r.value);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    searchedCity: null,
    searchLoading: false,
    searchError: null,
    citiesList: [],
    citiesLoading: false,
    citiesError: null,
  },
  reducers: {
    clearSearchedCity: (state) => {
      state.searchedCity = null;
      state.searchError = null;
    },

    clearSearchError: (state) => {
      state.searchError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchedCityWeather.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(fetchSearchedCityWeather.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchedCity = action.payload;
      })
      .addCase(fetchSearchedCityWeather.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload;
      })
      .addCase(fetchIndonesianCitiesWeather.pending, (state) => {
        state.citiesLoading = true;
        state.citiesError = null;
      })
      .addCase(fetchIndonesianCitiesWeather.fulfilled, (state, action) => {
        state.citiesLoading = false;
        state.citiesList = action.payload;
      })
      .addCase(fetchIndonesianCitiesWeather.rejected, (state, action) => {
        state.citiesLoading = false;
        state.citiesError = action.payload;
      });
  },
});

export const { clearSearchedCity, clearSearchError } = weatherSlice.actions;

export default weatherSlice.reducer;
