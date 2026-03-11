import TokenBadge from "./TokenBadge";

const Header = ({ tokens, onShop, onBack, extra, domainIcon, domainLabel }) => {
  return (
    <div style={S.hdr}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {onBack && (
          <button style={S.backBtn} onClick={onBack}>
            ← BACK
          </button>
        )}
        {domainIcon ? (
          <span style={S.domainLabel}>
            {domainIcon} {domainLabel?.toUpperCase()}
          </span>
        ) : (
          <span style={S.logo}>MANTRA</span>
        )}
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {extra}
        <TokenBadge tokens={tokens} onShop={onShop} />
      </div>
    </div>
  );
};

const S = {
  hdr: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    borderBottom: "1px solid #181818",
    background: "#0d0d0d",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  logo: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900,
    fontSize: 16,
    letterSpacing: "4px",
    color: "#FF6B35",
  },
  backBtn: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 10,
    color: "#383838",
    background: "none",
    border: "none",
    letterSpacing: "1px",
    cursor: "pointer",
  },
  domainLabel: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900,
    fontSize: 14,
    letterSpacing: 2,
    color: "#555",
  },
};

export default Header;