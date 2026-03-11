const PackageCard = ({ pkg, onBuy }) => {
  return (
    <button
      className="pkgBtn"
      style={{ ...S.card, ...(pkg.best ? S.cardBest : {}) }}
      onClick={() => onBuy(pkg)}
    >
      {pkg.best && <div style={S.bestTag}>BEST VALUE</div>}
      <div style={S.inner}>
        <div>
          <div style={{ ...S.label, color: pkg.best ? "#FF6B35" : "#bbb" }}>
            {pkg.label} PACK
          </div>
          <div style={S.tokens}>⚡ {pkg.tokens} tokens</div>
          <div style={S.per}>{pkg.per}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={S.price}>{pkg.price}</div>
          <div style={S.currency}>USD</div>
        </div>
      </div>
    </button>
  );
};

const S = {
  card: {
    background: "#111",
    border: "1px solid #1e1e1e",
    borderRadius: 4,
    padding: "18px",
    textAlign: "left",
    transition: "background 0.15s",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    width: "100%",
  },
  cardBest: {
    border: "1px solid rgba(255,107,53,0.3)",
    background: "rgba(255,107,53,0.03)",
  },
  bestTag: {
    position: "absolute",
    top: 0,
    right: 0,
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 8,
    letterSpacing: "1.5px",
    background: "#FF6B35",
    color: "#0d0d0d",
    padding: "3px 10px",
  },
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 22,
    fontWeight: 900,
    letterSpacing: 1,
  },
  tokens: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 13,
    color: "#FF6B35",
    marginTop: 3,
  },
  per: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 10,
    color: "#383838",
    marginTop: 2,
  },
  price: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 36,
    fontWeight: 900,
    color: "#fff",
  },
  currency: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 10,
    color: "#333",
  },
};

export default PackageCard;