import Header from "../components/Header";
import { DOMAINS } from "../constants/domains";

const DomainSelect = ({ tokens, onSelect, onShop, onBack }) => {
  return (
    <div style={S.screen}>
      <Header tokens={tokens} onShop={onShop} onBack={onBack} />
      <div style={S.body}>
        <div style={S.secLabel}>// SELECT WORK DOMAIN</div>
        <div style={S.grid}>
          {DOMAINS.map((d) => (
            <button
              key={d.id}
              className="domBtn"
              style={{ ...S.card, "--dc": d.color }}
              onClick={() => onSelect(d)}
            >
              <span style={S.icon}>{d.icon}</span>
              <div style={{ ...S.name, color: d.color }}>{d.label}</div>
              <div style={S.hint}>{d.hint}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const S = {
  screen: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  body: {
    flex: 1,
    padding: "22px 18px 40px",
    overflowY: "auto",
  },
  secLabel: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 10,
    color: "#383838",
    letterSpacing: "2px",
    marginBottom: 16,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  card: {
    background: "#111",
    border: "1px solid #1e1e1e",
    borderRadius: 4,
    padding: "18px 14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
    transition: "all 0.15s",
    textAlign: "left",
    cursor: "pointer",
  },
  icon: { fontSize: 26 },
  name: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: 16,
    letterSpacing: "1px",
  },
  hint: {
    fontFamily: "'Barlow', sans-serif",
    fontSize: 10,
    color: "#383838",
    lineHeight: 1.4,
  },
};

export default DomainSelect;