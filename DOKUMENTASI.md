# 📋 Dokumentasi Project Weather-KADA

## 📖 Deskripsi Project

**Weather-KADA** adalah aplikasi web informasi cuaca berbasis React yang menyediakan prediksi cuaca real-time untuk kota-kota di Indonesia. Aplikasi ini dibangun menggunakan teknologi modern seperti React, Redux Toolkit, dan Vite sebagai build tool.

---

## 📊 Penilaian Fitur

| Fitur                    | Poin   | Status |
| ------------------------ | ------ | ------ |
| React Redux              | 4      | ✅     |
| Redux Thunk              | 5      | ✅     |
| 1 Person, 1 Page         | 3      | ✅     |
| useEffect                | 3      | ✅     |
| useState                 | 3      | ✅     |
| **Subtotal Wajib**       | **18** |        |
| _Optional - Flexbox_     | 3      | ✅     |
| _Optional - Responsive_  | 2      | ✅     |
| _Optional - Stylish CSS_ | 2      | ✅     |
| **Total Maksimal**       | **25** |        |

---

## 1️⃣ React Redux (4 Poin)

### Penjelasan

React Redux adalah library official untuk menghubungkan Redux dengan React. Dalam project ini, Redux digunakan untuk **state management global** khususnya untuk menyimpan dan mengelola data cuaca dari API.

### Implementasi

#### a. Konfigurasi Store (`src/app/store.js`)

```javascript
import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weatherSlice";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export default store;
```

#### b. Provider di Root Application (`src/main.jsx`)

```javascript
import { Provider } from "react-redux";
import store from "./app/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
```

#### c. Penggunaan useSelector & useDispatch (`src/page/Weather.jsx`)

```javascript
import { useSelector, useDispatch } from "react-redux";

export default function Weather() {
  const dispatch = useDispatch();

  // Mengambil state dari Redux store
  const {
    searchedCity,
    searchLoading,
    searchError,
    citiesList,
    citiesLoading,
    citiesError,
  } = useSelector((state) => state.weather);

  // Dispatch action
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchSearchedCityWeather(trimmed));
  };
}
```

### Lokasi File:

- [src/app/store.js](src/app/store.js) - Konfigurasi Redux Store
- [src/main.jsx](src/main.jsx) - Provider wrapper
- [src/page/Weather.jsx](src/page/Weather.jsx) - Penggunaan hooks Redux

---

## 2️⃣ Redux Thunk (5 Poin)

### Penjelasan

Redux Thunk adalah middleware yang memungkinkan kita untuk menulis **action creators** yang return function (bukan object). Hal ini penting untuk menangani operasi **asynchronous** seperti fetch data dari API.

Dalam project ini, kita menggunakan `createAsyncThunk` dari Redux Toolkit yang merupakan abstraksi modern dari Redux Thunk.

### Implementasi (`src/features/weatherSlice.js`)

#### a. Async Thunk untuk Mencari Cuaca Kota

```javascript
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSearchedCityWeather = createAsyncThunk(
  "weather/fetchSearchedCity",
  async (cityName, { rejectWithValue }) => {
    try {
      // Fetch data cuaca dari OpenWeatherMap API
      const weatherRes = await fetch(
        `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=en`,
      );

      if (!weatherRes.ok) {
        throw new Error("City not found. Please check the city name.");
      }

      const weatherData = await weatherRes.json();

      // Fetch forecast data
      const forecastRes = await fetch(
        `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=en`,
      );
      const forecastData = await forecastRes.json();

      // Return processed data
      return {
        city: weatherData.name,
        temp: Math.round(weatherData.main.temp),
        humidity: weatherData.main.humidity,
        // ... data lainnya
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
```

#### b. Async Thunk untuk Mengambil Data Kota-kota Indonesia

```javascript
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
          // ... data lainnya
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
```

#### c. ExtraReducers untuk Handle State

