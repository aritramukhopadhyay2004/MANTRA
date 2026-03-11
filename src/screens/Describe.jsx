import Header from "../components/Header";
import { COSTS } from "../constants/costs";

const Describe = ({
  domain,
  description,
  setDescription,
  onGenerate,
  onBack,
  onShop,
  tokens,
  busy,
}) => {
  const canGenerate = description.trim() && !busy && tokens >= COSTS.generate;

  return (
    <div style={S.screen}>
      <Header tokens={tokens} onShop={onShop} onBack={onBack} />
      <div style={S.body}>

        {/* Domain Header */}
        <div style={S.domainRow}>
          <span style={S.domainIcon}>{domain?.icon}</span>
          <div>
            <div style={S.secLabel}>// MISSION BRIEF</div>
            <div style={{ ...S.domainName, color: domain?.color }}>
              {domain?.label?.toUpperCase()}
            </div>
          </div>
        </div>

        <div style={S.hint}>
          Describe exactly what you want to accomplish. The more detail
          you give, the better your checklist.
        </div>

        <textarea
          style={S.ta}
          rows={6}
          placeholder={`e.g. "${domain?.hint}" — describe in your own words...`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div style={S.costNote}>
          Checklist generation{" "}
          <span style={S.highlight}>⚡{COSTS.generate} tokens</span>
          {"  ·  "}
          AI guidance{" "}
          <span style={S.highlight}>⚡{COSTS.message} tokens/msg</span>
        </div>

        {tokens < COSTS.generate && (
          <div style={S.warn}>
            Insufficient tokens.{" "}
            <button style={S.warnLink} onClick={onShop}>
              Recharge →
            </button>
          </div>
        )}

        <button
          style={{ ...S.btn, opacity: canGenerate ? 1 : 0.3 }}
          className="actionBtn"
          disabled={!canGenerate}
          onClick={onGenerate}
        >
          {busy ? "ANALYZING TASK..." : "GENERATE CHECKLIST →"}
        </button>
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
  },
  domainRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  domainIcon: { fontSize: 34 },
  secLabel: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 10,
    color: "#383838",
    letterSpacing: "2px",
    marginBottom: 2,
  },
  domainName: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 900,
    fontSize: 24,
    letterSpacing: 2,
  },
  hint: {
    color: "#3e3e3e",
    fontSize: 12,
    lineHeight: 1.6,
    marginBottom: 14,
    fontFamily: "'Barlow', sans-serif",
  },
  ta: {
    width: "100%",
    background: "#111",
    border: "1px solid #1e1e1e",
    borderLeft: "2px solid #FF6B35",
    borderRadius: 3,
    padding: "14px",
    color: "#bbb",
    fontSize: 13,
    lineHeight: 1.6,
    resize: "none",
    fontFamily: "'Barlow', sans-serif",
    marginBottom: 12,
  },
  costNote: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 10,
    color: "#383838",
    marginBottom: 12,
    letterSpacing: "0.5px",
  },
  highlight: { color: "#FF6B35" },
  warn: {
    background: "rgba(239,68,68,0.07)",
    border: "1px solid rgba(239,68,68,0.18)",
    borderRadius: 3,
    padding: "9px 13px",
    fontSize: 12,
    color: "#ef4444",
    marginBottom: 12,
  },
  warnLink: {
    background: "none",
    border: "none",
    color: "#FF6B35",
    fontWeight: 700,
    fontSize: 12,
    textDecoration: "underline",
    cursor: "pointer",
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
    padding: "14px",
    width: "100%",
    transition: "filter 0.15s",
    cursor: "pointer",
    marginTop: 8,
  },
};

export default Describe;