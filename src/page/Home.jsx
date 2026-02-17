import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-inner">
          <h1>Natanegara Langit</h1>
          <p className="home-sub">We Predicted The Sky Before It Moves</p>

          <div className="home-cta">
            <Link to="/weather" className="btn primary">
              Check Weather
            </Link>
            <Link to="/service" className="btn outline">
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
