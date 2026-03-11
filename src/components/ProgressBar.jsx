const ProgressBar = ({ taskTitle, done, total, pct, color }) => {
  return (
    <div style={S.wrap}>
      <div style={S.row}>
        <span style={S.title}>{taskTitle?.toUpperCase()}</span>
        <span style={{ ...S.count, color: pct === 100 ? "#4ECDC4" : color || "#FF6B35" }}>
          {done}/{total} {pct === 100 ? "✓ COMPLETE" : `[${pct}%]`}
        </span>
      </div>
      <div style={S.track}>
        <div
          style={{
            ...S.fill,
            width: `${pct}%`,
            background: pct === 100 ? "#4ECDC4" : color || "#FF6B35",
          }}
        />
      </div>
    </div>
  );
};

const S = {
  wrap: {
    padding: "12px 16px",
    borderBottom: "1px solid #181818",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  title: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: "2px",
    color: "#484848",
  },
  count: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 11,
  },
  track: {
    background: "#181818",
    borderRadius: 1,
    height: 3,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 1,
    transition: "width 0.5s ease",
  },
};

export default ProgressBar;