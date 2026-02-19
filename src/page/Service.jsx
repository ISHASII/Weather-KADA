import React, { useState, useEffect, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import "./Service.css"

const services = [
  {
    title: "Atmospheric Event Safeguarding",
    desc: "Professional Weather Protection for Your Events.",
    detail:
      "We provide dedicated weather safeguarding services to ensure your event runs smoothly without disruption from rain, including:",
    price: "Rp1.500.000 – Rp2.000.000 / event",
    list: [
      "Outdoor concerts & festivals",
      "Weddings & private events",
      "Product launches",
      "Government functions",
      "Film & television productions",
    ],
  },
  {
    title: "Strategic Weather Assessment",
    desc: "Weather Risk Analysis & Event Planning Consultation.",
    detail:
      "Make informed decisions with our strategic weather assessment services.",
    price: "Rp2.500.000 – Rp3.000.000 / event",
    list: [
      "Comprehensive weather risk analysis",
      "Optimal scheduling recommendations",
      "Pre-event consultation sessions",
      "Customized weather insights",
      "Smart contingency preparation",
    ],
  },
  {
    title: "Localized Atmospheric Intervention",
    desc: "Location-Based Weather Management.",
    detail: "Adaptive techniques tailored to each venue’s unique conditions.",
    price: "Rp3.500.000 – Rp4.000.000 / event",
    list: [
      "Geographic condition assessment",
      "Local wind pattern analysis",
      "Regional weather history evaluation",
      "Site-specific intervention strategies",
      "Precision-driven operational execution",
    ],
  },
  {
    title: "Premium Confidential Service",
    desc: "Exclusive & Discreet Event Handling.",
    detail:
      "Designed for high-profile or sensitive occasions requiring full discretion.",
    price: "Rp4.500.000 – Rp5.000.000 / event",
    list: [
      "Dedicated core team support",
      "Strict client confidentiality",
      "No public documentation",
      "Limited authorized coordination",
      "VIP-level professionalism",
    ],
  },
]

function Service() {
  const [activeService, setActiveService] = useState(null)
  const closeBtnRef = useRef(null)
  const navigate = useNavigate()

  const closeModal = useCallback(() => {
    setActiveService(null)
  }, [])

  useEffect(() => {
    if (!activeService) return

    document.body.style.overflow = "hidden"

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal()
    }

    document.addEventListener("keydown", handleKeyDown)
    closeBtnRef.current?.focus()

    return () => {
      document.body.style.overflow = "auto"
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeService, closeModal])

  return (
    <section className="service">
      <div className="rain" />

      <header className="service-header">
        <h1>Our Services</h1>
        <p>Smart Weather Intelligence System</p>
      </header>

      <div className="service-grid">
        {services.map((item, index) => (
          <article className="service-card" key={index}>
            {item.badge && <span className="service-badge">{item.badge}</span>}

            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <p className="service-price">{item.price}</p>

            <button
              className="btn-primary"
              onClick={() => setActiveService(item)}
            >
              View Details →
            </button>
          </article>
        ))}
      </div>

      {activeService && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              ref={closeBtnRef}
              className="modal-close"
              onClick={closeModal}
            >
              ✕
            </button>

            <h2>{activeService.title}</h2>
            <p className="modal-desc">{activeService.detail}</p>

            <ul>
              {activeService.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <div className="modal-footer">
              <span className="price">💵 {activeService.price}</span>
              <button
                className="btn-secondary"
                onClick={() => {
                  closeModal()
                  navigate("/contact")
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="rain">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="drop"
            style={{
              left: Math.random() * 100 + "%",
              animationDuration: 1 + Math.random() * 1.5 + "s",
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default Service
