import React from "react"

export default function Testimonials() {
  const items = [
    { name: "Alya", text: "Accurate forecasts — saved our outdoor event." },
    { name: "Riko", text: "Reliable and timely alerts. Highly recommended." },
    { name: "Sari", text: "Professional team and excellent service." },
  ]

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
  )
}
