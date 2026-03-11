const TokenBadge = ({ tokens, onShop }) => {
  const low = tokens < 20;
  return (
    <button
      style={{ ...S.badge, ...(low ? S.low : {}) }}
      onClick={onShop}
    >
      ⚡ {tokens}{low ? " · LOW" : ""}
    </button>
  );
};

const S = {
  badge: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 11,
    fontWeight: 700,
    color: "#FF6B35",
    background: "rgba(255,107,53,0.07)",
    border: "1px solid rgba(255,107,53,0.2)",
    borderRadius: 2,
    padding: "5px 10px",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  low: {
    color: "#ef4444",
    background: "rgba(239,68,68,0.07)",
    borderColor: "rgba(239,68,68,0.2)",
    animation: "pulse 2s infinite",
  },
};

export default TokenBadge;