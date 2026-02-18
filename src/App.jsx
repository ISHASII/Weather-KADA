import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./page/Home";
import Service from "./page/Service";
import Weather from "./page/Weather";
import Testimonials from "./page/Testimonials";
import Contact from "./page/Contact";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
