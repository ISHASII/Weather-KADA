import React from "react";
import "./Service.css";

function Service() {
  const cards = [
    {
      title: "Rain Shaman",
      desc: "Weather Control with an Intelligent Prediction System.",
    },
    {
      title: "Real-Time Dat",
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

      <header className="service-header">
        <div className="container">
          <h1>Natanegara Langit</h1>
          <p>We Predicted The Sky Before It Moves</p>
        </div>
      </header>

      <div className="container">
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
    </div>
  );
}

export default Service;
