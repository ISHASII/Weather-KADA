import { useState, useEffect, useRef } from "react";
import Navbar from "../component/Navbar";

/* ─── Global CSS ─────────────────────────────────────────────────────────── */
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', 'Segoe UI', sans-serif; background: #fff; color: #0B1426; padding-top: 72px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes scrollBounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50%       { transform: translateX(-50%) translateY(10px); }
  }

  .nl-anim-1 { animation: fadeUp 0.85s ease both; }
  .nl-anim-2 { animation: fadeUp 0.85s 0.18s ease both; }
  .nl-anim-3 { animation: fadeUp 0.85s 0.34s ease both; }

  .nl-card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
  .nl-card-hover:hover { transform: translateY(-6px); box-shadow: 0 24px 64px rgba(0,0,0,0.13) !important; }

  .nl-why-row { transition: background 0.18s ease; border-radius: 12px; }
  .nl-why-row:hover { background: #F8FAFC !important; }

  .nl-tech-pill { transition: background 0.2s, border-color 0.2s, color 0.2s; }
  .nl-tech-pill:hover { background: rgba(6,182,212,0.14) !important; border-color: #06B6D4 !important; color: #fff !important; }

  .nl-btn-p { transition: transform 0.2s, box-shadow 0.2s; }
  .nl-btn-p:hover { transform: translateY(-3px); box-shadow: 0 18px 44px rgba(37,99,235,0.42) !important; }

  .nl-btn-o { transition: background 0.2s; }
  .nl-btn-o:hover { background: rgba(255,255,255,0.12) !important; }

  .nl-scroll { animation: scrollBounce 2.2s ease-in-out infinite; }

  .nl-ind-item { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .nl-ind-item:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.08) !important; }

  .nl-footer-link { transition: color 0.18s ease; }
  .nl-footer-link:hover { color: #fff !important; }

  @media (max-width: 1024px) {
    .nl-two-col    { grid-template-columns: 1fr !important; }
    .nl-two-col .nl-img-block { order: -1; }
    .nl-stats      { grid-template-columns: repeat(3, 1fr) !important; }
    .nl-awards     { grid-template-columns: repeat(2, 1fr) !important; }
    .nl-services   { grid-template-columns: 1fr !important; }
    .nl-industries { grid-template-columns: repeat(2, 1fr) !important; }
    .nl-footer     { grid-template-columns: 1fr !important; gap: 40px !important; }
  }
  @media (max-width: 640px) {
    .nl-stats      { grid-template-columns: repeat(2, 1fr) !important; }
    .nl-awards     { grid-template-columns: 1fr !important; }
    .nl-industries { grid-template-columns: 1fr !important; }
    .nl-process    { flex-direction: column !important; align-items: center !important; }
    .nl-proc-arrow { transform: rotate(90deg); }
  }
`;

/* ─── Counter Hook ───────────────────────────────────────────────────────── */
function useCounter(end, duration = 2200, started = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let t0 = null;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setVal(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [end, duration, started]);
  return val;
}

/* ─── SVG Icon System ────────────────────────────────────────────────────── */
function Icon({ children, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/* themed icons — all use Icon wrapper */
const IcArrow = ({ size }) => (
  <Icon size={size}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Icon>
);
const IcLandmark = ({ size }) => (
  <Icon size={size}>
    <line x1="3" y1="22" x2="21" y2="22" />
    <line x1="6" y1="18" x2="6" y2="11" />
    <line x1="10" y1="18" x2="10" y2="11" />
    <line x1="14" y1="18" x2="14" y2="11" />
    <line x1="18" y1="18" x2="18" y2="11" />
    <polygon points="12 2 20 7 4 7" />
  </Icon>
);
const IcPlane = ({ size }) => (
  <Icon size={size}>
    <path d="M22 2 11 13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </Icon>
);
const IcBolt = ({ size }) => (
  <Icon size={size}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </Icon>
);
const IcLeaf = ({ size }) => (
  <Icon size={size}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </Icon>
);
const IcBuilding = ({ size }) => (
  <Icon size={size}>
    <path d="M3 21h18M5 21V7l7-4 7 4v14M10 21v-5h4v5" />
    <rect x="9" y="9" width="2" height="2" rx="0.4" />
    <rect x="13" y="9" width="2" height="2" rx="0.4" />
  </Icon>
);
const IcFlask = ({ size }) => (
  <Icon size={size}>
    <path d="M9 3h6M11 3v5.172a2 2 0 0 1-.586 1.414L6 14h12l-4.414-4.414A2 2 0 0 1 13 8.172V3" />
    <path d="M6.5 14a6 6 0 0 0 11 0" />
  </Icon>
);
const IcPin = ({ size }) => (
  <Icon size={size}>
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);
const IcPhone = ({ size }) => (
  <Icon size={size}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Icon>
);
/* section-specific icons */
const IcEye = ({ size }) => (
  <Icon size={size}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);
const IcTarget = ({ size }) => (
  <Icon size={size}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </Icon>
);
const IcAward = ({ size }) => (
  <Icon size={size}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </Icon>
);
const IcCloud = ({ size }) => (
  <Icon size={size}>
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </Icon>
);
const IcWind = ({ size }) => (
  <Icon size={size}>
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
  </Icon>
);

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function Home() {
  const [statsOn, setStatsOn] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStatsOn(true);
      },
      { threshold: 0.2 },
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const c1 = useCounter(500, 2200, statsOn);
  const c2 = useCounter(120, 2200, statsOn);
  const c3 = useCounter(98, 2200, statsOn);
  const c4 = useCounter(20, 2200, statsOn);
  const c5 = useCounter(10, 2200, statsOn);

  return (
    <>
      <style>{globalCSS}</style>
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          minHeight: "100vh",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1504608524841-42584120d693?w=1920&q=85)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(7,13,28,0.75) 0%, rgba(15,40,100,0.52) 50%, rgba(7,13,28,0.88) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "0 24px",
            maxWidth: "960px",
          }}
        >
          <div
            className="nl-anim-1"
            style={{
              display: "inline-block",
              background: "rgba(6,182,212,0.12)",
              border: "1px solid rgba(6,182,212,0.42)",
              color: "#06B6D4",
              borderRadius: "999px",
              padding: "8px 24px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "32px",
            }}
          >
            Atmospheric Intelligence Platform
          </div>

          <h1
            className="nl-anim-2"
            style={{
              fontSize: "clamp(54px, 9vw, 110px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.0,
              marginBottom: "20px",
              letterSpacing: "-3px",
            }}
          >
            Natanegara
            <br />
            <span style={{ color: "#06B6D4" }}>Langit</span>
          </h1>

          <p
            className="nl-anim-3"
            style={{
              fontSize: "clamp(16px, 2vw, 21px)",
              color: "rgba(255,255,255,0.68)",
              fontWeight: 300,
              fontStyle: "italic",
              letterSpacing: "0.3px",
              marginBottom: "52px",
            }}
          >
            We Predicted The Sky Before It Moves
          </p>

          <div
            className="nl-anim-3"
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#services"
              className="nl-btn-p"
              style={{
                background: "linear-gradient(135deg, #2563EB, #06B6D4)",
                color: "#fff",
                borderRadius: "999px",
                padding: "16px 44px",
                fontWeight: 700,
                fontSize: "15px",
                textDecoration: "none",
                boxShadow: "0 12px 36px rgba(37,99,235,0.45)",
              }}
            >
              Our Services
            </a>
            <a
              href="#about"
              className="nl-btn-o"
              style={{
                background: "transparent",
                border: "2px solid rgba(255,255,255,0.38)",
                color: "#fff",
                borderRadius: "999px",
                padding: "16px 44px",
                fontWeight: 600,
                fontSize: "15px",
                textDecoration: "none",
              }}
            >
              Learn More
            </a>
          </div>
        </div>

        <div
          className="nl-scroll"
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            color: "rgba(255,255,255,0.38)",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "44px",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.42), transparent)",
            }}
          />
        </div>
      </section>

      {/* ══ ABOUT ══════════════════════════════════════════════════════════ */}
      <section id="about" style={{ padding: "108px 24px", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            className="nl-two-col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "88px",
              alignItems: "center",
            }}
          >
            <div>
              <Label color="#2563EB">About Us</Label>
              <h2 style={T}>About Natanegara Langit</h2>
              <p style={B}>
                Natanegara Langit was founded with a singular vision: to elevate
                weather intelligence into a global strategic asset. As climate
                volatility reshapes industries and economies, forecasting must
                move beyond reaction — it must deliver foresight that is
                precise, scalable, and internationally aligned.
              </p>
              <p style={{ ...B, marginTop: "18px" }}>
                We built Natanegara Langit as an atmospheric intelligence
                platform designed for cross-regional integration and
                decision-grade accuracy. Through advanced modeling and
                disciplined engineering, we transform complex climate data into
                clarity.
              </p>
              <blockquote
                style={{
                  marginTop: "32px",
                  borderLeft: "3px solid #06B6D4",
                  paddingLeft: "22px",
                  fontStyle: "italic",
                  color: "#1D4ED8",
                  fontWeight: 600,
                  fontSize: "17px",
                  lineHeight: 1.65,
                }}
              >
                "Our ambition extends beyond prediction. We are shaping the
                future of global weather intelligence."
              </blockquote>
              <p style={{ ...B, marginTop: "20px" }}>
                Weather is not merely information — it is infrastructure. We do
                not chase noise.{" "}
                <strong style={{ color: "#1D4ED8", fontWeight: 700 }}>
                  We refine signal.
                </strong>
              </p>
            </div>

            <div className="nl-img-block" style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1457269449834-928af64c684d?w=900&q=80"
                alt="Weather observation station"
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                  borderRadius: "20px",
                  boxShadow: "0 28px 72px rgba(37,99,235,0.16)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "-20px",
                  background: "linear-gradient(135deg, #1D4ED8, #06B6D4)",
                  borderRadius: "16px",
                  padding: "22px 28px",
                  color: "#fff",
                  boxShadow: "0 12px 40px rgba(37,99,235,0.32)",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    opacity: 0.65,
                    letterSpacing: "1px",
                    marginBottom: "2px",
                  }}
                >
                  Est.
                </div>
                <div
                  style={{ fontSize: "48px", fontWeight: 900, lineHeight: 1 }}
                >
                  2016
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ HISTORY ════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "108px 24px",
          background: "#0B1426",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1601134467661-3d775b999c5b?w=1600&q=70)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.07,
          }}
        />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="nl-two-col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "88px",
              alignItems: "center",
            }}
          >
            <div className="nl-img-block" style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1436891678271-9c672565d8f6?w=900&q=80"
                alt="Aircraft in clouds"
                style={{
                  width: "100%",
                  height: "480px",
                  objectFit: "cover",
                  borderRadius: "20px",
                  boxShadow: "0 28px 72px rgba(0,0,0,0.42)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "28px",
                  right: "-16px",
                  background: "rgba(6,182,212,0.12)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(6,182,212,0.28)",
                  borderRadius: "16px",
                  padding: "20px 26px",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    color: "#06B6D4",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  Since
                </div>
                <div
                  style={{ fontSize: "52px", fontWeight: 900, lineHeight: 1 }}
                >
                  2016
                </div>
              </div>
            </div>

            <div>
              <Label color="#06B6D4" dark>
                Our Story
              </Label>
              <h2 style={{ ...T, color: "#fff" }}>Our History</h2>
              <p
                style={{
                  ...B,
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.95,
                }}
              >
                Natanegara Langit, berdiri sejak 2016 sebagai perusahaan
                teknologi atmosfer dan modifikasi cuaca berbasis radar serta
                pemodelan prediktif berbasis AI, telah berkembang menjadi pusat
                kendali cuaca strategis dengan pengalaman ratusan jam operasi
                udara dan berbagai misi pengendalian hujan, mitigasi banjir,
                pengelolaan kekeringan, hingga perlindungan cuaca untuk proyek
                infrastruktur dan agenda nasional berskala besar.
              </p>
              <p
                style={{
                  ...B,
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.95,
                  marginTop: "18px",
                }}
              >
                Dengan rekam jejak operasi yang konsisten dan tingkat
                keberhasilan tinggi, Natanegara Langit memposisikan diri sebagai
                mitra strategis pemerintah, industri energi, pertambangan, serta
                penyelenggara event berskala besar dalam mengelola risiko
                atmosfer secara proaktif dan berkelanjutan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ VISION & MISSION ═══════════════════════════════════════════════ */}
      <section style={{ padding: "108px 24px", background: "#F0F9FF" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <Label color="#1D4ED8">Our Direction</Label>
            <h2 style={{ ...T, marginTop: "14px" }}>Vision & Mission</h2>
          </div>

          <div
            className="nl-two-col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >
            {/* Vision */}
            <div
              style={{
                background: "linear-gradient(148deg, #1D4ED8 0%, #2563EB 100%)",
                borderRadius: "24px",
                padding: "52px 48px",
                color: "#fff",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: "24px",
                }}
              >
                <IcEye size={38} />
              </div>
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  opacity: 0.5,
                  marginBottom: "12px",
                }}
              >
                Vision
              </div>
              <h3
                style={{
                  fontSize: "25px",
                  fontWeight: 800,
                  marginBottom: "24px",
                  lineHeight: 1.25,
                }}
              >
                Setting The New Standard
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.9,
                  fontSize: "15px",
                }}
              >
                To set a new standard in weather intelligence, where accuracy is
                trusted, insight is actionable, and climate uncertainty is
                managed with confidence.
              </p>
              <div
                style={{
                  position: "absolute",
                  bottom: "-64px",
                  right: "-64px",
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                }}
              />
            </div>

            {/* Mission */}
            <div
              style={{
                background: "linear-gradient(148deg, #0891B2 0%, #06B6D4 100%)",
                borderRadius: "24px",
                padding: "52px 48px",
                color: "#fff",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: "24px",
                }}
              >
                <IcTarget size={38} />
              </div>
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  opacity: 0.5,
                  marginBottom: "12px",
                }}
              >
                Mission
              </div>
              <h3
                style={{
                  fontSize: "25px",
                  fontWeight: 800,
                  marginBottom: "28px",
                  lineHeight: 1.25,
                }}
              >
                Precision. Clarity. Action.
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                {[
                  "Deliver precise and dependable atmospheric analysis.",
                  "Turn complex climate data into clear operational guidance.",
                  "Support critical sectors with reliable, forward-looking intelligence.",
                ].map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      <IcArrow size={15} />
                    </span>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.82)",
                        lineHeight: 1.72,
                      }}
                    >
                      {m}
                    </p>
                  </div>
                ))}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "-64px",
                  right: "-64px",
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS ══════════════════════════════════════════════════════════ */}
      <section
        ref={statsRef}
        style={{ padding: "88px 24px", background: "#0B1426" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            className="nl-stats"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "16px",
              textAlign: "center",
            }}
          >
            {[
              {
                val: c1,
                suffix: "+",
                label: "Flight Operation Hours",
                Icon: IcPlane,
              },
              {
                val: c2,
                suffix: "+",
                label: "Strategic Weather Missions",
                Icon: IcCloud,
              },
              {
                val: c3,
                suffix: "%",
                label: "Operational Precision Rate",
                Icon: IcTarget,
              },
              {
                val: c4,
                suffix: "+",
                label: "Institutional Collaborations",
                Icon: IcLandmark,
              },
              {
                val: c5,
                suffix: "+",
                label: "Years Atmospheric Experience",
                Icon: IcWind,
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "20px",
                  padding: "36px 16px",
                }}
              >
                <div
                  style={{
                    color: "rgba(6,182,212,0.45)",
                    marginBottom: "14px",
                  }}
                >
                  <s.Icon size={22} />
                </div>
                <div
                  style={{
                    fontSize: "clamp(34px, 4vw, 54px)",
                    fontWeight: 900,
                    color: "#06B6D4",
                    lineHeight: 1,
                  }}
                >
                  {s.val}
                  {s.suffix}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.42)",
                    marginTop: "12px",
                    lineHeight: 1.55,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ACHIEVEMENTS ═══════════════════════════════════════════════════ */}
      <section style={{ padding: "108px 24px", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <Label color="#92400E" bg="#FEF9C3">
              Recognition
            </Label>
            <h2 style={{ ...T, marginTop: "14px" }}>
              Achievements & Recognition
            </h2>
            <p style={{ ...B, maxWidth: "520px", margin: "12px auto 0" }}>
              Pengakuan atas dedikasi kami terhadap keunggulan operasional dan
              inovasi atmosfer.
            </p>
          </div>

          <div
            className="nl-awards"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "22px",
            }}
          >
            {[
              {
                year: "2022",
                accent: "#D97706",
                bg: "#FFFBEB",
                org: "National Meteorology & Technology Forum",
                title: "National Weather Technology Innovation Award",
                desc: "Penghargaan atas pengembangan sistem radar terintegrasi dan pemodelan prediktif berbasis AI untuk operasi modifikasi cuaca strategis.",
              },
              {
                year: "2023",
                accent: "#7C3AED",
                bg: "#F5F3FF",
                org: "Indonesia Aerospace & Meteorology Forum",
                title: "Excellence in Atmospheric Operations",
                desc: "Pengakuan atas standar operasional penerbangan, presisi analisis atmosfer, serta tingkat keberhasilan tinggi dalam intervensi cuaca terkendali.",
              },
              {
                year: "2021",
                accent: "#2563EB",
                bg: "#EFF6FF",
                org: "National Disaster Risk Reduction Agency",
                title: "Strategic Disaster Mitigation Contribution Award",
                desc: "Apresiasi atas kontribusi dalam mitigasi banjir dan pengendalian curah hujan ekstrem melalui operasi berbasis data lintas sektor.",
              },
              {
                year: "2020",
                accent: "#059669",
                bg: "#ECFDF5",
                org: "Atmospheric Technology Certification Board",
                title: "Advanced Radar Integration Certification",
                desc: "Sertifikasi integrasi sistem radar Doppler, citra satelit, dan pemodelan dinamika awan untuk kebutuhan operasional skala nasional.",
              },
              {
                year: "2024",
                accent: "#0891B2",
                bg: "#ECFEFF",
                org: "Environmental Sustainability Council",
                title: "Sustainable Weather Intervention Recognition",
                desc: "Pengakuan atas pendekatan modifikasi cuaca yang mempertimbangkan dampak lingkungan, efisiensi operasional, dan prinsip keberlanjutan.",
              },
            ].map((a, i) => (
              <div
                key={i}
                className="nl-card-hover"
                style={{
                  background: a.bg,
                  borderRadius: "20px",
                  padding: "36px",
                  borderTop: `3px solid ${a.accent}`,
                  border: `1px solid ${a.accent}1A`,
                  borderTopColor: a.accent,
                }}
              >
                <div style={{ color: a.accent, marginBottom: "16px" }}>
                  <IcAward size={30} />
                </div>
                <span
                  style={{
                    display: "inline-block",
                    background: a.accent,
                    color: "#fff",
                    borderRadius: "6px",
                    padding: "3px 10px",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.3px",
                    marginBottom: "14px",
                  }}
                >
                  {a.year}
                </span>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#94A3B8",
                    fontWeight: 500,
                    marginBottom: "10px",
                    lineHeight: 1.5,
                  }}
                >
                  {a.org}
                </div>
                <h4
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#0B1426",
                    marginBottom: "12px",
                    lineHeight: 1.45,
                  }}
                >
                  {a.title}
                </h4>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#64748B",
                    lineHeight: 1.78,
                  }}
                >
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OUR SERVICES ═══════════════════════════════════════════════════ */}
      <section
        id="services"
        style={{ padding: "108px 24px", background: "#F0F9FF" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <Label color="#1D4ED8">What We Do</Label>
            <h2 style={{ ...T, marginTop: "14px" }}>Our Services</h2>
            <p style={{ ...B, maxWidth: "520px", margin: "12px auto 0" }}>
              Platform layanan intelijen cuaca yang dirancang untuk mendukung
              keputusan strategis lintas industri.
            </p>
          </div>

          <div
            className="nl-services"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "22px",
            }}
          >
            {[
              {
                num: "01",
                gradient: "linear-gradient(148deg, #1D4ED8 0%, #2563EB 100%)",
                title: "Atmospheric Intelligence Platform",
                desc: "Integrated multi-layer climate data architecture yang menggabungkan radar Doppler, citra satelit, dan pemodelan dinamika atmosfer secara real-time.",
              },
              {
                num: "02",
                gradient: "linear-gradient(148deg, #6D28D9 0%, #7C3AED 100%)",
                title: "Advanced Forecast Modeling",
                desc: "High-resolution predictive systems calibrated for operational precision — prediksi atmosfer akurasi tinggi untuk kebutuhan operasional kritikal.",
              },
              {
                num: "03",
                gradient: "linear-gradient(148deg, #0E7490 0%, #0891B2 100%)",
                title: "Climate Risk Analytics",
                desc: "Strategic risk assessment for infrastructure, mobility, and energy — analisis risiko iklim yang mendukung perencanaan strategis jangka panjang.",
              },
              {
                num: "04",
                gradient: "linear-gradient(148deg, #047857 0%, #059669 100%)",
                title: "Decision-Grade Forecasting",
                desc: "Actionable insights engineered for executive-level decisions — laporan cuaca operasional yang dapat langsung ditindaklanjuti pemangku keputusan.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="nl-card-hover"
                style={{
                  background: s.gradient,
                  borderRadius: "24px",
                  padding: "52px 48px",
                  color: "#fff",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    fontSize: "52px",
                    fontWeight: 900,
                    color: "rgba(255,255,255,0.1)",
                    lineHeight: 1,
                    marginBottom: "18px",
                    letterSpacing: "-2px",
                  }}
                >
                  {s.num}
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    marginBottom: "14px",
                    lineHeight: 1.3,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.72)",
                    lineHeight: 1.84,
                    fontSize: "14px",
                  }}
                >
                  {s.desc}
                </p>
                <div
                  style={{
                    position: "absolute",
                    bottom: "-64px",
                    right: "-64px",
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY US ═════════════════════════════════════════════════════════ */}
      <section style={{ padding: "108px 24px", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            className="nl-two-col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "88px",
              alignItems: "center",
            }}
          >
            <div>
              <Label color="#2563EB">Our Value</Label>
              <h2 style={{ ...T, marginTop: "14px" }}>
                Why Our Service Matters
              </h2>
              <p
                style={{
                  ...B,
                  fontSize: "16px",
                  color: "#64748B",
                  marginBottom: "36px",
                }}
              >
                When climate volatility increases, uncertainty expands.{" "}
                <span style={{ color: "#1D4ED8", fontWeight: 700 }}>
                  We reduce it.
                </span>
              </p>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                {[
                  {
                    Icon: IcPlane,
                    text: "Protect aviation and maritime operations",
                    color: "#2563EB",
                  },
                  {
                    Icon: IcBolt,
                    text: "Optimize energy and utility performance",
                    color: "#D97706",
                  },
                  {
                    Icon: IcLeaf,
                    text: "Support agricultural stability",
                    color: "#059669",
                  },
                  {
                    Icon: IcBuilding,
                    text: "Strengthen infrastructure resilience",
                    color: "#7C3AED",
                  },
                  {
                    Icon: IcLandmark,
                    text: "Enable government preparedness",
                    color: "#0891B2",
                  },
                ].map(({ Icon, text, color }, i) => (
                  <div
                    key={i}
                    className="nl-why-row"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "14px 16px",
                      cursor: "default",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: `${color}12`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: color,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "#334155",
                      }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="nl-img-block">
              <img
                src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80"
                alt="City skyline aerial view"
                style={{
                  width: "100%",
                  height: "520px",
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "20px",
                  boxShadow: "0 28px 72px rgba(37,99,235,0.12)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ TECHNOLOGY ═════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "88px 24px",
          background: "#0B1426",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1600&q=60)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.06,
          }}
        />

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Label color="#06B6D4" dark>
            How We Work
          </Label>
          <h2
            style={{
              ...T,
              color: "#fff",
              marginTop: "14px",
              marginBottom: "52px",
            }}
          >
            Technology & Methodology
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            {[
              "Multi-layer Data Integration",
              "Advanced Atmospheric Modeling",
              "Continuous Calibration Systems",
              "Real-time Predictive Analysis",
              "Doppler Radar Integration",
              "Satellite Imagery Processing",
              "AI-Based Prediction Engine",
              "Cloud Dynamics Simulation",
            ].map((t, i) => (
              <div
                key={i}
                className="nl-tech-pill"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(6,182,212,0.2)",
                  borderRadius: "999px",
                  padding: "12px 24px",
                  color: "rgba(255,255,255,0.72)",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "default",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OPERATION PROCESS ══════════════════════════════════════════════ */}
      <section style={{ padding: "108px 24px", background: "#F0F9FF" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <Label color="#1D4ED8">How It Works</Label>
            <h2 style={{ ...T, marginTop: "14px" }}>Operation Process</h2>
          </div>

          <div
            className="nl-process"
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              overflowX: "auto",
              paddingBottom: "8px",
            }}
          >
            {[
              {
                num: "01",
                title: "Weather Analysis",
                desc: "Data atmosfer dikumpulkan dan dianalisis dari berbagai sumber secara real-time.",
                color: "#2563EB",
              },
              {
                num: "02",
                title: "Strategic Planning",
                desc: "Perencanaan taktis disusun berdasarkan hasil analisis atmosfer ilmiah.",
                color: "#7C3AED",
              },
              {
                num: "03",
                title: "Aircraft Deployment",
                desc: "Persiapan dan pengerahan armada pesawat operasional sesuai rencana misi.",
                color: "#0891B2",
              },
              {
                num: "04",
                title: "Execution",
                desc: "Pelaksanaan operasi modifikasi cuaca secara presisi dan terukur.",
                color: "#059669",
              },
              {
                num: "05",
                title: "Monitoring & Report",
                desc: "Pemantauan real-time dan pelaporan hasil operasi kepada pemangku kepentingan.",
                color: "#DC2626",
              },
            ].map((step, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "196px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "50%",
                      background: "#fff",
                      border: `2px solid ${step.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                      position: "relative",
                      boxShadow: `0 8px 28px ${step.color}1A`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: 900,
                        color: step.color,
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {step.num}
                    </span>
                    <div
                      style={{
                        position: "absolute",
                        top: "-4px",
                        right: "-4px",
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        background: step.color,
                        border: "2px solid #F0F9FF",
                      }}
                    />
                  </div>
                  <h4
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#0B1426",
                      marginBottom: "10px",
                    }}
                  >
                    {step.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#64748B",
                      lineHeight: 1.7,
                      padding: "0 8px",
                    }}
                  >
                    {step.desc}
                  </p>
                </div>

                {i < 4 && (
                  <div
                    className="nl-proc-arrow"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "34px",
                      flexShrink: 0,
                      color: "#CBD5E1",
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "1px",
                        background: "#CBD5E1",
                      }}
                    />
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#CBD5E1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INDUSTRIES ═════════════════════════════════════════════════════ */}
      <section style={{ padding: "108px 24px", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <Label color="#2563EB">Sectors</Label>
            <h2 style={{ ...T, marginTop: "14px" }}>Industries We Serve</h2>
          </div>

          <div
            className="nl-industries"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {[
              {
                Icon: IcLandmark,
                title: "Government & Public Sector",
                color: "#2563EB",
                bg: "#EFF6FF",
              },
              {
                Icon: IcPlane,
                title: "Aviation & Maritime",
                color: "#7C3AED",
                bg: "#F5F3FF",
              },
              {
                Icon: IcBolt,
                title: "Energy & Utilities",
                color: "#D97706",
                bg: "#FFFBEB",
              },
              {
                Icon: IcLeaf,
                title: "Agriculture & Logistics",
                color: "#059669",
                bg: "#ECFDF5",
              },
              {
                Icon: IcBuilding,
                title: "Infrastructure & Smart Cities",
                color: "#0891B2",
                bg: "#ECFEFF",
              },
              {
                Icon: IcFlask,
                title: "Research & Development",
                color: "#DC2626",
                bg: "#FEF2F2",
              },
            ].map(({ Icon, title, color, bg }, i) => (
              <div
                key={i}
                className="nl-ind-item"
                style={{
                  background: bg,
                  borderRadius: "18px",
                  padding: "28px",
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                  border: `1px solid ${color}14`,
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "12px",
                    background: color,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    boxShadow: `0 6px 18px ${color}28`,
                  }}
                >
                  <Icon size={22} />
                </div>
                <h4
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#0B1426",
                    lineHeight: 1.4,
                  }}
                >
                  {title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═════════════════════════════════════════════════════════ */}
      <footer
        style={{
          background: "#0B1426",
          color: "#fff",
          padding: "72px 24px 36px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1504608524841-42584120d693?w=1200&q=50)",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            opacity: 0.05,
          }}
        />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="nl-footer"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gap: "72px",
              marginBottom: "60px",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 900,
                  marginBottom: "8px",
                }}
              >
                Natanegara<span style={{ color: "#06B6D4" }}>Langit</span>
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontStyle: "italic",
                  fontSize: "13px",
                  marginBottom: "22px",
                }}
              >
                We Predicted The Sky Before It Moves
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "14px",
                  lineHeight: 1.88,
                  maxWidth: "340px",
                }}
              >
                Platform intelijen cuaca strategis yang mendukung pengambilan
                keputusan berbasis data atmosfer yang presisi, andal, dan dapat
                ditindaklanjuti.
              </p>
            </div>

            <div>
              <h4
                style={{
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#06B6D4",
                  marginBottom: "24px",
                }}
              >
                Navigation
              </h4>
              {["Home", "Weather", "Service", "Contact"].map((link) => (
                <div key={link} style={{ marginBottom: "14px" }}>
                  <a
                    href={`/${link === "Home" ? "" : link.toLowerCase()}`}
                    className="nl-footer-link"
                    style={{
                      color: "rgba(255,255,255,0.48)",
                      textDecoration: "none",
                      fontSize: "14px",
                    }}
                  >
                    {link}
                  </a>
                </div>
              ))}
            </div>

            <div>
              <h4
                style={{
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#06B6D4",
                  marginBottom: "24px",
                }}
              >
                Contact
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    color: "rgba(255,255,255,0.52)",
                    fontSize: "14px",
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    style={{ flexShrink: 0, marginTop: "1px", opacity: 0.6 }}
                  >
                    <IcPin size={16} />
                  </span>
                  <span>Menteng, Jakarta, Indonesia</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: "rgba(255,255,255,0.52)",
                    fontSize: "14px",
                  }}
                >
                  <span style={{ opacity: 0.6, flexShrink: 0 }}>
                    <IcPhone size={16} />
                  </span>
                  <span>(021) 571 687 766</span>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              paddingTop: "32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.22)", fontSize: "13px" }}>
              © 2026 Natanegara Langit. All rights reserved.
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.16)",
                fontSize: "11px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
              }}
            >
              Atmospheric Intelligence Platform
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ─── Shared Helpers ─────────────────────────────────────────────────────── */
function Label({ color, bg, dark, children }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: bg ?? (dark ? "rgba(6,182,212,0.12)" : `${color}14`),
        color,
        borderRadius: "999px",
        padding: "6px 18px",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "2.5px",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

const T = {
  fontSize: "clamp(28px, 4vw, 50px)",
  fontWeight: 900,
  color: "#0B1426",
  lineHeight: 1.1,
  marginBottom: "18px",
  letterSpacing: "-1.5px",
};
const B = { fontSize: "16px", color: "#475569", lineHeight: 1.88 };
