import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Service.css";

function Service() {
  const [selectedCard, setSelectedCard] = useState(null);
  const closeBtnRef = useRef(null);
  const navigate = useNavigate();

  const cards = [
    {
      title: "Atmospheric Event Safeguarding",
      desc: "Professional Weather Protection for Your Events.",
      detail:
        "We provide dedicated weather safeguarding services to ensure your event runs smoothly without disruption from rain, including:",
      price: "💵 Rp1.500.000 – Rp2.000.000 / event",
      list: [
        "Outdoor concerts & festivals.",
        "Weddings & private events.",
        "Product launches.",
        "Government functions.",
        "Film & television productions.",
      ],
    },
    {
      title: "Strategic Weather Assessment",
      desc: "Weather Risk Analysis & Event Planning Consultation.",
      detail:
        "Make informed decisions with our strategic weather assessment services.",
      price: "💵 Rp2.500.000 – Rp3.000.000 / event",
      list: [
        "Comprehensive weather risk analysis based on your event location, season, and time frame.",
        "Optimal scheduling recommendations, helping you select the best date and time to minimize weather-related disruptions.",
        "Pre-event consultation sessions to support smarter planning, logistics alignment, and contingency preparation.",
        "Customized weather insights tailored to your event scale, audience size, and operational needs.",
        "Ideal for clients who prioritize precision, reliability, and proactive coordination to ensure a seamless event experience.",
      ],
    },
    {
      title: "Localized Atmospheric Intervention",
      desc: "Location-Based Weather Management.",
      detail:
        "We apply adaptive techniques tailored to each venue’s unique conditions, including:",
      price: "💵 Rp3.500.000 – Rp4.000.000 / event",
      list: [
        "Geographic condition assessment, evaluating terrain, elevation, and surrounding environments.",
        "Local wind pattern analysis to anticipate atmospheric movement affecting your event area.",
        "Regional weather history evaluation to identify recurring climate trends and risks.",
        "Site-specific intervention strategies, customized for each location to maximize effectiveness.",
        "A fully tailored operational approach, ensuring optimal results through precise, location-driven solutions.",
      ],
    },
    {
      title: "Premium Confidential Service",
      desc: "Exclusive & Discreet Event Handling.",
      detail: "Designed for high-profile or sensitive occasions:",
      price: "💵 Rp4.500.000 – Rp5.000.000 / event",
      list: [
        "Dedicated core team support.",
        "Strict client confidentiality.",
        "No public documentation.",
        "Limited coordination with authorized parties only.",
        "Perfect for VIP events requiring privacy and professionalism.",
      ],
    },
  ];

  useEffect(() => {
    if (!selectedCard) return;

    const onKey = (e) => {
      if (e.key === "Escape") setSelectedCard(null);
    };

    document.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();

    return () => document.removeEventListener("keydown", onKey);
  }, [selectedCard]);

  return (
    <div className="service-container">
      {/* RAIN */}
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
        <h1>Our Services</h1>
        <p>Smart Weather Intelligence System</p>
      </header>

      <div className="card-wrapper">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCard(card);
              }}
            >
              View Details →
            </button>
          </div>
        ))}
      </div>

      {/* POPUP */}
      {selectedCard && (
        <div
          className="popup-overlay"
          onClick={() => setSelectedCard(null)}
          role="presentation"
        >
          <div
            className="popup-box"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <h2 id="service-modal-title">{selectedCard.title}</h2>
            <p>{selectedCard.detail}</p>

            {/* render list dynamically and prefer explicit price field (fallback to list) */}
            {(() => {
              const priceFromList = selectedCard.list.find((it) =>
                /(^💵|Rp\b|^\$)/i.test(it),
              );
              const priceItem = selectedCard.price ?? priceFromList;
              const items = selectedCard.price
                ? selectedCard.list
                : selectedCard.list.filter((it) => it !== priceFromList);

              return (
                <>
                  <ul>
                    {items.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                  <div className="popup-actions">
                    <button
                      className="popup-book"
                      onClick={() => {
                        setSelectedCard(null);
                        navigate("/contact");
                      }}
                    >
                      Book Now
                    </button>
                    {priceItem && (
                      <div className="popup-price">{priceItem}</div>
                    )}
                  </div>
                </>
              );
            })()}

            <button
              ref={closeBtnRef}
              className="popup-close"
              onClick={() => setSelectedCard(null)}
              aria-label="Close dialog"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Service;