```javascript
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
  extraReducers: (builder) => {
    builder
      // Handle pending state (loading)
      .addCase(fetchSearchedCityWeather.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      // Handle fulfilled state (success)
      .addCase(fetchSearchedCityWeather.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchedCity = action.payload;
      })
      // Handle rejected state (error)
      .addCase(fetchSearchedCityWeather.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload;
      });
  },
});
```

### Lokasi File:

- [src/features/weatherSlice.js](src/features/weatherSlice.js) - Implementasi lengkap Redux Thunk

---

## 3️⃣ 1 Person, 1 Page (3 Poin)

### Penjelasan

Setiap anggota kelompok bertanggung jawab untuk membuat minimal satu halaman dalam aplikasi.

### Pembagian Halaman

| No  | Halaman      | File                        | Deskripsi                               |
| --- | ------------ | --------------------------- | --------------------------------------- |
| 1   | Home         | `src/page/Home.jsx`         | Landing page dengan statistik dan fitur |
| 2   | Weather      | `src/page/Weather.jsx`      | Halaman utama info cuaca real-time      |
| 3   | Service      | `src/page/Service.jsx`      | Daftar layanan yang ditawarkan          |
| 4   | Testimonials | `src/page/Testimonials.jsx` | Testimoni pengguna dengan slider        |
| 5   | Contact      | `src/page/Contact.jsx`      | Form booking/pemesanan layanan          |

### Lokasi File Halaman:

- [src/page/Home.jsx](src/page/Home.jsx)
- [src/page/Weather.jsx](src/page/Weather.jsx)
- [src/page/Service.jsx](src/page/Service.jsx)
- [src/page/Testimonials.jsx](src/page/Testimonials.jsx)
- [src/page/Contact.jsx](src/page/Contact.jsx)

---

## 4️⃣ useEffect (3 Poin)

### Penjelasan

`useEffect` adalah React Hook yang memungkinkan kita melakukan **side effects** di functional components, seperti fetching data, subscriptions, atau manipulasi DOM.

### Implementasi

#### a. Fetch Data saat Component Mount (`src/page/Weather.jsx`)

```javascript
useEffect(() => {
  // Fetch data cuaca kota-kota Indonesia saat component pertama kali render
  dispatch(fetchIndonesianCitiesWeather());
}, [dispatch]); // Dependency array
```

#### b. Event Listener untuk Scroll (`src/component/Navbar.jsx`)

```javascript
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 20);
  window.addEventListener("scroll", onScroll);

  // Cleanup function
  return () => window.removeEventListener("scroll", onScroll);
}, []);
```

#### c. Keyboard Event untuk Modal (`src/page/Service.jsx`)

```javascript
useEffect(() => {
  if (!selectedCard) return;

  const onKey = (e) => {
    if (e.key === "Escape") setSelectedCard(null);
  };

  document.addEventListener("keydown", onKey);
  closeBtnRef.current?.focus();

  // Cleanup: remove event listener
  return () => document.removeEventListener("keydown", onKey);
}, [selectedCard]);
```

#### d. Counter Animation dengan requestAnimationFrame (`src/page/Home.jsx`)

```javascript
function useCounter(end, duration = 2200, started = false) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!started) return;
    let t0 = null;

    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setVal(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [end, duration, started]);

  return val;
}
```

#### e. Dynamic Navbar Height (`src/component/Navbar.jsx`)

```javascript
useEffect(() => {
  const update = () => {
    if (!navRef.current) return;
    const h = navRef.current.getBoundingClientRect().height;
    document.documentElement.style.setProperty("--navbar-height", `${h}px`);
  };
  update();
  window.addEventListener("resize", update);
  return () => window.removeEventListener("resize", update);
}, [scrolled]);
```

### Lokasi File dengan useEffect:

- [src/page/Weather.jsx](src/page/Weather.jsx)
- [src/page/Service.jsx](src/page/Service.jsx)
- [src/page/Home.jsx](src/page/Home.jsx)
- [src/component/Navbar.jsx](src/component/Navbar.jsx)

---

## 5️⃣ useState (3 Poin)

### Penjelasan

`useState` adalah React Hook yang memungkinkan kita menambahkan **state lokal** ke functional components.

### Implementasi

