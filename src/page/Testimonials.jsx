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
