# Natanegara Langit — Weather-KADA

## 📌 Ringkasan singkat

Natanegara Langit (project: Weather-KADA) menampilkan informasi cuaca real‑time dan prakiraan beberapa hari menggunakan OpenWeatherMap API. Aplikasi menggunakan state global (Redux Toolkit + createAsyncThunk), hooks React (`useState`, `useEffect`), serta CSS modern untuk tampilan responsif dan menarik.

---

## 📂 Daftar Isi

- Deskripsi singkat
- Cara menjalankan
- Struktur project
- Implementasi fitur (dengan referensi file)
  - React Redux (4 poin)
  - Redux Thunk (5 poin)
  - 1 person — 1 page (3 poin)
  - useEffect (3 poin)
  - useState (3 poin)
- Fitur opsional
  - Flexbox (3 poin)
  - Responsif (2 poin)
  - Stylish CSS (2 poin)
- Checklist penilaian

---

## 🚀 Cara menjalankan

```bash
npm install
npm run dev
```

---

## 🧭 Struktur project (penting)

- `src/app/store.js` — konfigurasi Redux store
- `src/features/weatherSlice.js` — slice + async thunks
- `src/page/Weather.jsx` — halaman utama cuaca (search, hasil, forecast)
- `src/page/Home.jsx`, `Service.jsx`, `Testimonials.jsx`, `Contact.jsx` — halaman lainnya
- `src/component/Navbar.jsx` — navbar dan logo
- `src/assets/image/logo-1.png` — logo proyek

---

## 🔧 Implementasi poin penilaian (detail)

### 1) React Redux — 4 poin ✅

- Digunakan `react-redux` + `@reduxjs/toolkit` untuk state global.
- File utama: `src/app/store.js` (Provider di `src/main.jsx`).
- Contoh penggunaan di komponen:

```js
const dispatch = useDispatch();
const { searchedCity } = useSelector((state) => state.weather);
```

- Lokasi: `src/app/store.js`, `src/main.jsx`, `src/page/Weather.jsx`.

---

### 2) Redux Thunk — 5 poin ✅

- Menggunakan `createAsyncThunk` dari Redux Toolkit untuk operasi async (fetch API).
- File: `src/features/weatherSlice.js` — berisi `fetchSearchedCityWeather` dan `fetchIndonesianCitiesWeather`.
- Contoh (ringkas):

```js
export const fetchSearchedCityWeather = createAsyncThunk(
  "weather/fetchSearchedCity",
  async (cityName, { rejectWithValue }) => {/
  },
);
```

- Hasil diproses di `extraReducers` untuk meng-handle `pending` / `fulfilled` / `rejected`.

---

### 3) 1 person — 1 page (3 poin) ✅

- Pembagian halaman sudah tersedia (satu file = satu halaman):
  - `Home.jsx` — Landing
  - `Weather.jsx` — Fitur utama (Redux + API)
  - `Service.jsx` — Layanan
  - `Testimonials.jsx` — Slider & testimoni
  - `Contact.jsx` — Form booking
- Pastikan setiap anggota mengerjakan/menjelaskan satu halaman saat presentasi.

---

### 4) useEffect — 3 poin ✅

- `useEffect` dipakai untuk:
  - Fetch data saat mount (`Weather.jsx` memanggil `fetchIndonesianCitiesWeather`).
  - Menambah/bersihkan event listener (contoh: scroll di `Navbar.jsx`, keyboard handler di `Service.jsx`).
  - Animasi counter dengan `requestAnimationFrame` (`Home.jsx`).
- Contoh:

```js
useEffect(() => {
  dispatch(fetchIndonesianCitiesWeather());
}, [dispatch]);
```

---

### 5) useState — 3 poin ✅

- `useState` digunakan untuk state lokal seperti form input, toggle modal, dan mobile menu.
- Contoh di `Weather.jsx`:

```js
const [searchInput, setSearchInput] = useState("");
```

- Lalu digunakan untuk controlled input dan handler.

---

## ✨ Fitur Opsional (implementasi)

### Flexbox — 3 poin ✅

- Banyak layout menggunakan Flexbox (contoh: `.weather-search-form`, `.navbar-container`, `.sidebar-nav`).
- File: `src/page/Weather.css`, `src/component/Navbar.css`, `src/page/Service.css`.

### Responsif — 2 poin ✅

- Media queries tersedia untuk breakpoints umum (1024, 768, 480, 360px).
- File yang relevan: `Navbar.css`, `Weather.css`, `Service.css`, `Home.css`.

### Stylish CSS — 2 poin ✅

- Efek yang dipakai: gradient background, glassmorphism, shadow, animasi rain & spinner.
- Contoh lokasi: `Weather.css` (rain + spinner), `Service.css` (cards + glass effect), `Home.css` (animasi).

---

## ✅ Checklist Penilaian (total 25 poin)

| Item               | Poin | Implementasi                                  |
| ------------------ | ---: | :-------------------------------------------- |
| React Redux        |    4 | ✅ `src/app/store.js`, `Weather.jsx`          |
| Redux Thunk        |    5 | ✅ `src/features/weatherSlice.js`             |
| 1 person, 1 page   |    3 | ✅ setiap halaman di `src/page/`              |
| useEffect          |    3 | ✅ `Weather.jsx`, `Navbar.jsx`, `Service.jsx` |
| useState           |    3 | ✅ `Weather.jsx`, `Service.jsx`, `Navbar.jsx` |
| Flexbox (ops.)     |    3 | ✅ layout flex di beberapa file               |
| Responsive (ops.)  |    2 | ✅ media queries tersedia                     |
| Stylish CSS (ops.) |    2 | ✅ gradients, glass, animasi                  |