#### a. State untuk Form Input (`src/page/Weather.jsx`)

```javascript
const [searchInput, setSearchInput] = useState("");

const handleInputChange = (e) => {
  setSearchInput(e.target.value);
};
```

#### b. State untuk Modal/Popup (`src/page/Service.jsx`)

```javascript
const [selectedCard, setSelectedCard] = useState(null);

// Toggle modal
<button onClick={() => setSelectedCard(card)}>See Details</button>;
```

#### c. State untuk Navigation (`src/component/Navbar.jsx`)

```javascript
const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
const [scrolled, setScrolled] = useState(false); // Scroll state

<button onClick={() => setIsOpen((v) => !v)}>Toggle Menu</button>;
```

#### d. State untuk Counter Animation (`src/page/Home.jsx`)

```javascript
function useCounter(end, duration = 2200, started = false) {
  const [val, setVal] = useState(0);
  // ...animation logic
  return val;
}
```

### Lokasi File dengan useState:

- [src/page/Weather.jsx](src/page/Weather.jsx)
- [src/page/Service.jsx](src/page/Service.jsx)
- [src/page/Home.jsx](src/page/Home.jsx)
- [src/page/Contact.jsx](src/page/Contact.jsx)
- [src/component/Navbar.jsx](src/component/Navbar.jsx)

---

## 🎨 Optional Features

### A. Flexbox (3 Poin)

#### Penjelasan

Flexbox digunakan secara ekstensif untuk mengatur layout yang fleksibel dan responsive.

#### Contoh Implementasi (`src/page/Weather.css`)

```css
/* Search form menggunakan flexbox */
.weather-search-form {
  display: flex;
  gap: 0;
  border-radius: 50px;
  overflow: hidden;
}

.weather-search-input {
  flex: 1; /* Mengambil sisa ruang yang tersedia */
}

/* Loading state dengan flexbox */
.weather-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

/* Main card layout */
.weather-main-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
```

#### Lokasi Penggunaan Flexbox:

- `src/page/Weather.css` - Layout kartu cuaca, form pencarian
- `src/page/Service.css` - Layout container dan modal
- `src/page/Testimonials.css` - Layout statistik dan kartu testimoni
- `src/page/contact.css` - Layout form
- `src/component/Navbar.css` - Layout navigasi

---

### B. Responsive Design (2 Poin)

#### Penjelasan

Aplikasi dibuat responsive dengan menggunakan **CSS Media Queries** untuk berbagai ukuran layar.

#### Implementasi Media Queries

##### Navbar (`src/component/Navbar.css`)

```css
@media (max-width: 960px) {
  .navbar-links {
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 12px 20px;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 10px 16px;
  }
}

@media (max-width: 360px) {
  .brand-text {
    font-size: 15px;
  }
}
```

##### Weather Page (`src/page/Weather.css`)

```css
@media (max-width: 768px) {
  .weather-main-top {
    flex-direction: column;
    align-items: center;
  }

  .weather-forecast-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .weather-forecast-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 360px) {
  .weather-forecast-grid {
    grid-template-columns: 1fr;
  }
}
```

##### Service Page (`src/page/Service.css`)

```css
@media (max-width: 1024px) {
  .card-wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .card-wrapper {
    grid-template-columns: 1fr;
  }
}
```

##### Home Page (`src/page/Home.jsx` - Inline CSS)

```css
@media (max-width: 1024px) {
  .nl-two-col {
    grid-template-columns: 1fr !important;
  }
  .nl-stats {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

@media (max-width: 640px) {
  .nl-stats {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  .nl-industries {
    grid-template-columns: 1fr !important;
  }
}
```

#### Breakpoints yang Digunakan:

| Breakpoint | Target Device      |
| ---------- | ------------------ |
| 1024px     | Tablet landscape   |
| 960px      | Tablet             |
| 768px      | Tablet portrait    |
| 640px      | Large mobile       |
| 500px      | Mobile             |
| 480px      | Small mobile       |
| 420px      | Extra small mobile |
| 360px      | Very small mobile  |

---

