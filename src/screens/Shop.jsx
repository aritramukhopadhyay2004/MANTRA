import Header from "../components/Header";
import PackageCard from "../components/PackageCard";
import { PACKAGES } from "../constants/packages";
import { COSTS } from "../constants/costs";

const Shop = ({ tokens, onBuy, onBack, successMsg }) => {
  return (
    <div style={S.screen}>
      <Header tokens={tokens} onBack={onBack} />
      <div style={S.body}>
        <div style={S.secLabel}>// TOKEN RECHARGE STATION</div>
        <div style={S.title}>POWER UP</div>
        <div style={S.sub}>Tokens fuel your AI agent. They never expire.</div>

        {/* Cost reference */}
        <div style={S.costCard}>
          <div style={S.costRow}>
            <span>Generate checklist</span>
            <span style={S.orange}>⚡ {COSTS.generate} tokens</span>
          </div>
          <div style={{ ...S.costRow, borderBottom: "none", paddingBottom: 0, marginBottom: 0 }}>
            <span>AI guidance message</span>
            <span style={S.orange}>⚡ {COSTS.message} tokens</span>
          </div>
        </div>

        {successMsg && <div style={S.success}>{successMsg}</div>}

        <div style={S.packages}>
          {PACKAGES.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} onBuy={onBuy} />
          ))}
        </div>

        <div style={S.footer}>
          🔒 SECURE · INSTANT DELIVERY · TOKENS NEVER EXPIRE
        </div>
      </div>
    </div>
  );
};

const S = {
  screen: { minHeight: "100vh", display: "flex", flexDirection: "column" },
  body: { flex: 1, padding: "22px 18px 40px", overflowY: "auto" },
  secLabel: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 10,
    color: "#383838",
    letterSpacing: "2px",
    marginBottom: 6,
  },
  title: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 34,
    fontWeight: 900,
    color: "#fff",
    letterSpacing: 2,
    marginBottom: 4,
  },
  sub: { color: "#444", fontSize: 13, marginBottom: 22, fontFamily: "'Barlow', sans-serif" },
  costCard: {
    background: "#111",
    border: "1px solid #1e1e1e",
    borderRadius: 4,
    padding: "14px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 0,
  },
  costRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 13,
    color: "#484848",
    fontFamily: "'Share Tech Mono', monospace",
    paddingBottom: 10,
    borderBottom: "1px solid #181818",
  },
  orange: { color: "#FF6B35" },
  success: {
    background: "rgba(78,205,196,0.07)",
    border: "1px solid rgba(78,205,196,0.2)",
    borderRadius: 3,
    padding: "12px 16px",
    color: "#4ECDC4",
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 12,
    textAlign: "center",
    marginTop: 16,
  },
  packages: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 20,
  },
  footer: {
    textAlign: "center",
    color: "#252525",
    fontSize: 10,
    fontFamily: "'Share Tech Mono', monospace",
    marginTop: 24,
    letterSpacing: 1,
  },
};

export default Shop;