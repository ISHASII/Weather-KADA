import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./component/Navbar"
import Home from "./pages/Home"
// import Service from "./pages/Service"
// import Weather from "./pages/Weather"
import BookingPage from "./pages/BookingPage"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookingPage />} />
        {/* <Route path="/service" element={<Service />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/contact" element={<BookingPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