### C. Stylish CSS (2 Poin)

#### Penjelasan

Aplikasi menggunakan berbagai teknik CSS modern untuk tampilan yang menarik.

#### 1. Gradient Backgrounds

```css
.weather-page {
  background: linear-gradient(180deg, #4facfe, #e8f3ff);
}

.weather-search-btn {
  background: linear-gradient(135deg, #2563eb, #1e40af);
}
```

#### 2. Glass Morphism dengan Backdrop Filter

```css
.card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
```

#### 3. Custom Animations

##### Rain Effect Animation

```css
@keyframes weatherFall {
  0% {
    transform: translateY(-100px);
  }
  100% {
    transform: translateY(120vh);
  }
}

.weather-drop {
  animation: weatherFall linear infinite;
}
```

##### Fade-in Animation

```css
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nl-anim-1 {
  animation: fadeUp 0.85s ease both;
}
```

##### Bounce Animation

```css
@keyframes scrollBounce {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(10px);
  }
}
```

#### 4. Hover Effects & Transitions

```css
.card {
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-8px);
}

.nl-card-hover:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.13);
}
```

#### 5. Loading Spinner

```css
.weather-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

#### 6. Text Shadow & Visual Effects

```css
.weather-header h1 {
  font-size: clamp(32px, 5vw, 52px);
  color: #ffffff;
  font-weight: 700;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}
```

---

## 🗂️ Struktur Project

```
Weather-KADA/
├── public/
├── src/
│   ├── app/
│   │   └── store.js          # Redux Store Configuration
│   ├── assets/
│   ├── component/
│   │   ├── Navbar.jsx        # Navigation Component
│   │   └── Navbar.css
│   ├── features/
│   │   └── weatherSlice.js   # Redux Slice (Thunk Actions)
│   ├── page/
│   │   ├── Home.jsx          # Landing Page
│   │   ├── Home.css
│   │   ├── Weather.jsx       # Weather Info Page
│   │   ├── Weather.css
│   │   ├── Service.jsx       # Services Page
│   │   ├── Service.css
│   │   ├── Testimonials.jsx  # Testimonials Page
│   │   ├── Testimonials.css
│   │   ├── Contact.jsx       # Contact/Booking Page
│   │   └── contact.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx              # Entry Point + Redux Provider
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## 🚀 Cara Menjalankan Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview
```

---

## 📦 Dependencies Utama

| Package          | Versi | Fungsi                          |
| ---------------- | ----- | ------------------------------- |
| react            | ^19.x | Library UI                      |
| react-dom        | ^19.x | React DOM renderer              |
| react-redux      | ^9.x  | React bindings untuk Redux      |
| @reduxjs/toolkit | ^2.x  | Redux modern dengan Thunk       |
| react-router-dom | ^7.x  | Routing                         |
| swiper           | ^11.x | Slider/Carousel untuk testimoni |
| vite             | ^6.x  | Build tool                      |

---

## 👥 Pembagian Tugas Tim

| No  | Anggota   | Halaman          | Fitur Utama                      |
| --- | --------- | ---------------- | -------------------------------- |
| 1   | Anggota 1 | Home.jsx         | Landing page, statistik, animasi |
| 2   | Anggota 2 | Weather.jsx      | Redux, Thunk, API cuaca          |
| 3   | Anggota 3 | Service.jsx      | Modal, useEffect keyboard        |
| 4   | Anggota 4 | Testimonials.jsx | Swiper slider, rain effect       |
| 5   | Anggota 5 | Contact.jsx      | Form booking                     |

---

## 📝 Catatan Tambahan

1. **API yang Digunakan**: OpenWeatherMap API untuk data cuaca real-time
2. **State Management**: Redux Toolkit dengan createAsyncThunk untuk async operations
3. **Routing**: React Router DOM v7 untuk navigasi antar halaman
4. **Styling**: CSS murni dengan pendekatan component-scoped
5. **Build Tool**: Vite untuk development dan production build yang cepat

---

_Dokumentasi ini dibuat untuk keperluan penilaian mata kuliah._
