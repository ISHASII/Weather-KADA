import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/weather", label: "Weather" },
  { to: "/service", label: "Service" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const update = () => {
      if (!navRef.current) return;
      const h = navRef.current.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--navbar-height", `${h}px`);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [scrolled]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div
        className={`navbar-overlay${isOpen ? " open" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      <button
        className={`navbar-toggle${isOpen ? " open" : ""}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Toggle navigation menu"
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        ref={navRef}
        className={`navbar${scrolled ? " scrolled" : ""}${isOpen ? " hidden" : ""}`}
      >
        <div className="navbar-cloud-wrapper">
          <svg
            className="cloud-svg-bg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="cloudGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f0f8ff" />
              </linearGradient>
            </defs>
            <rect
              x="0"
              y="22"
              width="100"
              height="78"
              rx="12"
              ry="12"
              fill="url(#cloudGrad)"
            />
            <ellipse cx="15" cy="26" rx="11" ry="11" fill="url(#cloudGrad)" />
            <ellipse cx="30" cy="20" rx="14" ry="14" fill="url(#cloudGrad)" />
            <ellipse cx="50" cy="16" rx="16" ry="16" fill="url(#cloudGrad)" />
            <ellipse cx="70" cy="20" rx="14" ry="14" fill="url(#cloudGrad)" />
            <ellipse cx="87" cy="26" rx="11" ry="11" fill="url(#cloudGrad)" />
          </svg>

          <div className="navbar-container">
            <Link to="/" className="navbar-logo">
              <div className="navbar-logo-text">
                <h3>Natanegara Langit</h3>
                <span>We Predicted The Sky Before It Moves</span>
              </div>
            </Link>

            <ul className="navbar-menu">
              {NAV_LINKS.map(({ to, label, icon }) => (
                <li key={to}>
                  <Link to={to} className={isActive(to) ? "active" : ""}>
                    <span className="nav-icon">{icon}</span>
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className={`navbar-sidebar${isOpen ? " open" : ""}`}>
        <div className="sidebar-header">
          <h4>Natanegara Langit</h4>
          <button
            type="button"
            className="sidebar-close"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsOpen(false);
            }}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {NAV_LINKS.map(({ to, label, icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={isActive(to) ? "active" : ""}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="nav-icon">{icon}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <p>We Predicted The Sky Before It Moves </p>
        </div>
      </div>
    </>
  );
}
