import React from "react";
import "./Service.css";

function Service() {
  const cards = [
    {
      title: "Rain Shaman",
      desc: "Weather Control with an Intelligent Prediction System.",
    },
    {
      title: "Real-Time Data",
      desc: "Monitor Today’s Weather.",
    },
    {
      title: "Forecast",
      desc: "Upcoming Weather Forecast.",
    },
    {
      title: "History",
      desc: "Previous Day Weather History.",
    },
  ];

  return (
    <div className="service-container">
      {/* RAIN EFFECT */}
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

      {/* HEADER */}
      <header className="service-header">
        <h1>Our Services</h1>
        <p>Smart Weather Intelligence System</p>
      </header>

      {/* CARDS */}
      <div className="card-wrapper">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
            <button>View Details →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Service;
