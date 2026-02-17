<<<<<<< HEAD
import Service from "./pages/Service"
import BookingPage from "./pages/BookingPage"

function App() {
  return <BookingPage />
=======
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Service from "./pages/Service";
import Weather from "./pages/Weather";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
>>>>>>> 28eb883ca7205d374107efeeb26775d07b177f35
}

export default App;
