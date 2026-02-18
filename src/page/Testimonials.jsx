<<<<<<< HEAD
import React from "react";
import "./Testimonials.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Mas Amba",
    image: "https://i.pravatar.cc/100?img=1",
    text: "Layanan prediksi cuaca sangat akurat dan membantu saya dalam merencanakan perjalanan.",
  },
  {
    name: "Mulyono",
    image: "https://i.pravatar.cc/100?img=2",
    text: "Informasi sangat lengkap dan mudah dipahami. Sangat direkomendasikan.",
  },
  {
    name: "Jack",
    image: "https://i.pravatar.cc/100?img=3",
    text: "Website responsif dan cepat. Saya sangat puas dengan fitur yang tersedia.",
  },
  {
    name: "Mas Wowo",
    image: "https://i.pravatar.cc/100?img=4",
    text: "Aplikasi sangat membantu dalam aktivitas harian saya.",
  },
];

const Testimonials = () => {
  return (
    <div className="testimonial-container">

      {/* Rain Effect */}
      <div className="rain">
        {Array.from({ length: 120 }).map((_, i) => (
          <div
            key={i}
            className="drop"
            style={{
              left: Math.random() * 100 + "%",
              animationDuration: 0.7 + Math.random() * 1.5 + "s",
              opacity: Math.random(),
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="testimonial-header fade-in">
        <h1>What Our Users Say</h1>
        <p>Trusted by thousands of users across Indonesia</p>
      </div>

      {/* STATISTICS */}
      <div className="testimonial-stats fade-in">
        <div>
          <h2>⭐ 4.9/5</h2>
          <span>Average Rating</span>
        </div>
        <div>
          <h2>10.000+</h2>
          <span>Active Users</span>
        </div>
        <div>
          <h2>500K+</h2>
          <span>Weather Predictions</span>
        </div>
      </div>

      {/* SLIDER */}
      <div className="testimonial-slider fade-in">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={3}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card">
                <div className="testimonial-profile">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <span>⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
                <p>{item.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
=======
﻿import React from "react";

export default function Testimonials() {
  const items = [
    { name: "Alya", text: "Accurate forecasts — saved our outdoor event." },
    { name: "Riko", text: "Reliable and timely alerts. Highly recommended." },
    { name: "Sari", text: "Professional team and excellent service." },
  ];

  return (
    <div style={{ padding: "96px 24px", textAlign: "center" }}>
      <h1 style={{ marginBottom: 8 }}>Testimonials</h1>
      <p style={{ color: "#475569", marginBottom: 28 }}>
        What our clients say about Natanegara Langit
      </p>

      <div
        style={{
          display: "grid",
          gap: 20,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          maxWidth: 980,
          margin: "0 auto",
        }}
      >
        {items.map((t, i) => (
          <div
            key={i}
            style={{
              padding: 18,
              borderRadius: 12,
              background: "#ffffff",
              boxShadow: "0 8px 30px rgba(2,6,23,0.08)",
            }}
          >
            <p style={{ fontStyle: "italic", color: "#0B1426" }}>“{t.text}”</p>
            <div style={{ marginTop: 12, fontWeight: 700, color: "#0B1426" }}>
              {t.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
>>>>>>> da205918a8a83b186b294fc4aab539fb99ca84b0
