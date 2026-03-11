const StepRow = ({ step, index, onToggle, onAsk, onVerify, domainColor }) => {
  return (
    <div
      className="stepRow"
      style={{ ...S.row, ...(step.done ? S.rowDone : {}) }}
    >
      {/* Checkbox */}
      <button
        style={{
          ...S.chk,
          ...(step.done
            ? { borderColor: domainColor, background: domainColor + "18" }
            : {}),
        }}
        onClick={() => onToggle(step.id)}
      >
        {step.done && (
          <span
            style={{
              color: domainColor || "#4ECDC4",
              fontSize: 13,
              fontWeight: 900,
            }}
          >
            ✓
          </span>
        )}
      </button>

      {/* Step text */}
      <div style={{ flex: 1 }}>
        <span style={S.num}>{String(index + 1).padStart(2, "0")} </span>
        <span style={{ ...S.txt, ...(step.done ? S.txtDone : {}) }}>
          {step.text}
        </span>
      </div>

      {/* Action buttons */}
      <div style={S.actions}>
        <button
          className="helpBtn"
          style={S.actionBtn}
          onClick={() => onAsk(step, index)}
        >
          ASK
        </button>
        <button
          className="helpBtn"
          style={{ ...S.actionBtn, ...S.verifyBtn }}
          onClick={() => onVerify(step, index)}
        >
          📸
        </button>
      </div>
    </div>
  );
};

const S = {
  row: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "11px 10px",
    borderRadius: 3,
    transition: "background 0.1s",
    background: "transparent",
  },
  rowDone: { opacity: 0.38 },
  chk: {
    width: 20,
    height: 20,
    border: "1px solid #242424",
    borderRadius: 2,
    background: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.15s",
    cursor: "pointer",
  },
  num: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 10,
    color: "#2e2e2e",
  },
  txt: {
    fontFamily: "'Barlow', sans-serif",
    fontSize: 13,
    color: "#aaa",
    lineHeight: 1.4,
  },
  txtDone: { textDecoration: "line-through" },
  actions: {
    display: "flex",
    gap: 4,
    flexShrink: 0,
  },
  actionBtn: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 8,
    letterSpacing: "1px",
    color: "#383838",
    background: "none",
    border: "1px solid #1e1e1e",
    borderRadius: 2,
    padding: "3px 7px",
    transition: "all 0.15s",
    cursor: "pointer",
  },
  verifyBtn: {
    fontSize: 12,
    padding: "2px 6px",
  },
};

export default StepRow;
