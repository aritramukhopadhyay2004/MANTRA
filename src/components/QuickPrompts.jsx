const PROMPTS = [
  "What's the next step?",
  "Common mistakes to avoid?",
  "Give me pro tips",
  "How long will this take?",
];

const QuickPrompts = ({ onSelect, disabled }) => {
  return (
    <div style={S.row}>
      {PROMPTS.map((q) => (
        <button
          key={q}
          className="qpill"
          style={{ ...S.pill, ...(disabled ? S.pillDisabled : {}) }}
          disabled={disabled}
          onClick={() => onSelect(q)}
        >
          {q}
        </button>
      ))}
    </div>
  );
};

const S = {
  row: {
    display: "flex",
    gap: 6,
    padding: "6px 12px 8px",
    overflowX: "auto",
  },
  pill: {
    fontFamily: "'Barlow', sans-serif",
    fontSize: 11,
    color: "#484848",
    background: "transparent",
    border: "1px solid #1e1e1e",
    borderRadius: 20,
    padding: "5px 11px",
    whiteSpace: "nowrap",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  pillDisabled: {
    opacity: 0.3,
    cursor: "not-allowed",
  },
};

export default QuickPrompts;