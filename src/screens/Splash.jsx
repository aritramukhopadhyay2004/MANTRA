import { useState, useEffect } from "react";
import { START_TOKENS } from "../constants/costs";

const Splash = ({ onStart }) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={S.wrap}>
      <div style={S.grid} />
      <div style={S.content}>
        {/* Logo */}
        <div style={S.logoWrap}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <div style={S.logo}>MANTRA</div>
            {glitch && <div style={S.glitch}>MANTRA</div>}
          </div>
          <div style={S.tag}>AI-POWERED WORK GUIDANCE SYSTEM v1.0</div>
        </div>

        {/* Description */}
        <div style={S.desc}>
          Pick your work domain. Describe your task.
          <br />
          Get a precise AI-generated checklist with step-by-step guidance.
        </div>

        {/* Features */}
        <div style={S.feats}>
          {[
            ["⚙", "Any Domain"],
            ["▤", "Smart Steps"],
            ["◈", "AI Guidance"],
            ["⚡", "Token Credits"],
          ].map(([icon, label]) => (
            <div key={label} style={S.feat}>
              <span style={S.featIcon}>{icon}</span>
              <span style={S.featLabel}>{label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button style={S.btn} className="actionBtn" onClick={onStart}>
          INITIALIZE MISSION →
        </button>
        <div style={S.free}>⚡ {START_TOKENS} FREE TOKENS TO START</div>
      </div>
    </div>
  );
};

const S = {
  wrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
  },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,107,53,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.05) 1px, transparent 1px)",
    backgroundSize: "44px 44px",
    animation: "gridPulse 4s ease-in-out infinite",
  },
  content: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    padding: "0 28px",
    width: "100%",
    maxWidth: 440,
  },
  logoWrap: { marginBottom: 32 },
  logo: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 64,
    fontWeight: 900,
    letterSpacing: "10px",
    color: "#fff",
    lineHeight: 1,
  },
  glitch: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 64,
    fontWeight: 900,
    letterSpacing: "10px",
    color: "#FF6B35",
    animation: "glitch 0.12s steps(1) forwards",
    pointerEvents: "none",
  },
  tag: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 9,
    letterSpacing: "3px",
    color: "#FF6B35",
    marginTop: 10,
  },
  desc: {
    color: "#484848",
    fontSize: 14,
    lineHeight: 1.8,
    margin: "0 auto 28px",
    maxWidth: 340,
  },
  feats: {
    display: "flex",
    gap: 24,
    justifyContent: "center",
    marginBottom: 36,
    flexWrap: "wrap",
  },
  feat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
  },
  featIcon: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 20,
    color: "#FF6B35",
  },
  featLabel: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "2px",
    color: "#3a3a3a",
  },
  btn: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900,
    fontSize: 15,
    letterSpacing: "3px",
    background: "#FF6B35",
    color: "#0d0d0d",
    border: "none",
    borderRadius: 2,
    padding: "14px 36px",
    transition: "filter 0.15s",
    cursor: "pointer",
    display: "block",
    margin: "0 auto",
  },
  free: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 10,
    letterSpacing: "2px",
    color: "#FF6B35",
    marginTop: 16,
  },
};

export default Splash;
